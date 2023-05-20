const jwt = require('jwt-simple');
const logs = require('../lib/logs');
module.exports = (app) => {

    async function post(req,res){
      const t = await app.db.sequelize.transaction();
        try {
            const usuario = await app.dao.usuario.postUsuarioGrupo(req.body, req.body.audit_usuario.usuario, t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Asignación realizada correctamente',
                //datos: usuario
            });
        } catch (error) {
            await logs(app.db.models.logs).error(error.message, error.name, error, req.body.audit_usuario.usuario);
            await t.rollback();
            throw error;
        }
          
    }

    async function index(req, res){
        const t = await app.db.sequelize.transaction();
        try {
            const usuarios = await app.dao.usuario.index(req, t);
            let page = Math.ceil(usuarios.count / req.query.limit);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Datos obtenidos.',
                datos: usuarios.rows,
                paginacion:{
                  totalRegistros: usuarios.count,
                  paginas: page,
                  paginaActual: req.params.page,
                  cantidad: usuarios.rows.length
                }
            });
        } catch (error) {
            await logs(app.db.models.logs).error(error.message, error.name, error, req.body.audit_usuario.usuario);
            await t.rollback();
            throw error;
        }
    }

    async function grupos(req, res){
        const t = await app.db.sequelize.transaction();
        try {
            const usuarios = await app.dao.usuario.grupos(t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Datos obtenidos.',
                datos: usuarios,
            });
        } catch (error) {
            await logs(app.db.models.logs).error(error.message, error.name, error, req.body.audit_usuario.usuario);
            await t.rollback();
            throw error;
        }
    }

    async function update(req,res){
        const t = await app.db.sequelize.transaction();
          try {
              await app.dao.usuario.update(req.params.id, req.body, req.body.audit_usuario.usuario, t);
              await t.commit();
              res.json({
                  finalizado: true,
                  mensaje: 'Edición realizada correctamente.',
                  //datos: usuario
              });
          } catch (error) {
              await logs(app.db.models.logs).error(error.message, error.name, error, req.body.audit_usuario.usuario);
              await t.rollback();
              throw error;
          }
            
    }

    async function get(req, res) {
        const t = await app.db.sequelize.transaction();
        try {
            const datos = await app.dao.usuario.getUsuario(req.params.id, t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Usuario obtenido',
                datos: datos
            });
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    async function getToken(req, res) {
        const t = await app.db.sequelize.transaction();
        try {
            usuario = await app.dao.usuario.token(req.params.id, t);
            const token = jwt.encode(usuario, app.config.secret);
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
        post,
        index,
        grupos,
        update,
        get,
        getToken
    }
};