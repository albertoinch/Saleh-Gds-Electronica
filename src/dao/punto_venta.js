const Sequelize = require('sequelize');
const config = require('../config/config')();
const Op = Sequelize.Op;

module.exports = (app) => {
    const impuestos = require('../services/impuestos/codigos')(app);
    const impuestosOp = require('../services/impuestos/operaciones')(app);
    const models = app.db.models;

    async function getIdPuntoVenta(codigoPuntoVenta, codigoSucursal, t) {
        const puntoVentaRes = await models.punto_venta.findOne({
            attributes: ['id_punto_venta'],
            include: [
                {
                    attributes: [],
                    model: models.sucursal,
                    as: 'sucursal',
                    required: true,
                    where: {
                        codigo: codigoSucursal
                    }
                }
            ],
            where: {
                codigo: codigoPuntoVenta
            },
            transaction: t
        });
        if (puntoVentaRes) {
            return puntoVentaRes.id_punto_venta;
        } else {
            return puntoVentaRes;
        }
    }

    async function getId(id, t) {
        const puntoVentaRes = await models.punto_venta.findOne({
            attributes: [
                [Sequelize.literal('"sucursal->contribuyente"."codigo_ambiente"'), 'codigoAmbiente'],
                [Sequelize.literal('"sucursal->contribuyente"."codigo_modalidad"'), 'codigoModalidad'],
                ['codigo', 'codigoPuntoVenta'],
                [Sequelize.literal(`'${config.impuestos.codigoSistema}'`), 'codigoSistema'],
                [Sequelize.literal('"sucursal"."codigo"'), 'codigoSucursal'],
                [Sequelize.literal('"sucursal->contribuyente"."nit"'), 'nit'],
                [Sequelize.literal('"cuist"."codigo"'), 'cuis']
            ],
            include: [
                {
                    attributes: [],
                    model: models.sucursal,
                    as: 'sucursal',
                    required: true,
                    include: [
                        {
                            attributes: [],
                            model: models.contribuyente,
                            as: 'contribuyente',
                            required: true
                        }
                    ]
                }, {
                    attributes: [],
                    model: models.cuis,
                    as: 'cuist',
                    required: false,
                    where: {
                        estado: 'ACTIVO'
                    }
                }
            ],
            where: {
                id_punto_venta: id
            },
            transaction: t
        });
        if (puntoVentaRes) {
            return puntoVentaRes.toJSON();
        } else {
            return puntoVentaRes;
        }
    }

    async function getIdC(id, t) {
        const puntoVentaRes = await models.punto_venta.findOne({
            attributes: [
                [Sequelize.literal('"sucursal->contribuyente"."codigo_ambiente"'), 'codigoAmbiente'],
                [Sequelize.literal('"sucursal->contribuyente"."codigo_modalidad"'), 'codigoModalidad'],
                ['codigo', 'codigoPuntoVenta'],
                [Sequelize.literal(`'${config.impuestos.codigoSistema}'`), 'codigoSistema'],
                [Sequelize.literal('"sucursal"."codigo"'), 'codigoSucursal'],
                [Sequelize.literal('"sucursal->contribuyente"."nit"'), 'nit'],
                [Sequelize.literal('"cuist"."codigo"'), 'cuis']
            ],
            include: [
                {
                    attributes: [],
                    model: models.sucursal,
                    as: 'sucursal',
                    required: true,
                    include: [
                        {
                            attributes: [],
                            model: models.contribuyente,
                            as: 'contribuyente',
                            required: true,
                            where: {
                                id_contribuyente: id
                            }
                        }
                    ]
                }, {
                    attributes: [],
                    model: models.cuis,
                    as: 'cuist',
                    required: false,
                    where: {
                        estado: 'ACTIVO'
                    }
                }
            ],
            where: {
                estado: 'ACTIVO'
            },
            logging: console.log(),
            transaction: t
        });
        if (puntoVentaRes) {
            return puntoVentaRes.toJSON();
        } else {
            return puntoVentaRes;
        }
    }

    async function getPuntosVenta(t) {
        const sucursalRes = await models.punto_venta.findAll({
            attributes: ['id_punto_venta','codigo', 'nombre', 'fid_sucursal'],
            model: models.punto_venta,
            as: 'punto_venta',
            include: [
                {
                    attributes: ['codigo',
                        [Sequelize.literal('"sucursal->contribuyente"."nit"'), 'nit'],
                        'nombre'
                    ],
                    model: models.sucursal,
                    as: 'sucursal',
                    include: [
                        {
                            attributes: [],
                            model: models.contribuyente,
                            as: 'contribuyente'
                        }
                    ]
                }
            ],
            transaction: t
        });
        if (sucursalRes) {
            return sucursalRes;
        } else {
            return sucursalRes;
        }
    }

    async function listar(idSucursal, req, t) {
        const options = { 
            fid_sucursal: idSucursal
        }

        // filtro por nombre
        if(req.query.buscarNombre){
            options.nombre={
                [Op.iLike]: '%'+req.query.buscarNombre+'%'
            };
        }
        //filtro por ESTADO
        if(req.query.buscarEstado){
            options.estado= {
                [Op.like]: req.query.buscarEstado
            }
        }
        //filtro por codigo de punto de venta
        if(req.query.buscarCodigo != 0){
            options.codigo = req.query.buscarCodigo
        }
        console.log(options)

        let limit = req.query.limit;   // numero de respuestas por pagina
        let page = req.params.page;
        let offset = limit * (page - 1);
        console.log(offset, page)
        return await models.punto_venta.findAndCountAll({
            attributes: ['id_punto_venta', 'nombre', 'descripcion', 'codigo', 'tipo', 'estado', 'fid_sucursal'],
            include: [
                {
                    model: models.cuis,
                    as: 'cuist',
                    required: false,
                    where: {
                        estado: 'ACTIVO'
                    }
                }
            ],
            where: options,
            limit: limit,
            offset: offset,
            order: [['nombre', 'ASC']]
        }).then(function (data) {
            page = Math.ceil(data.count / limit);
            return data;
        });
    }

    async function post(body, usuario, t) {
        const params = await models.sucursal.findOne({
            attributes: [
                [Sequelize.literal('"contribuyente"."codigo_ambiente"'), 'codigoAmbiente'],
                [Sequelize.literal('"contribuyente"."codigo_modalidad"'), 'codigoModalidad'],
                [Sequelize.literal(`'${config.impuestos.codigoSistema}'`), 'codigoSistema'],
                ['codigo', 'codigoSucursal'],
                [Sequelize.literal(body.tipo), 'codigoTipoPuntoVenta'],
                [Sequelize.literal('"punto_venta->cuist"."codigo"'), 'cuis'],
                [Sequelize.literal(`'${body.descripcion}'`), 'descripcion'],
                [Sequelize.literal('"contribuyente"."nit"'), 'nit'],
                [Sequelize.literal(`'${body.nombre}'`), 'nombrePuntoVenta']
            ],
            include: [
                {
                    attributes: [],
                    model: models.contribuyente,
                    as: 'contribuyente'
                }, {
                    attributes: [],
                    model: models.punto_venta,
                    as: 'punto_venta',
                    required: true,
                    where: {
                        estado: 'ACTIVO'
                    },
                    include: [
                        {
                            attributes: [],
                            model: models.cuis,
                            as: 'cuist',
                            required: true,
                            where: {
                                estado: 'ACTIVO'
                            }
                        }
                    ]
                }
            ],
            where: {
                id_sucursal: body.fidSucursal
            },
            order: [[Sequelize.literal('"punto_venta"."id_punto_venta"'), 'ASC']],
            transaction: t
        }).then(p => {
            if (p) {
                return p.toJSON();
            } else {
                return p;
            }
        });
        let res;
        if (params.codigoTipoPuntoVenta == 1) {
            delete params['codigoTipoPuntoVenta'];
            params.nitComisionista = body.nitComisionista;
            params.numeroContrato = body.numeroContrato;
            params.fechaInicio = body.fechaInicio;
            params.fechaFin = body.fechaFin;
            res = await impuestosOp.registroPuntoVentaComisionista(params);
        } else {
            res = await impuestosOp.registroPuntoVenta(params);
        }
        if (!res.transaccion) {
            throw Error(await app.dao.catalogo.getError(res.mensajesList.map(val => val.codigo.toString())));
        }
        return await models.punto_venta.create({
            nombre: body.nombre,
            descripcion: body.descripcion,
            codigo: res.codigoPuntoVenta,
            tipo: body.tipo,
            fid_sucursal: body.fidSucursal,
            _usuario_creacion: usuario.usuario
        }, {
            transaccion: t
        });
    }

    async function cuis(idPuntoVenta, usuario, t) {
        const params = await getId(idPuntoVenta, t);
        await models.cuis.update({
            estado: 'CERRADO',
            _usuario_modificacion: usuario
        }, {
            where: {
                fid_punto_venta: idPuntoVenta,
                estado: 'ACTIVO'
            },
            transaction: t
        });
        delete params['cuis'];
        const res = await impuestos.cuis(params);
        if (!res.transaccion) {
            throw Error(await app.dao.catalogo.getError(res.mensajesList.map(val => val.codigo.toString())).then(men => men == null ? res.mensajesList.map(val => val.descripcion) : men));
        }
        return await models.cuis.create({
            codigo: res.codigo,
            vigencia: res.fechaVigencia,
            fid_punto_venta: idPuntoVenta,
            _usuario_creacion: usuario
        }, {
            transaction: t
        });
    }

    return {
        getIdPuntoVenta,
        getId,
        getIdC,
        getPuntosVenta,
        listar,
        post,
        cuis
    };
};
