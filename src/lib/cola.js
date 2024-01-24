const moment = require('moment');
const crypto = require('crypto');
const stackTrace = require('stack-trace');
const { gzip } = require('node-gzip');
const ping = require('../lib/ping');
const Mailer = require('../lib/mailer');

module.exports = (app) => {
    const impuestos = require('../services/impuestos/factura')(app);
    let runEnviar = false, contValidar = {}, runEnviarCorreo = false, runCufd = false;
    let resCufd, cont = 0;

    class Cola {
        constructor() {
            this.events = {
                stopEnviar: function() {},
                stopValidar: function() {},
                stopEnviarPaquete: function() {},
                stopValidarPaquete: function() {},
                stopEnviarCorreo: function() {},
                stopCufd: function() {}
            };
        }

        dispatchEvent(eventName) {
            this.events[eventName]();
        }

        setEventListener(eventName, callback) {
            this.events[eventName] = callback;
        }
    }

    const cola = new Cola();

    async function enviarFactura() {
        let t;
        try {
            t = await app.db.sequelize.transaction();
            const cufd = await app.dao.cufd.getAll(t);
            for (let j = 0; j < cufd.length; j++) {
                const evento = await app.dao.evento_significativo.getEvento(cufd[j].fid_punto_venta, t);
                if (evento && (evento.estado == 'CERRANDO' || !evento.manual || !moment(evento.fecha_inicio).startOf('day').isSame(moment().startOf('day'))) && parseInt(evento.codigo) < 5) {
                    if ((evento.codigo == 1 || evento.codigo == 2) && evento.estado == 'ACTIVO' && process.env.NODE_ENV != 'test') {
                        try {
                            if ((await impuestos.verificarComunicacion()).transaccion) {
                                if (app.fecha().getTime() - evento.fecha_inicio.getTime() > 60000) {
                                    const facturas = await app.dao.venta.getPendientes('PENDIENTE', cufd[j].codigo, 1, undefined, t);
                                    for (let i = 0; i < facturas.length; i++) {
                                        await app.dao.factura.actualizar(facturas[i].id_venta, 2, facturas[i].datos, cufd[j], t);
                                    }
                                    await app.dao.evento_significativo.cerrar(cufd[j].fid_punto_venta, {
                                        audit_usuario: {
                                            id_punto_venta: cufd[j].fid_punto_venta,
                                            usuario: 'cola'
                                        }
                                    }, t);
                                    await t.commit();
                                    t = await app.db.sequelize.transaction();
                                    await enviarPaquete();
                                }
                            }
                        } catch (e) {}
                    } else {
                        await t.commit();
                        t = await app.db.sequelize.transaction();
                        await enviarPaquete();
                    }
                    continue;
                }
                const facturas = await app.dao.venta.getPendientes('PENDIENTE', cufd[j].codigo, 1, undefined, t);
                if (facturas.length == 0) {
                    cont = 0;
                    if (contValidar[j] == undefined) {
                        contValidar[j] = 0;
                    }
                    if (contValidar[j] == 10) {
                        await validarPaquete();
                        await validarFactura(t);
                        if (evento && evento.estado == 'CERRANDO' && parseInt(evento.codigo) > 4) {
                            await t.commit();
                            t = await app.db.sequelize.transaction();
                            await enviarPaquete();
                        }
                        contValidar[j] = 0;
                    }
                    contValidar[j]++;
                    continue;
                } else {
                    contValidar[j] = 0;
                }
                let cambiar = false;
                try {
                    cambiar = (await impuestos.verificarComunicacion()).transaccion == false;
                    cont = 0;
                } catch (error) {
                    cambiar = true;
                }
                if (cambiar) {
                    cont++;
                }
                if (cont == 5) {
                    let codigo = 2;
                    let descripcion = 'SIAT inaccesible.';
                    if (!await ping.alive()) {
                        codigo = 1;
                        descripcion = 'Sin conexión a internet.';
                    }
                    await app.dao.evento_significativo.crear({
                        codigoEvento: codigo,
                        descripcion: descripcion,
                        idPuntoVenta: cufd[j].fid_punto_venta,
                        audit_usuario: {
                            id_punto_venta: cufd[j].fid_punto_venta,
                            usuario: 'cola'
                        }
                    }, t);
                }
                for (let i = 0; i < facturas.length && !cambiar; i++) {
                    try {
                        const b64 = Buffer.from(await gzip(facturas[i].factura)).toString('base64');
                        const params = {
                            codigoAmbiente: facturas[i].punto_venta.codigoAmbiente,
                            codigoDocumentoSector: facturas[i].codigo_documento_sector,
                            codigoEmision: facturas[i].tipo_emision,
                            codigoModalidad: facturas[i].punto_venta.codigoModalidad,
                            codigoPuntoVenta: facturas[i].punto_venta.codigoPuntoVenta,
                            codigoSistema: facturas[i].punto_venta.codigoSistema,
                            codigoSucursal: facturas[i].punto_venta.codigoSucursal,
                            cufd: facturas[i].cufd,
                            cuis: facturas[i].punto_venta.cuis,
                            nit: facturas[i].punto_venta.nit,
                            tipoFacturaDocumento: facturas[i].esquema.tipo_factura,
                            archivo: b64,
                            fechaEnvio: moment(app.fecha()).format('YYYY-MM-DDTHH:mm:ss.SSS'),
                            hashArchivo: crypto.createHash('sha256').update(b64, 'utf8').digest().toString('hex')
                        };
                        const recepcion = await impuestos.recepcionFactura(params);
                        if (!recepcion.transaccion) {
                            const men = await app.dao.catalogo.getError(recepcion.mensajesList.map(val => val.codigo.toString()), t);
                            await app.dao.venta.setObservacion(facturas[i].id_venta, men);
                            throw Error(men);
                        }
                        if (!recepcion.codigoRecepcion) {
                            throw Error(JSON.stringify(recepcion));
                        }
                        await app.dao.venta.setCodigoRecepcion(facturas[i].id_venta, recepcion.codigoRecepcion);
                    } catch (error) {
                        const trace = stackTrace.parse(error);
                        console.log(error, trace);
                    }
                }
            }
            await t.commit();
        } catch (error) {
            await t.rollback();
            if (process.env.NODE_ENV != 'test') {
                const trace = stackTrace.parse(error);
                console.log(error, trace);
            }
        }
        if (runEnviar) {
            setTimeout(enviarFactura, 1000);
        } else {
            cola.dispatchEvent('stopEnviar');
        }
    }

    async function validarFactura(t) {
        try {
            const cufd = await app.dao.cufd.getAll(t);
            for (let j = 0; j < cufd.length; j++) {
                const evento = await app.dao.evento_significativo.getEvento(cufd[j].fid_punto_venta, t);
                if (evento && parseInt(evento.codigo) < 5) {
                    throw new Error('Contingencia');
                }
                const facturas = await app.dao.venta.getPendientes('ENVIADO', cufd[j].codigo, 1, undefined, t);
                for (let i = 0; i < facturas.length; i++) {
                    try {
                        const params = {
                            codigoAmbiente: facturas[i].punto_venta.codigoAmbiente,
                            codigoDocumentoSector: facturas[i].codigo_documento_sector,
                            codigoEmision: facturas[i].tipo_emision,
                            codigoModalidad: facturas[i].punto_venta.codigoModalidad,
                            codigoPuntoVenta: facturas[i].punto_venta.codigoPuntoVenta,
                            codigoSistema: facturas[i].punto_venta.codigoSistema,
                            codigoSucursal: facturas[i].punto_venta.codigoSucursal,
                            cufd: facturas[i].cufd,
                            cuis: facturas[i].punto_venta.cuis,
                            nit: facturas[i].punto_venta.nit,
                            tipoFacturaDocumento: facturas[i].esquema.tipo_factura,
                            cuf: facturas[i].cuf
                        };
                        const validacion = await impuestos.verificacionEstadoFactura(params);
                        if (!validacion.transaccion) {
                            throw Error(await app.dao.catalogo.getError(validacion.listaCodigosRespuestas.map(val => val.toString())));
                        }
                        await app.dao.venta.setValidado(facturas[i].id_venta, t);
                    } catch (error) {
                        const trace = stackTrace.parse(error);
                        console.log(error, trace);
                    }
                }
            }
        } catch (error)  {
            if (process.env.NODE_ENV != 'test') {
                const trace = stackTrace.parse(error);
                console.log(error, trace);
            }
        }
    }

    async function enviarPaquete() {
console.log('******************');
        let t;
        try {
            t = await app.db.sequelize.transaction();
            const eventos = await app.dao.evento_significativo.getEventos(t);
            for (let j = 0; j < eventos.length; j++) {
                await app.dao.evento_significativo.finalizar(eventos[j].fid_punto_venta, t);
            }
            await t.commit();
            await validarPaquete();
        } catch (error) {
            await t.rollback();
            const trace = stackTrace.parse(error);
            console.log(error, trace);
        }
    }

    async function validarPaquete() {
        try {
            const codigos = await app.dao.venta.getCodigoRecepcion();
            for (let i = 0; i < codigos.length; i++) {
                try {
                    const validacion = await impuestos.validacionRecepcionPaqueteFactura(codigos[i]);
                    if (validacion.transaccion && validacion.codigoDescripcion != 'PENDIENTE') {
                        if (validacion.codigoDescripcion == 'OBSERVADA') {
                            const evento = await app.dao.evento_significativo.getEventoCufd(codigos[i].cufd);
                            for (let j = 0; j < validacion.mensajesList.length; j++) {
                                await app.dao.venta.setObservacion(evento.archivos[codigos[i].codigoDocumentoSector].find(a => a.nro == validacion.mensajesList[j].numeroArchivo).id_venta, validacion.mensajesList[j].descripcion);
                            }
                        }
                        await app.dao.venta.setValidadoPaquete(codigos[i].codigoRecepcion);
                    }
                } catch (error) {
                    const trace = stackTrace.parse(error);
                    console.log(error, trace);
                }
            }
        } catch (error) {
            const trace = stackTrace.parse(error);
            console.log(error, trace);
        }
    }

    async function enviarCorreo() {
        try {
            const correos = await app.dao.venta.getCorreos();
            for (let i = 0; i < correos.length; i++) {
                const mailer = new Mailer('envio_factura');
                try {
                    const mail = await mailer.sendEmail({
                        //from: app.config.correo.auth.user,
                        from: 'facturacion@facturacion.expresomopar.com.bo',
                        to: correos[i].email,
                        cco: app.config.correo_cco,
                        subject: correos[i].estado == 'ANULADO' ? 'Notificación de factura anulada' : 'Remisión de factura electrónica en línea',
                        nombre: correos[i].nombre_razon_social,
                        pdf: `${app.config.urlsFactura.local}/pdf/${correos[i].cuf}`,
                        xml: `${app.config.urlsFactura.local}/${correos[i].cuf}`,
                        estado: correos[i].estado
                    });
                    await app.dao.venta.setEstadoCorreo(correos[i].id_venta, 'ENVIADO');
                } catch (error) {
                    if (error.responseCode == 450 || error.responseCode == 401 || error.responseCode == 404) {
                        await app.dao.venta.setEstadoCorreo(correos[i].id_venta, 'OBSERVADO');
                    } else {
                        throw error;
                    }
                }
            }
        } catch (error) {
            const trace = stackTrace.parse(error);
            console.log(error, trace);
        }
        if (runEnviarCorreo) {
            setTimeout(enviarCorreo, 30000);
        } else {
            cola.dispatchEvent('stopEnviarCorreo');
        }
    }

    function start() {
        if (runEnviar || runEnviarCorreo) {
            throw Error('El proceso enviar se encuentra en ejecución.');
        }
        runEnviar = true;
        setTimeout(enviarFactura, 0);
        runEnviarCorreo = true;
        setTimeout(enviarCorreo, 2500);
    }

    function stopEnviar() {
        return new Promise(resolve => {
            cola.setEventListener('stopEnviar', function() {
                resolve();
            });
        });
    }

    function stopEnviarCorreo() {
        return new Promise(resolve => {
            cola.setEventListener('stopEnviarCorreo', function() {
                resolve();
            });
        });
    }

    function stop() {
        const promises = [];
        if (runEnviar) {
            promises.push(stopEnviar());
        }
        if (runEnviarCorreo) {
            promises.push(stopEnviarCorreo());
        }
        return Promise.all(promises);
    }

    function cufd(id_punto_venta, usuario, t) {
        if (runCufd == false) {
            errCufd = undefined;
            runCufd = true;
            app.dao.cufd.get(id_punto_venta, usuario, t).then(res => {
                resCufd = res;
                cola.dispatchEvent('stopCufd');
                runCufd = false;
            }).catch(error => {
                errCufd = error;
                cola.dispatchEvent('stopCufd');
                runCufd = false;
            });
        }
        return new Promise((resolve, reject) => {
            cola.setEventListener('stopCufd', function() {
                if (errCufd) {
                    reject(errCufd);
                } else {
                    resolve(resCufd);
                }
            });
        });
    }

    return {
        start,
        stop,
        cufd
    };
};
