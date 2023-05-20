const logs = require('../lib/logs');
module.exports = (app) => {
    async function post(req, res) {
        const t = await app.db.sequelize.transaction();
        try {
            await app.dao.punto_venta.post(req.body, req.body.audit_usuario, t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Punto de venta creado.'
            });
        } catch (error) {
            //await app.dao.error(error, new Date(), req.body.audit_usuario.id_punto_venta, req.body.audit_usuario.usuario);
            await logs(app.db.models.logs).error(error.message, error.name, error, req.body.audit_usuario.usuario);
            await t.rollback();
            throw error;
        }
    }

    async function get(req, res) {
        const t = await app.db.sequelize.transaction();
        try {
            //const sucursales = await app.dao.sucursal.sucursales(t);
            const sucursales = await app.dao.punto_venta.getPuntosVenta(t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Sucursales.',
                datos: sucursales
            });
        } catch (error) {
            await logs(app.db.models.logs).error(error.message, error.name, error, req.body.audit_usuario.usuario);
            await t.rollback();
            throw error;
        }
    }

    async function index(req, res) {
        const t = await app.db.sequelize.transaction();
        try {
            const puntos = await app.dao.punto_venta.listar(req, t);
            let page = Math.ceil(puntos.count / req.query.limit);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Datos obtenidos.',
                datos: puntos.rows,
                paginacion:{
                  totalRegistros:puntos.count,
                  paginas:page,
                  paginaActual:req.params.page,
                  cantidad:puntos.rows.length
                }
            });
        } catch (error) {
            await logs(app.db.models.logs).error(error.message, error.name, error, req.body.audit_usuario.usuario);
            await t.rollback();
            throw error;
        }    
    }

    async function registrar(req, res) {
        const t = await app.db.sequelize.transaction();
        try {
            const punto = await app.dao.punto_venta.registrarPuntoEvento(req.params.id, t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Punto de Venta registrado.',
                datos: punto
            });
        } catch (error) {
            await logs(app.db.models.logs).error(error.message, error.name, error, req.body.audit_usuario.usuario);
            await t.rollback();
            throw error;
        }
    }

    async function indexS(req, res) {
        const t = await app.db.sequelize.transaction();
        try {
            const puntos = await app.dao.punto_venta.listar(req.params.id, req, t);
            let page = Math.ceil(puntos.count / req.query.limit);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Datos obtenidos.',
                datos: puntos.rows,
                paginacion:{
                  totalRegistros:puntos.count,
                  paginas:page,
                  paginaActual:req.params.page,
                  cantidad:puntos.rows.length
                }
            });
        } catch (error) {
            await logs(app.db.models.logs).error(error.message, error.name, error, req.body.audit_usuario.usuario);
            await t.rollback();
            throw error;
        }    
    }

    async function cierrePuntoVenta(req, res) {
        const t = await app.db.sequelize.transaction();
        try {
            await app.dao.punto_venta.cierrePuntoVenta(req.params.id, req.body.audit_usuario.usuario, t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Punto de Venta cerrado',
                datos: undefined
            });
        } catch (error) {
            await logs(app.db.models.logs).error(error.message, error.name, error, req.body.audit_usuario.usuario);
            await t.rollback();
            throw error;
        }
    }

    async function cuis(req, res) {
        const t = await app.db.sequelize.transaction();
        try {
            await app.dao.punto_venta.cuis(req.body.id, req.body.audit_usuario.usuario, t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'CUIS obtenido correctamente.',
                datos: undefined
            });
        } catch (error) {
            await logs(app.db.models.logs).error(error.message, error.name, error, req.body.audit_usuario.usuario);
            await t.rollback();
            throw error;
        }
    }

    return {
        post,
        get,
        index,
        registrar,
        indexS,
        cierrePuntoVenta,
        cuis
    };
};
