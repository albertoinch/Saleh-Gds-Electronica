const Sequelize = require('sequelize');
const crypto = require('crypto');
const moment = require('moment');
const { gzip } = require('node-gzip');
const tar = require('tar-stream');
const Op = Sequelize.Op;

module.exports = (app) => {
    const impuestos = require('../services/impuestos/operaciones')(app);
    const impuestosFactura = require('../services/impuestos/factura')(app);
    const cola = require('../lib/cola')(app);
    const models = app.db.models;

    async function getEvento(idPuntoVenta, t) {
        const eventoSignificativoRes = await models.evento_significativo.findOne({
            attributes: ['fid_punto_venta', 'codigo', 'descripcion', 'fecha_inicio', 'fecha_fin', 'manual', 'cafc', 'estado'],
            include: [
                {
                    model: models.cufd,
                    as: 'cufd_evento'
                }
            ],
            where: idPuntoVenta ? {
                fid_punto_venta: idPuntoVenta,
                [Op.or]: [
                    {
                        estado: 'ACTIVO'
                    }, {
                        estado: 'CERRANDO'
                    }
                ]
            } : {
                [Op.or]: [
                    {
                        estado: 'ACTIVO'
                    }, {
                        estado: 'CERRANDO'
                    }
                ]
            },
            order: [['codigo', 'ASC']],
            transaction: t,
            lock: {
                level: t.LOCK.UPDATE,
                of: models.evento_significativo
            }
        });
        if (eventoSignificativoRes) {
            return eventoSignificativoRes.toJSON();
        } else {
            return eventoSignificativoRes;
        }
    }

    async function getEventoActivo(idPuntoVenta, contingencia, t) {
        const eventoSignificativoRes = await models.evento_significativo.findOne({
            attributes: ['fid_punto_venta', 'codigo', 'descripcion', 'fecha_inicio', 'fecha_fin', 'cafc', 'cafc'],
            where: idPuntoVenta ? {
                fid_punto_venta: idPuntoVenta,
                estado: 'ACTIVO',
                codigo: {
                    [contingencia ? Op.gte : Op.lt]: '5'
                }
            } : {
                estado: 'ACTIVO',
                codigo: {
                    [contingencia ? Op.gte : Op.lt]: '5'
                }
            },
            transaction: t
        });
        if (eventoSignificativoRes) {
            return eventoSignificativoRes.toJSON();
        } else {
            return eventoSignificativoRes;
        }
    }

    async function getEventoCerrando(t) {
        const eventoSignificativoRes = await models.evento_significativo.findOne({
            where: {
                estado: 'CERRANDO'
            },
            transaction: t
        });
        if (eventoSignificativoRes) {
            return eventoSignificativoRes.toJSON();
        } else {
            return eventoSignificativoRes;
        }
    }

    async function getEventoCufd(cufd, t) {
        const eventoSignificativoRes = await models.evento_significativo.findOne({
            include: [
                {
                    model: models.cufd,
                    as: 'cufd',
                    required: true,
                    where: {
                        codigo: cufd
                    },
                }
            ],
            order: [['id_evento_significativo', 'DESC']],
            transaction: t
        });
        if (eventoSignificativoRes) {
            return eventoSignificativoRes.toJSON();
        } else {
            return eventoSignificativoRes;
        }
    }

    async function getEventos(t) {
        const eventoSignificativoRes = await models.evento_significativo.findAll({
            attributes: ['fid_punto_venta', 'codigo', 'descripcion', 'fecha_inicio', 'fecha_fin', 'cafc'],
            where: {
                estado: 'CERRANDO'
            },
            transaction: t
        });
        return eventoSignificativoRes.map(e => e.toJSON());
    }

    async function crear(evento, t) {
        if (evento.idPuntoVenta == undefined) {
            evento.idPuntoVenta = await app.dao.punto_venta.getIdPuntoVenta(evento.codigoPuntoVenta, evento.codigoSucursal, t);
        }
        let cufdEvento, fecha, contingencia = true;
        if (parseInt(evento.codigoEvento) < 5) {
            cufdEvento = await app.dao.cufd.getContingencia(evento.idPuntoVenta, t);
            fecha = app.fecha();
            contingencia = false;
        } else {
            fecha = moment(evento.fecha_inicio, 'YYYY-MM-DD HH:mm.ss.SSS').toDate();
            const solapados = await models.evento_significativo.findAll({
                where: {
                    fid_punto_venta: evento.idPuntoVenta,
                    fecha_inicio: {
                        [Op.lte]: fecha
                    },
                    fecha_fin: {
                        [Op.gte]: fecha
                    },
                    codigo: {
                        [Op.lt]: '5'
                    }
                },
                transaction: t
            });
            if (solapados.length > 0) {
                throw new Error(`Ya se tiene un evento en el rango ${solapados[0].fecha_inicio} a ${solapados[0].fecha_fin}`);
            }
            cufdEvento = await app.dao.cufd.getCufdByDate(evento.idPuntoVenta, fecha, t);
            if (!evento.cafc || evento.cafc == '') {
                throw new Error('Debe especificar el cafc.');
            }
        }
        const eventoActivo = await getEventoActivo(evento.idPuntoVenta, contingencia, t);
        if (eventoActivo) {
            throw new Error('Ya existe un evento activo.');
        }
        const eventoSignificativoRes = await models.evento_significativo.create({
            codigo: evento.codigoEvento,
            descripcion: evento.descripcion,
            cafc: evento.cafc,
            fid_cufd_evento: cufdEvento.id_cufd,
            fid_punto_venta: evento.idPuntoVenta,
            manual: evento.manual ? true : false,
            fecha_inicio: fecha,
            _usuario_creacion: evento.audit_usuario.usuario
        }, {
            transaction: t
        });
        return eventoSignificativoRes;
    }

    async function cerrar(id, evento, t) {
        const cufd = await app.dao.cufd.get(id, evento.audit_usuario.usuario, t);
        const eventoSignificativoRes = await models.evento_significativo.update({
            fid_cufd: cufd.id_cufd,
            fecha_fin: app.fecha(),
            estado: 'CERRANDO'
        }, {
            where: {
                estado: 'ACTIVO',
                fid_punto_venta: id,
                [Op.and]: [
                    Sequelize.literal(`id_evento_significativo = (SELECT id_evento_significativo FROM evento_significativo es WHERE es.fid_punto_venta = "evento_significativo".fid_punto_venta AND es.estado = 'ACTIVO' ORDER BY codigo ASC LIMIT 1)`)
                ]
            },
            transaction: t,
            returning: true
        });
        /*await models.cufd.update({
            estado: 'CERRADO'
        }, {
            where: {
                id_cufd: eventoSignificativoRes[1][0].fid_cufd_evento,
                estado: 'ACTIVO'
            },
            transaction: t
        });*/
        await cola.cufd(id, 'cola', t);
        return eventoSignificativoRes[1];
    }

    async function getEstado(idPuntoVenta, t) {
        const eventoSignificativoRes = await models.evento_significativo.findOne({
            attributes: ['fid_punto_venta', 'codigo', 'descripcion', 'fecha_inicio', 'fecha_fin', 'estado'],
            where: {
                fid_punto_venta: idPuntoVenta,
                estado: 'ACTIVO'
            },
            transaction: t
        });
        if (eventoSignificativoRes) {
            return eventoSignificativoRes.estado;
        } else {
            return 'CERRADO';
        }
    }

    async function finalizar(idPuntoVenta, t) {
        const puntoVenta = await app.dao.punto_venta.getId(idPuntoVenta, t);
        const t2 = await app.db.sequelize.transaction();
        let cufd;
        try {
            cufd = await cola.cufd(idPuntoVenta, 'cola', t2);
            await t2.commit();
        } catch (ecufd) {
            await t2.rollback();
            throw ecufd;
        }
        const eventoSignificativoRes = await models.evento_significativo.findOne({
            include: [
                {
                    model: models.cufd,
                    as: 'cufd_evento'
                }, {
                    model: models.cufd,
                    as: 'cufd'
                }
            ],
            where: {
                estado: 'CERRANDO',
                fid_punto_venta: idPuntoVenta
            },
            transaction: t
        });
        if (app.fecha().getTime() < eventoSignificativoRes.fecha_fin) {
            throw new Error('OverTime');
        }
        const rango = await app.dao.venta.getRango('PENDIENTE', eventoSignificativoRes.cufd_evento.codigo, t);
console.log(rango);
        if (eventoSignificativoRes.fecha_inicio.getTime() > moment(rango.min).toDate().getTime()) {
            eventoSignificativoRes.fecha_inicio = moment(rango.min).toDate();
        }
        if (eventoSignificativoRes.fecha_fin.getTime() < moment(rango.max).toDate().getTime()) {
            eventoSignificativoRes.fecha_fin = moment(rango.max).toDate();
        }
console.log(eventoSignificativoRes.fecha_inicio);
        const params = {
            codigoAmbiente: puntoVenta.codigoAmbiente,
            codigoMotivoEvento: eventoSignificativoRes.codigo,
            codigoPuntoVenta: puntoVenta.codigoPuntoVenta,
            codigoSistema: puntoVenta.codigoSistema,
            codigoSucursal: puntoVenta.codigoSucursal,
            cufd: cufd.codigo,
            cufdEvento: eventoSignificativoRes.cufd_evento.codigo,
            cuis: puntoVenta.cuis,
            descripcion: eventoSignificativoRes.descripcion,
            fechaHoraInicioEvento: eventoSignificativoRes.fecha_inicio.toJSON(),
            fechaHoraFinEvento: eventoSignificativoRes.fecha_fin.toJSON(),
            nit: puntoVenta.nit
        };
console.log('----------------------------------------');
console.log(params);
        let res = await impuestos.registroEventoSignificativo(params);
console.log('----------------------------------------');
console.log(res);
        if (!res.transaccion) {
console.log('****************************************');
console.log({
                codigoAmbiente: params.codigoAmbiente,
                codigoPuntoVenta: params.codigoPuntoVenta,
                codigoSistema: params.codigoSistema,
                codigoSucursal: params.codigoSucursal,
                cufd: params.cufd,
                cuis: params.cuis,
                fechaEvento: new Date(eventoSignificativoRes.fecha_inicio.toDateString()).toJSON(),
                nit: params.nit
            });
            const lista = await impuestos.consultaEventoSignificativo({
                codigoAmbiente: params.codigoAmbiente,
                codigoPuntoVenta: params.codigoPuntoVenta,
                codigoSistema: params.codigoSistema,
                codigoSucursal: params.codigoSucursal,
                cufd: params.cufd,
                cuis: params.cuis,
                fechaEvento: new Date(eventoSignificativoRes.fecha_inicio.toDateString()).toJSON(),
                nit: params.nit
            });
console.log(lista);
            if (!lista.transaccion) {
                throw Error(await app.dao.catalogo.getError(lista.mensajesList.map(val => val.codigo.toString())));
            }
            res = lista.listaCodigos.find(e => e.codigoEvento == eventoSignificativoRes.codigo && new Date(e.fechaInicio).getTime() == eventoSignificativoRes.fecha_inicio.getTime());
            if (!res) {
                throw Error('No se encontró coincidencia con la fecha de inicio.');
            }
        }
        eventoSignificativoRes.codigo_recepcion = res.codigoRecepcionEventoSignificativo;
        let tipoEmision = undefined, cafc = '';
        if (parseInt(eventoSignificativoRes.codigo) > 4) {
            tipoEmision = 2;
            cafc = eventoSignificativoRes.cafc;
        }
        const facturas = await app.dao.venta.getPendientes('PENDIENTE', eventoSignificativoRes.cufd_evento.codigo, tipoEmision, cafc, t);
        if (facturas.length) {
            const sended = await app.dao.venta.getBase(eventoSignificativoRes.id_evento_significativo, cafc, t);
            const params = {
                codigoAmbiente: facturas[0].punto_venta.codigoAmbiente,
                codigoDocumentoSector: facturas[0].codigo_documento_sector,
                codigoEmision: facturas[0].tipo_emision,
                codigoModalidad: facturas[0].punto_venta.codigoModalidad,
                codigoPuntoVenta: facturas[0].punto_venta.codigoPuntoVenta,
                codigoSistema: facturas[0].punto_venta.codigoSistema,
                codigoSucursal: facturas[0].punto_venta.codigoSucursal,
                cufd: cufd.codigo,
                cuis: facturas[0].punto_venta.cuis,
                nit: facturas[0].punto_venta.nit,
                tipoFacturaDocumento: facturas[0].esquema.tipo_factura,
                fechaEnvio: moment(app.fecha()).format('YYYY-MM-DDTHH:mm:ss.SSS'),
                cafc: eventoSignificativoRes.cafc ? eventoSignificativoRes.cafc : '',
                cantidadFacturas: facturas.length,
                codigoEvento: eventoSignificativoRes.codigo_recepcion
            };
            let nro_pack = facturas.length / 500;
            for (let k = 0; k < nro_pack; k++) {
                const nro = {};
                const archivos = {};
                const pack = {};
                for (let i = k * 500; i < (k + 1) * 500 && i < facturas.length; i++) {
                    if (Object.keys(archivos).indexOf(facturas[i].codigo_documento_sector) < 0) {
                        const key = Object.keys(sended)[0];
                        nro[facturas[i].codigo_documento_sector] = sended[key].length + k * 500;
                        archivos[facturas[i].codigo_documento_sector] = [];
                        pack[facturas[i].codigo_documento_sector] = tar.pack();
                    } else {
                        nro[facturas[i].codigo_documento_sector]++;
                    }
                    if (facturas[i].tipo_emision == 1) {
                        const f = await app.dao.factura.actualizar(facturas[i].id_venta, 2, facturas[i].datos, eventoSignificativoRes.cufd_evento.toJSON(), t);
                        pack[facturas[i].codigo_documento_sector].entry({ name: `factura${i}.xml` }, f);
                        params.codigoEmision = 2;
                    } else {
                        pack[facturas[i].codigo_documento_sector].entry({ name: `factura${i}.xml` }, facturas[i].factura);
                    }
                    archivos[facturas[i].codigo_documento_sector].push({
                        id_venta: facturas[i].id_venta,
                        nro: nro[facturas[i].codigo_documento_sector]
                    });
                }
                const keys = Object.keys(nro);
                for (let i = 0; i < keys.length; i++) {
                    if (i > 0) {
                        params.codigoDocumentoSector = keys[i];
                        params.tipoFacturaDocumento = keys[i] == 8 ? 2 : 1;
                    }
                    params.cantidadFacturas = archivos[keys[i]].length;
                    params.archivo = Buffer.from(await gzip(pack[keys[i]].read()), 'binary').toString('base64');
                    params.hashArchivo = crypto.createHash('sha256').update(params.archivo, 'utf8').digest().toString('hex');
                    const recepcion = await impuestosFactura.recepcionPaqueteFactura(params);
                    if (!recepcion.transaccion) {
                        throw Error(recepcion.mensajesList.map(val => val.descripcion));
                    }
                    const t3 = await app.db.sequelize.transaction();
                    try {
                        await app.dao.venta.setCodigoRecepcion(archivos[keys[i]].map(f => f.id_venta), recepcion.codigoRecepcion, t3);
                        await t3.commit();
                    } catch (ecod) {
                        await t3.rollback();
                        throw ecod;
                    }
                }
                if (eventoSignificativoRes.archivos == null) {
                    eventoSignificativoRes.archivos = sended;
                }
                const key = Object.keys(archivos)[0];
                eventoSignificativoRes.archivos[key] = eventoSignificativoRes.archivos[key].concat(archivos[key]);
            }
        } else {
            eventoSignificativoRes.archivos = await app.dao.venta.getBase(eventoSignificativoRes.id_evento_significativo, cafc, t);
            //throw Error('No existen facturas pendientes.');
        }
        eventoSignificativoRes.fid_cufd = cufd.id_cufd;
        eventoSignificativoRes.estado = 'CERRADO';
        return await eventoSignificativoRes.save({
            transaction: t
        });
    }

    async function listar(req,t) {

        //var nro = parseInt(req.query.buscarNroF);
        const options = { }

        //filtro por ESTADO
        if(req.query.buscarEstado){
            options.estado= {
                [Op.eq]: req.query.buscarEstado
            }
        }else {
            options.estado= {
                [Op.in]: ['ACTIVO', 'CERRADO', 'CERRANDO']
            }
        }

        //filtro por TIPO
        if(req.query.buscarTipo){
          options.tipo= {
            [Op.like]: req.query.buscarTipo
          }
        }

        let limit = req.query.limit;   // numero de respuestas por pagina
        let page = req.params.page;
        let offset = limit * (page - 1);

         return models.evento_significativo.findAndCountAll({
                //attributes: ['id_evento', 'tipo', 'codigo_recepcion','fecha_inicio','fecha_fin','estado','codigo_evento','descripcion','fid_punto_venta'],
                attributes: ['id_evento_significativo', 'codigo', 'codigo_recepcion','fecha_inicio','fecha_fin','estado','descripcion','fid_punto_venta'],
                include: [
                    {
                        attributes: ['codigo'],
                        model: models.punto_venta,
                        as: 'punto_venta',
                        include: [
                            {
                                attributes: ['codigo'],
                                model: models.sucursal,
                                as: 'sucursal'
                            }
                        ]
                    }
                ],
                where: options,
                limit: limit,
                offset: offset,
                order: [['_fecha_creacion', 'DESC']]
          }).then(function (data) {
             page = Math.ceil(data.count / limit);
             return data;
          });

    }

    return {
        getEvento,
        getEventoActivo,
        getEventoCerrando,
        getEstado,
        getEventos,
        getEventoCufd,
        crear,
        cerrar,
        finalizar,
        listar
    };
};
