const moment = require('moment');
const qr = require('qr-image');
const reporte = require('../lib/reporte');

module.exports = (app) => {
    async function post(req, res) {
        if (req.body.numeroDocumento == '0' && req.body.codigoTipoDocumentoIdentidad == 5) {
            throw new Error('Atributo numeroDocumento inválido.');
        }
        if (req.body.codigoMetodoPago == 2) {
            if (!req.body.numeroTarjeta || !/\d{4}00000000\d{4}$/.test(req.body.numeroTarjeta)) {
                throw new Error('Debe enviar el número de tarjeta ofuscada.');
            }
        }
        if (req.body.codigoTipoDocumentoIdentidad != 1) {
            if (req.body.complemento && req.body.complemento != '') {
                throw new Error('Solo la cédula de identidad usa complemento.');
            }
        }
        if (!req.body.codigoPuntoVenta) {
            req.body.codigoPuntoVenta = 0;
        }
console.log(req.body);
        const t = await app.db.sequelize.transaction();
        try {
            const factura = await app.dao.factura.crear(req.body, t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Factura creada.',
                datos: {
                    id: factura.id_venta,
                    numeroFactura: factura.numero_factura,
                    tipo_emision: factura.tipo_emision,
                    fecha: moment(factura._fecha_creacion).format('YYYY/MM/DD'),
                    numeroDocumento: factura.numero_documento,
                    nombreRazonSocial: factura.nombre_razon_social,
                    cuf: factura.cuf,
                    estado: factura.estado,
                    url: `${app.config.urlsFactura.local}/:cuf`,
                    urlPdf: `${app.config.urlsFactura.local}/pdf/:cuf`
                }
            });
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    async function put(req, res) {
        req.body.complemento = req.body.complemento ? req.body.complemento.trim() : null;
        const t = await app.db.sequelize.transaction();
        try {
            const factura = await app.dao.venta.getId(req.params.id, '0', t);
            if (!factura || factura.estado != 'RECHAZADO') {
                throw new Error('No se encontró la factura en estado rechazado.');
            }
            if (req.body.audit_usuario.id_grupo != 1 && factura._usuario_creacion != req.body.audit_usuario.usuario) {
                throw new Error(`La factura fue emitida por ${factura._usuario_creacion}.`);
            }
            const archivo = Object.keys(factura.datos)[0];
            if (!moment(factura.datos[archivo].cabecera.fechaEmision).isSame(new Date(), 'day')) {
                throw new Error(`La factura no es del día.`);
            }
            factura.datos[archivo].cabecera.codigoTipoDocumentoIdentidad = req.body.codigoTipoDocumentoIdentidad ? req.body.codigoTipoDocumentoIdentidad : factura.datos[archivo].cabecera.codigoTipoDocumentoIdentidad;
            factura.datos[archivo].cabecera.numeroDocumento = req.body.numeroDocumento ? req.body.numeroDocumento.trim() : factura.datos[archivo].cabecera.numeroDocumento;
            factura.datos[archivo].cabecera.complemento = req.body.numeroDocumento ? req.body.complemento : factura.datos[archivo].cabecera.complemento;
            factura.datos[archivo].cabecera.codigoExcepcion = req.body.codigoExcepcion ? req.body.codigoExcepcion : '';
            factura.datos[archivo].cabecera.nombreRazonSocial = req.body.nombreRazonSocial ? req.body.nombreRazonSocial.trim() : factura.datos[archivo].cabecera.nombreRazonSocial;
            factura.datos[archivo].cabecera.fechaEmision = moment(app.fecha()).format('YYYY-MM-DDTHH:mm:ss.SSS');
            await app.dao.factura.actualizar(req.params.id, 1, factura.datos, factura.cufdt, t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Factura actualizada.',
                datos: {
                    id: factura.id_venta,
                    numeroFactura: factura.numero_factura,
                    fecha: moment(factura._fecha_creacion).format('YYYY/MM/DD'),
                    numeroDocumento: factura.numero_documento,
                    nombreRazonSocial: factura.nombre_razon_social,
                    cuf: factura.cuf,
                    estado: factura.estado,
                    url: `${app.config.urlsFactura.local}/:cuf`,
                    urlPdf: `${app.config.urlsFactura.local}/pdf/:cuf`
                }
            });
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    async function get(req, res) {
        try {
            let factura;
            if (req.params.cuf) {
                factura = await app.dao.venta.getCuf(req.params.cuf);
            } else {
                factura = await app.dao.venta.getNro(req.params.nro, req.params.fecha);
            }
            const archivo = Object.keys(factura.datos)[0];
            res.json({
                finalizado: true,
                mensaje: 'Factura obtenida.',
                datos: {
                    id: factura.id_venta,
                    codigoTipoDocumentoIdentidad: factura.datos[archivo].cabecera.codigoTipoDocumentoIdentidad,
                    numeroFactura: factura.datos[archivo].cabecera.numeroFactura,
                    complemento: factura.datos[archivo].cabecera.complemento,
                    fecha: moment(factura.datos[archivo].cabecera.fechaEmision, 'YYYY-MM-DD HH:mm:ss').format('YYYY/MM/DD kk:mm:ss'),
                    numeroDocumento: factura.datos[archivo].cabecera.numeroDocumento,
                    nombreRazonSocial: factura.datos[archivo].cabecera.nombreRazonSocial,
                    tipo_emision: factura.tipo_emision,
                    cuf: factura.cuf,
                    leyenda: factura.datos[archivo].cabecera.leyenda,
                    estado: factura.estado,
                    url: `${app.config.urlsFactura.local}/${factura.cuf}`,
                    urlPdf: `${app.config.urlsFactura.local}/pdf/${factura.cuf}`,
                    qr: `${app.config.urlsFactura.siat}nit=${factura.datos[archivo].cabecera.nitEmisor}&cuf=${factura.cuf}&numero=${factura.datos[archivo].cabecera.numeroFactura}&t=2`
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async function data(req, res) {
        try {
            let params = await app.dao.venta.getByNro(req.params.nro, req.params.cafc);
            if (params == null) {
                res.json({
                    finalizado: false,
                    mensaje: 'No se encontró la factura.'
                });
            }
            const archivo = Object.keys(params.datos)[0];
            params.qr = qr.imageSync(`${app.config.urlsFactura.siat}nit=${params.datos[archivo].cabecera.nitEmisor}&cuf=${params.cuf}&numero=${params.datos[archivo].cabecera.numeroFactura}&t=2`, { type: 'png', ec_level: 'H' }).toString('base64');
            params.fecha = moment(params.datos[archivo].cabecera.fechaEmision).format('DD/MM/YYYY HH:mm:ss');
            params.literal = app.dao.numerosLiteral.NumeroALetras(params.datos[archivo].cabecera.montoTotalSujetoIva);
            res.json({
                finalizado: true,
                mensaje: 'Factura obtenida.',
                datos: params
            });
        } catch (error) {
            throw error;
        }
    }

    async function build(req, res) {
        try {
            let params, tipo;
            if (req.params.id) {
                params = await app.dao.venta.getId(req.params.id, 0);
                tipo = params.codigoEmision;
            } else {
                params = await app.dao.venta.getCuf(req.params.cuf);
                tipo = params.tipo_emision;
            }
            if (tipo == '1' && params.estado != 'VALIDADO' && params.estado != 'ANULADO' && params.estado != 'RECHAZADO') {
                throw new Error(`La factura tiene un estado [${params.estado}].`);
            }
            /*if (tipo == '2' && params.estado == 'RECHAZADO') {
                throw new Error(`La factura tiene un estado [${params.estado}].`);
            }*/
            const archivo = Object.keys(params.datos)[0];
            params.qr = qr.imageSync(`${app.config.urlsFactura.siat}nit=${params.datos[archivo].cabecera.nitEmisor}&cuf=${params.cuf}&numero=${params.datos[archivo].cabecera.numeroFactura}&t=2`, { type: 'png', ec_level: 'H' }).toString('base64');
            params.fecha = moment(params.datos[archivo].cabecera.fechaEmision).format('DD/MM/YYYY HH:mm:ss');
            params.literal = app.dao.numerosLiteral.NumeroALetras(params.datos[archivo].cabecera.montoTotalSujetoIva);
            let factura;
            switch (archivo) {
                case 'facturaComputarizadaCompraVenta':
                case 'facturaElectronicaCompraVenta':
                    params.title = 'Factura de Compra Venta';
                    factura = new reporte(app.config.impuestos.tipo == 'CARTA' ? 'factura' : 'facturaRollo');
                    break;
                case 'facturaElectronicaTasaCero':
                    params.title = 'Factura Tasa Cero';
                    factura = new reporte('facturaTasaCero');
                    break;
                default:
                    throw new Error('Don\'t supported yet.');
            }
            res.contentType('application/pdf');
            if (app.config.impuestos.tipo == 'CARTA') {
                factura.pdf(params, {
                    orientation: 'Portrait'
                }).pipe(res);
            } else {
                factura.pdf(params, {
                    orientation: 'Portrait',
                    pageWidth: '87mm',
                    pageHeight: '379mm',
                    marginLeft: '0.5cm',
                    marginRight: '0.5cm',
                    marginTop: '0.5cm',
                    marginBottom: '1cm'
                }).pipe(res);
            }
        } catch (error) {
            throw error;
        }
    }

    async function xml(req, res) {
        try {
            const params = await app.dao.venta.getCuf(req.params.cuf);
            if (params.tipo_emision == '1' && params.estado != 'VALIDADO' && params.estado != 'RECHAZADO') {
                throw new Error(`La factura tiene un estado [${params.estado}].`);
            }
            res.contentType('text/plain');
            res.send(params.factura);
        } catch (error) {
            throw error;
        }
    }

    async function annul(req, res) {
        const t = await app.db.sequelize.transaction();
        try {
            const factura = await app.dao.factura.anular(req.params.id, req.body, t);
            await t.commit();
            res.json({
                finalizado: true,
                mensaje: 'Factura anulada.',
                datos: {
                    id: factura.id_venta,
                    numeroFactura: factura.numero_factura,
                    numeroDocumento: factura.numero_documento,
                    nombreRazonSocial: factura.nombre_razon_social,
                    estado: factura.estado
                }
            });
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    async function validate(req, res) {
        try {
            const params = await app.dao.punto_venta.getIdC(req.body.audit_usuario.id_contribuyente);
            params.nitParaVerificacion = req.params.nit.trim();
            delete params['codigoPuntoVenta'];
            console.log(params);
            const nit = await require('../services/impuestos/codigos')(app).verificarNit(params);
            res.json({
                finalizado: nit.transaccion,
                mensaje: nit.transaccion ? 'Consulta realizada satisfactoriamente.' : nit.mensajesList[0].descripcion,
                datos: nit.transaccion ? nit : nit.mensajesList
            });
        } catch (error) {
            throw error;
        }
    }

    return {
        post,
        put,
        get,
        data,
        build,
        xml,
        annul,
        validate
    };
};
