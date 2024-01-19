const jwt = require('jwt-simple');

module.exports = (app) => {
    async function autenticar(req, res) {
        const t = await app.db.sequelize.transaction();
        try {
            usuario = await app.dao.usuario.autenticar(req.body.username, req.body.password, false, t);
            const token = jwt.encode(usuario.usuario, app.config.secret);
            t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Autenticación satisfactoria.',
                token: token,
                datos: usuario
            });
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    return {
        autenticar
    };
};
