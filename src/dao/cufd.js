const moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = (app) => {
    const models = app.db.models;
    const impuestos = require('../services/impuestos/codigos')(app);

    async function solicitar(idPuntoVenta, t) {
        const puntoVenta = await app.dao.punto_venta.getId(idPuntoVenta, t);
        const res = await impuestos.cufd(puntoVenta);
        if (res.transaccion) {
            return res;
        } else {
            if (res.mensajesList) {
                throw Error(res.mensajesList.map(val => val.descripcion));
            } else {
                throw res.listaCodigosRespuestas;
            }
        }
    }

    async function get(idPuntoVenta, usuario, t) {
        const cufd = await models.cufd.findOne({
            attributes: ['id_cufd', 'codigo', 'codigo_control', 'fecha', 'fid_punto_venta'],
            include: [
                {
                    attributes: [],
                    model: models.punto_venta,
                    as: 'punto_venta',
                    required: true
                }
            ],
            where: {
                fid_punto_venta: idPuntoVenta,
                estado: 'ACTIVO'
            },
            transaction: t
        });
        let cufdr;
        if (cufd) {
            if (app.fecha().getTime() > moment(cufd.fecha, 'YYYY-MM-DD').toDate().getTime()) {
                if (await app.dao.venta.getPendiente(idPuntoVenta, t)) {
                    throw Error('No se enviaron todas las facturas del periodo anterior.');
                }
                const conn = await impuestos.verificarComunicacion();
                if (conn.transaccion) {
                    await models.cufd.update({
                        estado: 'CERRADO'
                    }, {
                        where: {
                            id_cufd: cufd.id_cufd
                        },
                        transaction: t
                    });
                    await app.dao.catalogo.sincronizar(idPuntoVenta, t);
                    cufdr = await solicitar(idPuntoVenta, t);
                } else {
                    throw Error(await app.dao.catalogo.getError(conn.toString(), t));
                }
            } else {
                if (app.diferencia === 0) {
                    await app.dao.catalogo.sincronizarFecha(idPuntoVenta, t);
                }
                return {
                    id_cufd: cufd.id_cufd,
                    codigo: cufd.codigo,
                    codigoControl: cufd.codigo_control
                };
            }
        } else {
            const conn = await impuestos.verificarComunicacion();
            if (conn.transaccion && conn.mensajesList.length === 1 && conn.mensajesList[0].codigo === 926) {
                await app.dao.catalogo.sincronizar(idPuntoVenta, t);
                cufdr = await solicitar(idPuntoVenta, t);
            } else {
                // [FixIt] Al parecer ya no se usa el catálogo de errores.
                throw Error(await app.dao.catalogo.getError(conn.toString(), t));
            }
        }
        cufdr = await models.cufd.create({
            codigo: cufdr.codigo,
            codigo_control: cufdr.codigoControl,
            fecha: cufdr.fechaVigencia,
            fecha_vigencia: cufdr.fechaVigencia,
            fid_punto_venta: idPuntoVenta,
            _usuario_creacion: usuario
        }, {
            transaction: t,
            returning: true
        });
        return {
            id_cufd: cufdr.id_cufd,
            codigo: cufdr.codigo,
            codigoControl: cufdr.codigo_control
        };
    }

    async function getAll(t) {
        const cufdr = await models.cufd.findAll({
            attributes: ['codigo', ['codigo_control', 'codigoControl'], 'fid_punto_venta'],
            where: {
                estado: 'ACTIVO'
            },
            transaction: t
        });
        return cufdr.map(e => e.toJSON());
    }

    async function getContingencia(idPuntoVenta, t) {
        const cufdr = await models.cufd.findOne({
            attributes: ['id_cufd', 'codigo', 'codigo_control', 'fecha'],
            where: {
                fid_punto_venta: idPuntoVenta,
                estado: 'ACTIVO'
            },
            transaction: t
        });
        if (!cufdr) {
            throw new Error('No se encontró un cufd activo.');
        }
        return {
            id_cufd: cufdr.id_cufd,
            codigo: cufdr.codigo,
            codigoControl: cufdr.codigo_control
        };
    }

    async function getCufdByDate(id_punto_venta, fechaHora, t){
        const cufdr = await models.cufd.findOne({
            attributes: ['id_cufd', 'codigo', 'codigo_control', 'fecha', 'fecha_vigencia'],
            where: {
                fid_punto_venta: id_punto_venta,
                [Op.and]: [
                    Sequelize.literal(`:fechahora between fecha_vigencia - '1 day'::Interval and fecha_vigencia + '3 day'::Interval`)
                ]
            },
            order: Sequelize.literal(`:fechahora - (fecha_vigencia - '1 day'::Interval)`),
            replacements: {
                fechahora: fechaHora
            },
            transaction: t
        });
        if (cufdr) {
            return cufdr.toJSON();
        } else {
            throw new Error('No se encontró un cufd válido para la fecha especificada.');
        }
    }

    return {
        get,
        getAll,
        getContingencia,
        getCufdByDate
    };
};
