const logs = require('../lib/logs');
module.exports = (app) => {
    async function index(req, res) {
        const t = await app.db.sequelize.transaction();
        try {
            const clientes = await app.dao.cliente.listar(req, t);
            let page = Math.ceil(clientes.count / req.query.limit);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Datos obtenidos.',
                datos: clientes.rows,
                paginacion:{
                  totalRegistros:clientes.count,
                  paginas:page,
                  paginaActual:req.params.page,
                  cantidad:clientes.rows.length
                }
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
            await app.dao.cliente.editarCliente(req.params.id, req.body, req.body.audit_usuario.usuario, t);
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

    async function buscaCliente(req, res) {
        const t = await app.db.sequelize.transaction();
        try {
            var cliente = await app.dao.cliente.buscarCliente(req.params.id, t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Datos encontrados',
                datos: cliente
            });
        } catch (error) {
            await logs(app.db.models.logs).error(error.message, error.name, error, req.body.audit_usuario.usuario);
            await t.rollback();
            throw error;
        }    
    }

    async function buscaClienteCI(req, res) {
        const t = await app.db.sequelize.transaction();
        try {
            var cliente = await app.dao.cliente.buscaClienteCIC(req.params.ci, req.query.complemento, req.query.tipoDoc, t);
            if (req.query.tipoDoc == 5) {
                const params = await app.dao.punto_venta.getIdC(req.body.audit_usuario.id_contribuyente, t);
                params.nitParaVerificacion = req.params.ci.trim();
                delete params['codigoPuntoVenta'];
                const nit = await require('../services/impuestos/codigos')(app).verificarNit(params);
                if (cliente) {
                    cliente.nitValidado = nit.transaccion;
                } else {
                    cliente = {
                        nitValidado: nit.transaccion
                    };
                }
            }
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Datos encontrados',
                datos: cliente
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
            var cliente = await app.dao.cliente.getCodigoCliente(req.body, req.query.tipoDoc, t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Datos encontrados',
                datos: cliente
            });
        } catch (error) {
            await logs(app.db.models.logs).error(error.message, error.name, error, req.body.audit_usuario.usuario);
            await t.rollback();
            throw error;
        }    
    }

    return {
        index,
        put,
        buscaCliente,
        buscaClienteCI,
        post
    };
};
