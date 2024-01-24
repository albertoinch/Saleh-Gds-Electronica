const jwt = require('jwt-simple');
const cors = require('cors');
const Sequelize = require('sequelize');
const asyncHandler = require('../lib/asyncHandler');
const Op = Sequelize.Op;

module.exports = (app) => {
    const models = app.db.models;

    // Configuracion de cors.
    app.use(cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        preflightContinue: true,
        headers: 'Cache-Control, Pragma, Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        'Pragma': 'no-cache'
    }));

    app.use(app.config.api.main, asyncHandler(async (req, res, next) => {
        if (req.method === 'OPTIONS') {
            res.send('');
            return;
        }
        if (req.headers.authorization) {
            const parts = req.headers.authorization.split(' ');
            const token = parts[1];
            if (parts[0] === 'JWT') {
                if (token) {
                    let tokenDecoded;
                    try {
                        tokenDecoded = jwt.decode(token, app.config.secret);
                    } catch (error) {
                        throw Error('Falló la autenticación del token.');
                    }
                    const rutas = await models.usuario.findAll({
                        attributes: [
                            'id_usuario',
                            [Sequelize.literal('ruta'), 'ruta'],
                            [Sequelize.literal('method_get'), 'method_get'],
                            [Sequelize.literal('method_post'), 'method_post'],
                            [Sequelize.literal('method_put'), 'method_put'],
                            [Sequelize.literal('method_delete'), 'method_delete']
                        ],
                        include: [
                            {
                                attributes: [],
                                model: models.grupo,
                                as: 'grupos',
                                include: [
                                    {
                                        attributes: [],
                                        model: models.ruta,
                                        as: 'rutas',
                                        where: {
                                            estado: 'ACTIVO'
                                        }
                                    }
                                ],
                                where: {
                                    estado: 'ACTIVO'
                                }
                            }
                        ],
                        where: {
                            id_usuario: tokenDecoded.id_usuario,
                            token: tokenDecoded.exp.toString(),
                            [Op.and]: [
                                Sequelize.literal(`token::Int > EXTRACT(EPOCH FROM now())::Int`)
                            ]
                        },
                        raw: true
                    });
                    if (rutas && rutas.length) {
                        let rutaPermitida = false;
                        for (let i = 0; i < rutas.length; i += 1) {
                            const ruta = rutas[i];
                            if (req.originalUrl === ruta.ruta ||
                                req.originalUrl.substring(0, req.originalUrl.length - 1) === ruta.ruta ||
                                req.originalUrl.indexOf(ruta.ruta) >= 0) {
                                if ((req.method === 'GET' && ruta.method_get) ||
                                    (req.method === 'POST' && ruta.method_post) ||
                                    (req.method === 'PUT' && ruta.method_put) ||
                                    (req.method === 'DELETE' && ruta.method_delete) ||
                                    (req.method === 'OPTIONS')) {
                                    rutaPermitida = true;
                                    break;
                                }
                            }
                        }
                        if (rutaPermitida) {
                            // Insertando los datos para auditoria en el req.body
                            req.body.audit_usuario = {
                                id_usuario: tokenDecoded.id_usuario,
                                id_persona: tokenDecoded.id_persona,
                                id_contribuyente: tokenDecoded.id_contribuyente,
                                id_grupo: tokenDecoded.id_grupo,
                                sucursal: tokenDecoded.sucursal,
                                punto_venta: tokenDecoded.puntoVenta,
                                usuario: tokenDecoded.usuario
                            };
                            next();
                        } else {
                            throw Error('Usted no tiene acceso a dichos recursos.');
                        }
                    } else {
                        throw Error('El token expiró.');
                    }
                } else {
                    throw Error('No se encontró el token de seguridad.');
                }
            } else {
                throw Error('La autorización debe comenzar con JWT.');
            }
        } else {
            throw Error('No se encontró la cabecera de autorización.');
        }
    }));
};
