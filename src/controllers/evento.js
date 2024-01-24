const moment = require('moment');

module.exports = (app) => {
    async function post(req, res) {
        if (parseInt(req.body.codigoEvento) < 3) {
            req.body.fecha_inicio = moment().format('YYYY-MM-DD HH:MM:SS');
            //throw new Error('El código 1 y 2 se gestionan automáticamente.');
        }
        req.body.manual = true;
        const t = await app.db.sequelize.transaction();
        try {
            const evento = await app.dao.evento_significativo.crear(req.body, t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Evento iniciado.',
                datos: evento
            });
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    async function close(req, res) {
        const t = await app.db.sequelize.transaction();
        try {
            if (req.params.id == undefined) {
                req.params.id = await app.dao.punto_venta.getIdPuntoVenta(req.params.punto, req.params.suc, t);
            }
            const evento = await app.dao.evento_significativo.cerrar(req.params.id, req.body, t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Evento cerrado.',
                datos: evento
            });
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    async function estado(req, res) {
        const t = await app.db.sequelize.transaction();
        try {
            req.params.id = await app.dao.punto_venta.getIdPuntoVenta(req.params.punto, req.params.suc, t);
            const evento = await app.dao.evento_significativo.getEstado(req.params.id, t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Estado obtenido.',
                datos: evento
            });
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    async function index(req, res) {
        const t = await app.db.sequelize.transaction();
        try {
            const eventos = await app.dao.evento_significativo.listar(req, t);
            let page = Math.ceil(eventos.count / req.query.limit);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Datos obtenidos.',
                datos: eventos.rows,
                paginacion:{
                  totalRegistros:eventos.count,
                  paginas:page,
                  paginaActual:req.params.page,
                  cantidad:eventos.rows.length
                }
            });
        } catch (error) {
            await logs(app.db.models.logs).error(error.message, error.name, error, req.body.audit_usuario.usuario);
            await t.rollback();
            throw error;
        }
    }

    return {
        post,
        close,
        estado,
        index
    };
};
