const Sequelize = require('sequelize');
const config = require('../config/config')();
const Op = Sequelize.Op;

module.exports = (app) => {
    const models = app.db.models;

    async function post(body, audit, t) {
        const contrib = await models.contribuyente.create({
            nombre: body.nombre,
            nit: body.nit,
            codigo_ambiente: body.codigo_ambiente,
            codigo_modalidad: body.codigo_modalidad,
            _usuario_creacion: audit.usuario
        }, {
            transaction: t
        });
        return contrib;
    }

    async function put(id, body, t) {
        const contrib = await models.contribuyente.findByPk(id, {
            transaction: t
        });
        contrib.nombre = body.nombre;
        contrib.nit = body.nit;
        contrib.codigo_ambiente = body.codigo_ambiente;
        contrib.codigo_modalidad = body.codigo_modalidad;
        contrib._usuario_modificacion = body.audit_usuario.usuario;
        return await contrib.save({
            transaction: t
        });
    }

    async function listar(req,t) {
        const options = { }

        // filtro por razon social
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

        let limit = req.query.limit;   // numero de respuestas por pagina
        let page = req.params.page;
        let offset = limit * (page - 1);
        return await models.contribuyente.findAndCountAll({
            attributes: ['id_contribuyente',
                'nombre',
                'nit',
                'codigo_ambiente',
                'codigo_modalidad',
                'estado'],
            where: options,
            limit: limit,
            offset: offset,
            order: [['nombre', 'ASC']]
        }).then(function (data) {
            page = Math.ceil(data.count / limit);
            return data;
        });
    }

    async function get(t) {
        const contribuyenteRes = await models.contribuyente.findAll({
            attributes: ['id_contribuyente',
            'nombre',
            'nit',
            'codigo_ambiente',
            'codigo_modalidad',
            'estado'],
            transaction: t
        });
        if (contribuyenteRes.length) {
            return contribuyenteRes.map(e => e.toJSON());
        } else {
            return contribuyenteRes;
        }
    }

    return {
        post,
        put,
        listar,
        get
    };
};
