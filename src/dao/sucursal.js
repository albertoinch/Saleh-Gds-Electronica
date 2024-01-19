const Sequelize = require('sequelize');
const config = require('../config/config')();
const Op = Sequelize.Op;

module.exports = (app) => {
    const impuestos = require('../services/impuestos/codigos')(app);
    const models = app.db.models;

    async function getId(id, idPuntoVenta, t) {
        const sucursalRes = await models.sucursal.findOne({
            attributes: [
                ['id_sucursal', 'idSucursal'],
                ['direccion', 'direccion'],
                ['codigo', 'codigoSucursal'],
                [Sequelize.literal('"contribuyente"."nit"'), 'nitEmisor'],
                ['nombre', 'razonSocialEmisor'],
                ['telefono', 'telefono'],
                ['municipio', 'municipio'],
                [Sequelize.literal('"contribuyente"."codigo_ambiente"'), 'codigoAmbiente'],
                [Sequelize.literal('"contribuyente"."codigo_modalidad"'), 'codigoModalidad'],
                [Sequelize.literal(`'${config.impuestos.codigoSistema}'`), 'codigoSistema'],
                [Sequelize.literal('"punto_venta"."codigo"'), 'codigoPuntoVenta'],
                [Sequelize.literal('"punto_venta->cuist"."codigo"'), 'cuis'],
                [Sequelize.literal('"punto_venta->cuist"."vigencia"'), 'vigenciaCuis']
            ],
            include: [
                {
                    attributes: [],
                    model: models.punto_venta,
                    as: 'punto_venta',
                    include: [
                        {
                            attributes: [],
                            model: models.cuis,
                            as: 'cuist',
                            required: false,
                            where: {
                                estado: 'ACTIVO'
                            }
                        }
                    ],
                    required: false,
                    where: idPuntoVenta ? {
                        id_punto_venta: idPuntoVenta
                    } : undefined
                }, {
                    attributes: [],
                    model: models.contribuyente,
                    as: 'contribuyente'
                }
            ],
            where: {
                id_sucursal: id
            },
            transaction: t
        });
        if (sucursalRes) {
            return sucursalRes.toJSON();
        } else {
            return sucursalRes;
        }
    }

    async function verificarNit(id, nit, t) {
        const params = await models.sucursal.findOne({
            attributes: [
                ['codigo_ambiente', 'codigoAmbiente'],
                ['codigo_modalidad', 'codigoModalidad'],
                ['codigo_sistema', 'codigoSistema'],
                ['codigo', 'codigoSucursal'],
                'cuis',
                'nit',
                [Sequelize.literal(nit), 'nitParaVerificacion']
            ],
            where: {
                id_sucursal: id
            },
            transaction: t
        });
        return await impuestos.verificarNit(params);
    }

    async function listar(req,t) {
        var nro = parseInt(req.query.buscarCodigo);
        const options = { }

        // filtro por CLIENTE
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
        //filtro por tipo de NRO de factura
        if(req.query.buscarCodigo != "0"){
            options.codigo = nro
        }

        let limit = req.query.limit;   // numero de respuestas por pagina
        let page = req.params.page;
        let offset = limit * (page - 1);
        return await models.sucursal.findAndCountAll({
            attributes: ['id_sucursal',
                'nombre',
                'municipio',
                'direccion',
                'telefono',
                'descripcion',
                'codigo',
                [Sequelize.literal('"contribuyente"."nit"'), 'nit'],
                [Sequelize.literal(`'${config.impuestos.codigoSistema}'`), 'codigo_sistema'],
                [Sequelize.literal('"contribuyente"."codigo_ambiente"'), 'codigo_ambiente'],
                [Sequelize.literal('"contribuyente"."codigo_modalidad"'), 'codigo_modalidad'],
                'estado'],
            include: [
                {
                    attributes: [],
                    model: models.contribuyente,
                    as: 'contribuyente'
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

    async function getSucursales(id, t) {
        return await models.sucursal.findAll({
            where: {
                fid_contribuyente: id
            },
            transaction: t
        });
    }

    async function post(body, audit, t) {
        const suc = await models.sucursal.create({
            codigo: body.codigo,
            nombre: body.nombre,
            descripcion: body.descripcion,
            municipio: body.municipio,
            direccion: body.direccion,
            telefono: body.telefono,
            fid_contribuyente: audit.id_contribuyente,
            _usuario_creacion: audit.usuario
        }, {
            transaction: t
        });
        await models.punto_venta.create({
            nombre: body.nombre,
            descripcion: body.descripcion,
            codigo: '0',
            fid_sucursal: suc.id_sucursal,
            _usuario_creacion: audit.usuario
        }, {
            transaction: t
        });
        return suc;
    }

    async function put(id, body, t) {
        const suc = await models.sucursal.findByPk(id, {
            transaction: t
        });
        suc.nombre = body.nombre;
        suc.municipio = body.municipio;
        suc.direccion = body.direccion;
        suc.telefono = body.telefono;
        suc.descripcion = body.descripcion;
        suc.codigo = body.codigo;
        suc.nit = body.nit;
        suc.codigo_sistema = body.codigo_sistema;
        suc.codigo_ambiente = body.codigo_ambiente;
        suc.codigo_modalidad = body.codigo_modalidad;
        return await suc.save({
            transaction: t
        });
    }

    return {
        getId,
        verificarNit,
        listar,
        getSucursales,
        post,
        put
    };
};
