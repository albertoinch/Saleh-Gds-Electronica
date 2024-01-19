const logs = require('../lib/logs');
module.exports = (app) => {
    const cola = require('../lib/cola')(app);

    async function get(req, res) {
        const t = await app.db.sequelize.transaction();
        try {
            const item = await app.dao.item.items(t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Items.',
                datos: item
            });
        } catch (error) {
            await logs(app.db.models.logs).error(error.message, error.name, error, req.body.audit_usuario.usuario);
            await t.rollback();
            throw error;
        }
    }

    async function post(req, res) {
        const t = await app.db.sequelize.transaction();
        try {
            const item = await app.dao.item.post(req.body, t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Producto creado',
                datos: item
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
            const items = await app.dao.item.index(req, t);
            let page = Math.ceil(items.count / req.query.limit);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Datos obtenidos.',
                datos: items.rows,
                paginacion:{
                  totalRegistros:items.count,
                  paginas:page,
                  paginaActual:req.params.page,
                  cantidad:items.rows.length
                }
            });
        } catch (error) {
            await logs(app.db.models.logs).error(error.message, error.name, error, req.body.audit_usuario.usuario);
            await t.rollback();
            throw error;
        }
    }

    async function solicitudNuevoProducto(req, res) {
        const t = await app.db.sequelize.transaction();
        try {
            await app.dao.item.solicitudNuevoProducto(req.params.id, req.body.audit_usuario, t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Solicitud realizada.',
                datos: undefined
            });
        } catch (error) {
            await logs(app.db.models.logs).error(error.message, error.name, error, req.body.audit_usuario.usuario);
            await t.rollback();
            throw error;
        }
    }

    async function validarNuevoProducto(req, res) {
        const t = await app.db.sequelize.transaction();
        try {
            await app.dao.item.validarNuevoProducto(req.params.id, req.body.audit_usuario, t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Validación realizada.',
                datos: undefined
            });
        } catch (error) {
            await logs(app.db.models.logs).error(error.message, error.name, error, req.body.audit_usuario.usuario);
            await t.rollback();
            throw error;
        }
    }

    async function buscaItem(req, res){
        const t = await app.db.sequelize.transaction();
        try {
            const item = await app.dao.item.buscarItem(req.params.id, t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Item.',
                datos: item
            });
        } catch (error) {
            await logs(app.db.models.logs).error(error.message, error.name, error, req.body.audit_usuario.usuario);
            await t.rollback();
            throw error;
        }
    }

    async function put(req, res){
        const t = await app.db.sequelize.transaction();
        try {
            await app.dao.item.editarItem(req.params.id, req.body, req.body.audit_usuario.usuario, t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Edición correcta',
            });
        } catch (error) {
            await logs(app.db.models.logs).error(error.message, error.name, error, req.body.audit_usuario.usuario);
            await t.rollback();
            throw error;
        }
    }

    async function catalogo(req, res) {
        const t = await app.db.sequelize.transaction();
        try {
            await app.dao.catalogo.sincronizar(1, t);
            //await cola.cufd(1, req.body.audit_usuario.usuario, t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'El catalogo fue actualizado correctamente',
            });
        } catch (error) {
            await logs(app.db.models.logs).error(error.message, error.name, error, req.body.audit_usuario.usuario);
            await t.rollback();
            throw error;
        }
    }

    return {
        get,
        post,
        index,
        solicitudNuevoProducto,
        validarNuevoProducto, 
        buscaItem,
        put,
        catalogo
    };
};
