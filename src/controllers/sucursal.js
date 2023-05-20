const logs = require('../lib/logs');
const { params } = require('../routes/sucursal-val');
module.exports = (app) => {
    async function post(req, res) {
        const t = await app.db.sequelize.transaction();
        try {
            await app.dao.sucursal.post(req.body, req.body.audit_usuario, t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Sucursal creada.'
            });
        } catch (error) {
            await logs(app.db.models.logs).error(error.message, error.name, error, req.body.audit_usuario.usuario);
            await t.rollback();
            throw error;
        }
    }

    async function put(req, res) {
        const t = await app.db.sequelize.transaction();
        try {
            await app.dao.sucursal.put(req.params.id, req.body, t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Sucursal actualizada.'
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
            const sucursales = await app.dao.sucursal.listar(req, t);
            let page = Math.ceil(sucursales.count / req.query.limit);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Datos obtenidos.',
                datos: sucursales.rows,
                paginacion:{
                  totalRegistros:sucursales.count,
                  paginas:page,
                  paginaActual:req.params.page,
                  cantidad:sucursales.rows.length
                }
            });
        } catch (error) {
            await logs(app.db.models.logs).error(error.message, error.name, error, req.body.audit_usuario.usuario);
            await t.rollback();
            throw error;
        }    
    }

    async function get(req, res){
        const t = await app.db.sequelize.transaction();
        try {
            const sucursal = await app.dao.sucursal.getId(req.params.id, undefined, t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: "Sucursal Encontrada",
                datos: sucursal
            });
        } catch (error) {
            await logs(app.db.models.logs).error(error.message, error.name, error, req.body.audit_usuario.usuario);
            await t.rollback();
            throw error;
        }
    }

    async function getSucursales(req, res) {
        const t = await app.db.sequelize.transaction();
        try {
            //const sucursales = await app.dao.sucursal.sucursales(t);
            const sucursales = await app.dao.sucursal.getSucursales(req.body.audit_usuario.id_contribuyente, t);
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

    return {
        post,
        put,
        index,
        get,
        getSucursales
    };
};
