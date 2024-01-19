const logs = require('../lib/logs');
module.exports = (app) => {
    async function getActividades(req, res) {
        const t = await app.db.sequelize.transaction();
        try {
            const actividades = await app.dao.catalogo.getActividades(t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Datos obtenidos.',
                datos: actividades,
            });
        } catch (error) {
            await logs(app.db.models.logs).error(error.message, error.name, error, req.body.audit_usuario.usuario);
            await t.rollback();
            throw error;
        }    
    }
    
    async function getCodigoSinActividad(req, res) {
        const t = await app.db.sequelize.transaction();
        try {
            const codAct = await app.dao.catalogo.getCodigoSinActividad(req.query.codigo.toString(), t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Datos obtenidos.',
                datos: codAct,
            });
        } catch (error) {
            await logs(app.db.models.logs).error(error.message, error.name, error, req.body.audit_usuario.usuario);
            await t.rollback();
            throw error;
        }    
    }

    async function getCatalogo(req, res) {
        const t = await app.db.sequelize.transaction();
        try {
            const codCat = await app.dao.catalogo.getCatalogo(req.params.agrupador, req.body.audit_usuario.id_contribuyente, t);
            console.log(codCat);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Datos obtenidos.',
                datos: codCat,
            });
        } catch (error) {
            await logs(app.db.models.logs).error(error.message, error.name, error, req.body.audit_usuario.usuario);
            await t.rollback();
            throw error;
        }    
    };

    return {
        getActividades,
        getCodigoSinActividad,
        getCatalogo
    };
};
