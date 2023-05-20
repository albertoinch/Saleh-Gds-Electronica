const Sequelize = require('sequelize');
const moment = require('moment');
const Op = Sequelize.Op;

module.exports = (app) => {
    const models = app.db.models;
    const impuestos = require('../services/impuestos/sincronizacion')(app);

    async function getError(codigos, t) {
        const catalogoRes = await models.catalogo.findOne({
            attributes: [[Sequelize.literal(`string_agg(descripcion, '|')`), 'descripcion']],
            where: {
                agrupador: 'MENSAJE SOAP',
                codigo: {
                    [Op.in]: codigos
                }
            },
            transaction: t
        });
        if (catalogoRes) {
            return catalogoRes.descripcion;
        } else {
            return catalogoRes;
        }
    }

    async function getMotivo(codigo, t) {
        const catalogoRes = await models.catalogo.findOne({
            attributes: ['codigo', 'descripcion'],
            where: {
                agrupador: 'MOTIVO ANULACION',
                codigo: codigo
            },
            transaction: t
        });
        if (catalogoRes) {
            return catalogoRes.toJSON();
        } else {
            return catalogoRes;
        }
    }

    async function getEvento(codigo, t) {
        const catalogoRes = await models.catalogo.findOne({
            attributes: ['codigo', 'descripcion'],
            where: {
                agrupador: 'MOTIVO EVENTO',
                codigo: codigo
            },
            transaction: t
        });
        if (catalogoRes) {
            return catalogoRes.toJSON();
        } else {
            return catalogoRes;
        }
    }

    async function getLeyenda(codigo, t) {
        const catalogoRes = await models.catalogo.findOne({
            attributes: ['codigo', 'descripcion'],
            where: {
                agrupador: 'LEYENDA',
                codigo: {
                    [Op.iLike]: codigo + '%'
                }
            },
            order: Sequelize.literal('random()'),
            transaction: t
        });
        if (catalogoRes) {
            return catalogoRes.toJSON();
        } else {
            return catalogoRes;
        }
    }

    function preparar(idContribuyente, codigo, datos) {
        const res = [];
        let cod = 'codigo'
        let desc = 'descripcion';
        if (datos.length > 0) {
            const labels = Object.keys(datos[0]);
            for (let i = 0; i < labels.length; i++) {
                if (labels[i].startsWith('codigo')) {
                    cod = labels[i];
                }
                if (labels[i].startsWith('descripcion')) {
                    desc = labels[i];
                }
            }
        }
        for (let i = 0; i < datos.length; i++) {
            if (res.find(o => o.codigo == datos[i][cod])) {
                console.log(datos[i]);
            } else {
                res.push({
                    fid_contribuyente: idContribuyente,
                    agrupador: codigo,
                    codigo: datos[i][cod],
                    descripcion: datos[i][desc]
                });
            }
        }
        return res;
    }

    function prepararActividad(idContribuyente, codigo, datos) {
        const res = [];
        for (let i = 0; i < datos.length; i++) {
            res.push({
                fid_contribuyente: idContribuyente,
                agrupador: codigo,
                codigo: datos[i].codigoCaeb,
                descripcion: datos[i].descripcion,
                codigo_actividad: datos[i].tipoActividad
            })
        }
        return res;
    }

    function prepararLeyenda(idContribuyente, codigo, datos) {
        const res = [];
        for (let i = 0; i < datos.length; i++) {
            res.push({
                fid_contribuyente: idContribuyente,
                agrupador: codigo,
                codigo: datos[i].codigoActividad + '-' + i,
                descripcion: datos[i].descripcionLeyenda
            })
        }
        return res;
    }

    function prepararSector(idContribuyente, codigo, datos) {
        const res = [];
        for (let i = 0; i < datos.length; i++) {
            res.push({
                fid_contribuyente: idContribuyente,
                agrupador: codigo,
                codigo: datos[i].codigoActividad + '-' + datos[i].codigoDocumentoSector,
                descripcion: datos[i].tipoDocumentoSector
            })
        }
        return res;
    }

    function prepararItems(idContribuyente, codigo, datos) {
        const res = [];
        for (let i = 0; i < datos.length; i++) {
            if (res.find(o => o.codigo == datos[i].codigoProducto)) {
                console.log(datos[i]);
            } else {
                res.push({
                    fid_contribuyente: idContribuyente,
                    agrupador: codigo,
                    codigo: datos[i].codigoProducto,
                    descripcion: datos[i].descripcionProducto,
                    codigo_actividad: datos[i].codigoActividad
                });
            }
        }
        return res;
    }

    async function sincronizar(idPuntoVenta, t) {
        const conn = await impuestos.verificarComunicacion();
        if (conn.transaccion && conn.mensajesList.length === 1 && conn.mensajesList[0].codigo === 926) {
            const idContribuyente = (await models.punto_venta.findOne({
                attributes: [
                    [Sequelize.literal('"sucursal"."fid_contribuyente"'), 'id_contribuyente']
                ],
                include: [
                    {
                        attributes: [],
                        model: models.sucursal,
                        as: 'sucursal',
                        required: true
                    }
                ],
                where: {
                    id_punto_venta: idPuntoVenta
                },
                transaction: t
            }).then(r => {
                if (r) {
                    return r.toJSON();
                } else {
                    return r
                }
            })).id_contribuyente;
            const params = await app.dao.punto_venta.getId(idPuntoVenta, t);
            delete params['codigoModalidad'];
            const fecha = moment().format('DD/MM/YYYY');
            const agrupador = await models.agrupador.findAll({
                include: [
                    {
                        attributes: [],
                        model: models.sync,
                        as: 'sync',
                        required: true,
                        where: process.env.NODE_ENV == 'test' ? {
                            fid_contribuyente: idContribuyente
                        } : {
                            fid_contribuyente: idContribuyente,
                            fecha: {
                                [Op.ne]: fecha
                            }
                        }
                    }
                ],
                where: {
                    metodo: {
                        [Op.not]: null
                    }
                },
                transaction: t
            });
            for (let i = 0; i < agrupador.length; i++) {
                console.log(agrupador[i].metodo);
                const datos = await impuestos.sincronizar(agrupador[i].metodo, params);
                if (datos.transaccion) {
                    const t2 = await app.db.sequelize.transaction();
                    try {
                        await models.catalogo.destroy({
                            where: {
                                fid_contribuyente: idContribuyente,
                                agrupador: agrupador[i].codigo
                            },
                            transaction: t2
                        });
                        let datosPreparados;
                        switch (agrupador[i].metodo) {
                            case 'sincronizarActividades':
                                datosPreparados = prepararActividad(idContribuyente, agrupador[i].codigo, datos.listaActividades);
                                break;
                            case 'sincronizarListaActividadesDocumentoSector':
                                datosPreparados = prepararSector(idContribuyente, agrupador[i].codigo, datos.listaActividadesDocumentoSector);
                                break;
                            case 'sincronizarListaLeyendasFactura':
                                datosPreparados = prepararLeyenda(idContribuyente, agrupador[i].codigo, datos.listaLeyendas);
                                break;
                            case 'sincronizarListaProductosServicios':
                                datosPreparados = prepararItems(idContribuyente, agrupador[i].codigo, datos.listaCodigos);
                                break;
                            default:
                                datosPreparados = preparar(idContribuyente, agrupador[i].codigo, datos.listaCodigos);
                                break;
                        }
                        await models.catalogo.bulkCreate(datosPreparados, {
                            transaction: t2
                        });
                        await models.sync.update({
                            fecha: fecha
                        }, {
                            where: {
                                fid_contribuyente: idContribuyente,
                                codigo: agrupador[i].codigo
                            },
                            transaction: t2
                        });
                        await t2.commit();
                    } catch (error) {
                        await t2.rollback();
                        throw error;
                    }
                } else {
                    let codErr;
                    if (datos.mensajesList) {
                        throw Error(datos.mensajesList.map(val => val.descripcion));
                    } else {
                        codErr = datos.listaCodigosRespuestas.map(val => val.codigoMensaje.toString());
                    }
                    if (codErr.indexOf('92') === -1) {
                        throw Error(await app.dao.catalogo.getError(codErr, t));
                    }
                }
            }
            const fechaHora = await impuestos.sincronizarFechaHora(params);
console.log(fechaHora);
            if (fechaHora.transaccion) {
                app.diferencia = moment(fechaHora.fechaHora).diff(moment());
            } else {
                throw Error('No se pudo sincronizar la fecha y hora.');
            }
        } else {
            throw Error(await app.dao.catalogo.getError(conn.toString(), t));
        }
    }

    async function sincronizarFecha(idPuntoVenta, t) {
        try {
            const conn = await impuestos.verificarComunicacion();
            if (conn.transaccion && conn.mensajesList.length === 1 && conn.mensajesList[0].codigo === 926) {
                const params = await app.dao.punto_venta.getId(idPuntoVenta, t);
                delete params['codigoModalidad'];
                const fechaHora = await impuestos.sincronizarFechaHora(params);
                if (fechaHora.transaccion) {
                    app.diferencia = moment(fechaHora.fechaHora).diff(moment());
                } else {
                    throw Error('No se pudo sincronizar la fecha y hora.');
                }
            } else {
                throw Error(await app.dao.catalogo.getError(conn.toString(), t));
            }
        } catch (e) {}
    }

     //*****************SERVICIOS PARA EL FRONTEND */
     async function getActividades(t) {
        return await models.catalogo.findAll({
            attributes: ['codigo', 'descripcion'],
            where: {
                agrupador: 'ACTIVIDAD'
            },
            transaction: t
        }).then(res => res.map(tipos => tipos.toJSON()));
    }

    async function getCodigoSinActividad(codigo, t) {
        return await models.catalogo.findAll({
            attributes: ['codigo', 'descripcion'],
            where: {
                agrupador: 'ITEM',
                codigo_actividad: codigo.toString()
            },
            transaction: t
        }).then(res => res.map(tipos => tipos.toJSON()));
    }

    async function getCatalogo(agrupador, id_contribuyente, t) {
        return await models.catalogo.findAll({
            attributes: ['codigo', 'descripcion'],
            where: {
                agrupador: agrupador,
                fid_contribuyente: id_contribuyente
            },
            transaction: t
        }).then(res => res.map(tipos => tipos.toJSON()));
    }

    //FUNCIONES PARA VALIDACION AL CREAR UN ITEM
    async function getActividadEconomica(codigo/* , fidPuntoVenta */, t) {
        const catalogoRes = await models.catalogo.findOne({
            attributes: ['codigo', 'descripcion', 'codigo_actividad'],
            where: {
                agrupador: 'ITEM',
                codigo_actividad: codigo,
                // fid_punto_venta: fidPuntoVenta
            },
            transaction: t
        });
        if (catalogoRes) {
            return catalogoRes.toJSON();
        } else {
            return catalogoRes;
        }
    }
    async function getActividadCodigoSin(codigoSin, codigoActividad/* , fidPuntoVenta */, t) {
        const catalogoRes = await models.catalogo.findOne({
            attributes: ['codigo', 'descripcion', 'codigo_actividad'],
            where: {
                agrupador: 'ITEM',
                codigo_actividad: codigoActividad,
                codigo: codigoSin,
                // fid_punto_venta: fidPuntoVenta
            },
            transaction: t
        });
        if (catalogoRes) {
            return catalogoRes.toJSON();
        } else {
            return catalogoRes;
        }
    }
    async function getCodigoMoneda(codigo/* , fidPuntoVenta */, t) {
        const catalogoRes = await models.catalogo.findOne({
            attributes: ['codigo', 'descripcion'],
            where: {
                agrupador: 'TIPO MONEDA',
                codigo: codigo,
                // fid_punto_venta: fidPuntoVenta
            },
            transaction: t
        });
        if (catalogoRes) {
            return catalogoRes.toJSON();
        } else {
            return catalogoRes;
        }
    }

    async function getCodigoUnidadMedida(codigo/* , fidPuntoVenta */, t) {
        const catalogoRes = await models.catalogo.findOne({
            attributes: ['codigo', 'descripcion'],
            where: {
                agrupador: 'UNIDAD MEDIDA',
                codigo: codigo,
                // fid_punto_venta: fidPuntoVenta
            },
            transaction: t
        });
        if (catalogoRes) {
            return catalogoRes.toJSON();
        } else {
            return catalogoRes;
        }
    }

    return {
        sincronizar,
        sincronizarFecha,
        getError,
        getMotivo,
        getEvento,
        getLeyenda,
        getActividades,
        getCodigoSinActividad,
        getCatalogo,
        //funciones validacion crear item
        getActividadEconomica,
        getActividadCodigoSin,
        getCodigoMoneda,
        getCodigoUnidadMedida
    };
};
