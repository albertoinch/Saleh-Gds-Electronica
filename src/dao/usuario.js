const crypto = require('crypto');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = (app) => {
    const models = app.db.models;

    async function autenticar(usuario, contrasena, ldap, t) {
        const usuarioRes = await models.usuario.findOne({
            attributes: ['id_usuario', 'fid_persona', 'fid_contribuyente', 'usuario', [Sequelize.literal(`EXTRACT(EPOCH FROM now() + '1 day'::Interval)::Int`), 'exp']],
            include: [
                {
                    attributes: ['nombres', 'primer_apellido', 'segundo_apellido'],
                    model: models.persona,
                    as: 'persona',
                }, {
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
                }, {
                    attributes: ['id_grupo', 'grupo'],
                    model: models.grupo,
                    as: 'grupos',
                    include: [
                        {
                            attributes: ['id_menu', 'label', 'descripcion', 'orden', 'ruta', 'icono', 'estado'],
                            model: models.menu,
                            as: 'menus'
                        }
                    ],
                    where: {
                        estado: 'ACTIVO'
                    }
                }
            ],
            where: {
                usuario: usuario,
                [Op.or]: {
                    contrasena: crypto.createHash('sha256').update(contrasena).digest('hex'),
                }
            },
            transaction: t
        });
        if (usuarioRes) {
            await models.usuario.update({
                token: usuarioRes.dataValues.exp
            }, {
                where: {
                    id_usuario: usuarioRes.id_usuario
                },
                transaction: t
            });
            return {
                usuario: {
                    id_usuario: usuarioRes.id_usuario,
                    id_persona: usuarioRes.fid_persona,
                    usuario: usuarioRes.usuario,
                    nombres: usuarioRes.persona.nombres,
                    apellidos: usuarioRes.persona.primer_apellido ? usuarioRes.persona.segundo_apellido ? `${usuarioRes.persona.primer_apellido} ${usuarioRes.persona.segundo_apellido}` : usuarioRes.persona.primer_apellido : usuarioRes.persona.segundo_apellido,
                    id_grupo: usuarioRes.grupos[0].id_grupo,
                    cargo: usuarioRes.grupos[0].grupo,
                    id_contribuyente: usuarioRes.fid_contribuyente,
                    sucursal: usuarioRes.punto_venta ? usuarioRes.punto_venta.sucursal ? usuarioRes.punto_venta.sucursal.codigo : '0' : '0',
                    puntoVenta: usuarioRes.punto_venta ? usuarioRes.punto_venta.codigo : '0',
                    exp: usuarioRes.dataValues.exp
                },
                menu: usuarioRes.grupos[0].menus
            };
        } else {
            throw {
                status: 412,
                code: 2001,
                message: 'Usuario o contraseña incorrectos.'
            };
        }
    }

    async function token(id, t) {
        const usuarioRes = await models.usuario.findOne({
            attributes: ['id_usuario', 'fid_persona', 'fid_contribuyente', 'usuario', [Sequelize.literal(`EXTRACT(EPOCH FROM now() + '365 day'::Interval)::Int`), 'exp']],
            include: [
                {
                    attributes: ['id_grupo', 'grupo'],
                    model: models.grupo,
                    as: 'grupos'
                }
            ],
            where: {
                id_usuario: id
            },
            transaction: t
        });
        if (usuarioRes) {
            await models.usuario.update({
                token: usuarioRes.dataValues.exp
            }, {
                where: {
                    id_usuario: usuarioRes.id_usuario
                },
                transaction: t
            });
            return {
                id_usuario: usuarioRes.id_usuario,
                id_persona: usuarioRes.fid_persona,
                usuario: usuarioRes.usuario,
                id_grupo: usuarioRes.grupos[0].id_grupo,
                id_contribuyente: usuarioRes.fid_contribuyente,
                exp: usuarioRes.dataValues.exp
            };
        } else {
            throw {
                status: 412,
                code: 2001,
                message: 'Usuario o contraseña incorrectos.'
            };
        }
    }

    //funciones recuperadas
    async function get(usuario, t) {
        return await models.usuario.findOne({
            attributes: ['id_usuario', 'fid_persona', 'fid_punto_venta', 'usuario', [Sequelize.literal(`EXTRACT(EPOCH FROM now() + '1 day'::Interval)::Int`), 'exp']],
            include: [
                {
                  attributes: ['nombres', 'primer_apellido', 'segundo_apellido'],
                  model: models.persona,
                  as: 'persona',
                },{
                    attributes: ['id_grupo', 'grupo'],
                    model: models.grupo,
                    as: 'grupos',
                    include: [
                        {
                            attributes: ['id_menu', 'label','icono', 'ruta', 'estado', 'orden'],
                            model: models.menu,
                            as: 'menus'
                        }
                    ],
                    where: {
                        estado: 'ACTIVO'
                    }
                  }
              ],
            where: {
                usuario: usuario
            },
            transaction: t
        });
    }

    async function crear(usuario, t) {
        const usuarioRes = await models.usuario.findOne({
            where: {
                usuario: usuario.uid
            },
            transaction: t
        });
        if (!usuarioRes) {
            const persona = await app.dao.persona.crear(usuario, t);
            const usuarioNew = await models.usuario.create({
                usuario: usuario.uid,
                fid_persona: persona.id_persona,
                fid_sucursal: 1,
                fid_punto_venta: 1,
                _usuario_creacion: usuario.uid
            }, {
                transaction: t
            });
            await app.db.sequelize.query(`INSERT INTO usuario_grupo (fid_grupo, fid_usuario, _fecha_creacion, _fecha_modificacion) VALUES(4, ${usuarioNew.id_usuario}, now(), now());`, {
                type: Sequelize.QueryTypes.INSERT,
                transaction: t
            });
        }
        return await autenticar(usuario.uid, undefined, true, t);
    }

    async function postUsuarioGrupo(body, usuario, t) {
        const usuarioRes = await models.usuario.create({
            usuario: body.usuario,
            contrasena: crypto.createHash('sha256').update(body.contrasena).digest('hex'),
            fid_persona: body.fid_persona,
            fid_contribuyente: body.fid_contribuyente,
            _usuario_creacion: usuario
        }, {
            transaction: t
        });
        await models.usuario_grupo.create({
            fid_grupo: 3,
            fid_usuario: usuarioRes.id_usuario
        }, {
            transaction: t
        });
        return usuarioRes;
    }

    async function index(req, t){
        var options = {
            fid_contribuyente: req.body.audit_usuario.id_contribuyente
        };
        var options2 = {}
        if (req.query.buscarUsuario) {
            options.usuario = {
                [Op.iLike]:'%'+req.query.buscarUsuario+'%'
            }
        }
        if (req.query.buscarNombre) {
            options2.nombres = {
                [Op.iLike]:'%'+req.query.buscarNombre+'%'
            }
        }
        let limit = req.query.limit; 
        let page = req.params.page;
        let offset = limit * (page - 1);
        return await models.usuario.findAndCountAll({
            attributes: ['id_usuario', 'usuario', 'fid_persona', 'estado', 'fid_contribuyente', ['fid_punto_venta', 'fidPuntoVenta'], '_fecha_creacion'],
            include:[
                {
                    attributes: ['nombres', 'primer_apellido', 'segundo_apellido'],
                    model: models.persona,
                    as: 'persona',
                    where: options2
                }, {
                    attributes: ['id_contribuyente', 'nombre'],
                    model: models.contribuyente,
                    as: 'contribuyente',
                }, {
                    model: models.grupo,
                    as: 'grupos',
                    where: {
                        estado: 'ACTIVO'
                    }
                }
            ],
            where: options,
            limit: limit,
            offset: offset,
            order: [['_fecha_creacion', 'DESC']],
            transaction: t
        }).then( data => {
            page = Math.ceil(data.count / limit);
            return data;
        });
    }

    async function grupos(t){
        return await models.grupo.findAll({
        attributes:['id_grupo', 'grupo', 'descripcion', 'estado'],
        transaction: t});
    }

    async function update(idUsuario, datos, usuario, t){
        await models.usuario_grupo.update({
            fid_grupo: datos.fidGrupo
        }, {
            where: {
                fid_usuario: idUsuario
            },
            transaction: t
        });
        return await models.usuario.update({
            estado: datos.estado,
            fid_contribuyente: datos.fid_contribuyente,
            fid_punto_venta : datos.fidPuntoVenta,
            _usuario_modificacion: usuario.usuario
        }, { 
            where: {
                id_usuario: idUsuario
            },
            transaction: t
        });
    }

    async function getUsuario(id,t){
        const usuarioRes = await models.usuario.findOne({
            attributes: ['id_usuario', 'fid_persona', 'fid_punto_venta', 'usuario', 'estado'],
            include: [
                {
                    attributes: ['nombres', 'primer_apellido', 'segundo_apellido'],
                    model: models.persona,
                    as: 'persona',
                }, {
                    attributes: ['id_grupo', 'grupo'],
                    model: models.grupo,
                    as: 'grupos',
                    where: {
                        estado: 'ACTIVO'
                    }
                }
            ],
            where: {
                id_usuario: id,
            },
            transaction: t
        });
    
        if (!usuarioRes) {
            throw Error("No se encontro al usuario");
        }
        return usuarioRes;
    }

    return {
        autenticar,
        token,
        get,
        crear,
        postUsuarioGrupo,
        index,
        grupos,
        update,
        getUsuario
    };
};
