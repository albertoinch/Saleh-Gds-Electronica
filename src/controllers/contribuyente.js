const logs = require('../lib/logs');

module.exports = (app) => {
    async function post(req, res) {
        const t = await app.db.sequelize.transaction();
        try {
            await app.dao.contribuyente.post(req.body, req.body.audit_usuario, t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Contribuyente creado.'
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
            await app.dao.contribuyente.put(req.params.id, req.body, t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Contribuyente actualizado.'
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
            const contribuyentes = await app.dao.contribuyente.listar(req, t);
            let page = Math.ceil(contribuyentes.count / req.query.limit);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Datos obtenidos.',
                datos: contribuyentes.rows,
                paginacion:{
                  totalRegistros:contribuyentes.count,
                  paginas:page,
                  paginaActual:req.params.page,
                  cantidad:contribuyentes.rows.length
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
            const contribuyentes = await app.dao.contribuyente.get(t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: "Contribuyente Encontrado",
                datos: contribuyentes
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
        get
    };
};
