const moment = require('moment');
const convert = require('xml-js');
const DsigSoft = require('pkcs12-xml');
const xsd = require('../lib/xsd');
const ping = require('../lib/ping');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = (app) => {
    const impuestos = require('../services/impuestos/factura')(app);
    const cola = require('../lib/cola')(app);
    const models = app.db.models;
    const tarjeta = [2,10,16,17,18,19,20,39,40,41,42,43,82,83,84,85,86,87,88,89,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,223,297];
    const giftcard = [27,30,35,64,68,76,86,94,102,109,115,120,124,138,146,153,159,164,168,182,189,195,200,204,217,223,228,232,241,246,250,261,265,269,270,271,275,279,280,281,291,292,293];

    function copiar(origen, destino) {
        for (let key in destino) {
            if (origen[key]) {
                destino[key] = origen[key];
            }
        }
    }

    function setNill(objeto) {
        const o = {};
        for (let key in objeto) {
            if (typeof objeto[key] === 'object') {
                if (Array.isArray(objeto[key])) {
                    o[key] = [];
                    for (let i = 0; i < objeto[key].length; i++) {
                        o[key].push(setNill(objeto[key][i]));
                    }
                } else {
                    o[key] = setNill(objeto[key]);
                }
            } else {
                if (objeto[key] === '') {
                    o[key] = {
                        _attributes: {
                            'xsi:nil': true
                        }
                    };
                } else {
                    o[key] = objeto[key];
                }
            }
        }
        return o;
    }

    function firmar(objeto) {
        let xml = convert.js2xml(objeto, { compact: true, ignoreComment: true, spaces: 2, fullTagEmptyElement: true });
        let res;
        try {
            if (!app.dsig) {
                app.dsig = new DsigSoft(app.config.firma.file);
                app.dsig.openSession(app.config.firma.pass);
                app.dsig.privateKey = app.config.firma.privateKey;
            }
            res = app.dsig.computeSignature(xml);
        } catch(e) {
            app.dsig.closeSession();
            throw e;
        }
        //dsig.closeSession();
        return res;
    }

    async function crear(factura, t) {
        factura.complemento = factura.complemento ? factura.complemento.trim() : null;
        factura.numeroDocumento = factura.numeroDocumento.trim();
        factura.nombreRazonSocial = factura.nombreRazonSocial.trim();
        if (tarjeta.find(e => e == factura.codigoMetodoPago)) {
            if (!new RegExp('^[0-9]{4}0{8}[0-9]{4}$').test(factura.numeroTarjeta)) {
                throw new Error('El método de pago seleccionado requiere los primeros 4 dígitos y los últimos 4 dígitos de la tarjeta.');
            }
        }
        if (giftcard.find(e => e == factura.codigoMetodoPago)) {
            if (!factura.montoGiftCard || factura.montoGiftCard == '' || factura.montoGiftCard <= 0) {
                throw new Error('El método de pago seleccionado requiere un valor para el monto gift card.');
            }
        }
        const id = await app.dao.venta.post(factura, t);
        const venta = await app.dao.venta.getDatos(id, t);
        if (factura.numeroDocumento == '99002') {
            venta.codigoTipoDocumentoIdentidad = 5;
        }
        if (parseInt(venta.codigoTipoDocumentoIdentidad) == 2) {
            venta.numeroDocumento = 'E-' + venta.numeroDocumento;
        }
        if (!venta.cuis) {
            throw new Error('No se encontró un CUIS activo.');
        }
        /*if (!venta.eventoSignificativo) {
            let cambiar = false;
            try {
                cambiar = (await impuestos.verificarComunicacion()).transaccion == false;
            } catch (error) {
                console.log(error);
                cambiar = true;
            }
            if (cambiar) {
                let codigo = 2;
                let descripcion = 'SIAT Inaccesible.';
                if (!await ping.alive()) {
                    codigo = 1;
                    descripcion = 'Sin conexión a internet.'
                }
                const evento = await app.dao.evento_significativo.crear({
                    codigoPuntoVenta: factura.codigoPuntoVenta,
                    codigoSucursal: factura.codigoSucursal,
                    codigoEvento: codigo,
                    descripcion: descripcion,
                    audit_usuario: {
                        usuario: factura.audit_usuario.usuario
                    }
                }, t);
                venta.eventoSignificativo = evento.codigo;
                venta.estadoEventoSignificativo = evento.estado;
                venta.idEventoSignificativo = evento.id_evento_significativo;
                venta.fechaEventoSignificativo = evento.fecha_inicio;
            }
        }*/
console.log('----- a');
        venta.fechaEmision = moment(app.fecha()).format('YYYY-MM-DDTHH:mm:ss.SSS');
        if (venta.eventoSignificativo && venta.estadoEventoSignificativo == 'CERRANDO') {
            throw new Error('Se está cerrando un evento significativo.');
        }
        if (venta.eventoSignificativo && parseInt(venta.eventoSignificativo) < 5 || venta.tipoEmision == 2) {
            venta.tipoEmision = 2;
            if (parseInt(venta.codigoTipoDocumentoIdentidad) == 5) {
                venta.codigoExcepcion = 1;
            }
            if (parseInt(venta.eventoSignificativo) < 5) {
                if (factura.numeroFactura || factura.fechaEmision) {
                    throw new Error('La factura no debe tener número ni fecha.');
                }
            } else {
                if (!factura.numeroFactura || !factura.fechaEmision) {
                    throw new Error('La factura de contingencia manual debe tener número y fecha.');
                }
                if (factura.cafc != venta.cafc) {
                    throw new Error('El cafc introducido no corresponde con el cafc del evento significativo registrado.');
                }
                if (moment(factura.fechaEmision).toDate().getTime() < venta.punto_venta.evento_significativo.fecha_inicio.getTime()) {
                    throw new Error(`La fecha no puede ser anterior a ${venta.punto_venta.evento_significativo.fecha_inicio}`);
                }
                if (venta.punto_venta.evento_significativo.fecha_fin && moment(factura.fechaEmision).toDate().getTime() > venta.punto_venta.evento_significativo.fecha_fin.getTime()) {
                    throw new Error(`La fecha no puede ser posterior a ${venta.punto_venta.evento_significativo.fecha_fin}`);
                }
                venta.fechaEmision = moment(factura.fechaEmision).format('YYYY-MM-DDTHH:mm:ss.SSS');
                venta.cufd = venta.cufdEventoSignificativo;
                venta.codigoControl = venta.codigoControlEventoSignificativo;
            }
        } else {
            if (venta.tipoEmision == 2) {
                throw new Error('Para emitir facturas offline debe registrar un evento significativo.');
            }
            venta.eventoSignificativo = null;
            venta.estadoEventoSignificativo = null;
            venta.cafc = null;
            if (factura.numeroFactura || factura.fechaEmision) {
                throw new Error('La factura no debe tener número ni fecha.');
            }
console.log('----- b');
            if (!venta.fechaCufd || app.fecha().getTime() > moment(venta.fechaCufd).toDate().getTime()) {
                const cufd = await cola.cufd(venta.fid_punto_venta, factura.audit_usuario.usuario, t);
                venta.cufd = cufd.codigo;
                venta.codigoControl = cufd.codigoControl;
            }
        }
console.log('----- c');
        venta.cuf = app.dao.cuf(venta.nitEmisor, venta.fechaEmision, venta.codigoSucursal, venta.codigoModalidad, venta.tipoEmision, venta.esquema.tipo_factura, venta.codigoDocumentoSector, venta.numeroFactura, venta.codigoPuntoVenta, venta.codigoControl);
        if (!venta.codigoMoneda) {
            venta.codigoMoneda = '1';
        }
        if (venta.montoGiftCard && venta.montoGiftCard != '') {
            venta.montoGiftCard = parseFloat(venta.montoGiftCard).toFixed(2);
        } else {
            venta.montoGiftCard = '0.00';
        }
        if (venta.descuentoAdicional && venta.descuentoAdicional != '') {
            venta.descuentoAdicional = parseFloat(venta.descuentoAdicional).toFixed(2);
        } else {
            venta.descuentoAdicional = '0.00';
        }
        switch (venta.esquema.archivo) {
            case 'facturaElectronicaCompraVenta':
            case 'facturaComputarizadaCompraVenta':
                venta.montoTotalSujetoIva = (venta.montoTotal - venta.montoGiftCard).toFixed(2);
                if (venta.montoTotalSujetoIva < 0) {
                    venta.montoTotalSujetoIva = 0;
                }
                break;
            case 'facturaElectronicaTasaCero':
            case 'facturaComputarizadaTasaCero':
                venta.montoTotalSujetoIva = '0.0';
                break;
        }
        if (venta.montoTotal - venta.descuentoAdicional <= 0) {
            throw new Error('El descuento no puede ser igual o mayor al monto facturado.');
        }
        venta.leyenda = (await app.dao.catalogo.getLeyenda(venta.detalle[0].actividadEconomica, t)).descripcion;

        const facturaXML = JSON.parse(JSON.stringify(venta.esquema.objeto));
        copiar(venta, facturaXML[venta.esquema.archivo].cabecera);
        for (let i = 0; i < venta.detalle.length; i++) {
            facturaXML[venta.esquema.archivo].detalle[i] = {};
            Object.assign(facturaXML[venta.esquema.archivo].detalle[i], venta.esquema.objeto[venta.esquema.archivo].detalle[0]);
            copiar(venta.detalle[i], facturaXML[venta.esquema.archivo].detalle[i]);
        }
        let facturaFirmada;
        if (venta.codigoModalidad == 1) {
            facturaFirmada = firmar(setNill(facturaXML));
        } else {
            facturaFirmada = convert.js2xml(setNill(facturaXML), { compact: true, ignoreComment: true, spaces: 2, fullTagEmptyElement: true });
        }
        if (process.env.NODE_ENV != 'test') {
            if (venta.tipoEmision == 2) {
                let validation;
                try {
                    validation = await xsd.validateXML(facturaFirmada, `${_path}/xml/${venta.esquema.archivo}.xsd`);
                } catch (e) {
                    throw new Error('Validación XSD incorrecta.');
                }
                if (!validation.valid) {
                    throw new Error('La estructura XML no cumple las especificaciones XSD de Impuestos Nacionales.');
                }
            }
        }
        return await app.dao.venta.put(id, venta.tipoEmision, venta.esquema.archivo, facturaXML, facturaFirmada, t);
    }

    async function actualizar(id, tipoEmision, facturaXML, cufd, t) {
        const params = await app.dao.venta.getId(id, 1, t);
        delete params['direccion'];
        delete params['tipo_emision'];
        delete params['datos'];
        delete params['estado'];
        delete params['fid_punto_venta'];
        delete params['_usuario_creacion'];
        delete params['cufdt'];
        delete params['codigoMotivo'];
        delete params['contribuyente'];
        delete params['detalle'];
        const estado = await impuestos.verificacionEstadoFactura(params);
        if (estado.codigoEstado != 902) {
            await app.dao.venta.setCodigoRecepcion(id, estado.codigoRecepcion, t);
            return facturaXML;
        }
//        throw new Error('La factura fue rechazada por el SIN.');
        const archivo = Object.keys(facturaXML)[0];
        facturaXML[archivo].cabecera.cuf = app.dao.cuf(facturaXML[archivo].cabecera.nitEmisor, facturaXML[archivo].cabecera.fechaEmision, facturaXML[archivo].cabecera.codigoSucursal, app.config.impuestos.codigoModalidad, tipoEmision, await app.dao.esquema.getTipo(archivo, t), facturaXML[archivo].cabecera.codigoDocumentoSector, facturaXML[archivo].cabecera.numeroFactura, facturaXML[archivo].cabecera.codigoPuntoVenta, cufd.codigoControl);
        facturaXML[archivo].cabecera.cufd = cufd.codigo;
        let facturaFirmada;
        if (app.config.impuestos.codigoModalidad == 1) {
            facturaFirmada = firmar(setNill(facturaXML));
        } else {
            facturaFirmada = convert.js2xml(setNill(facturaXML), { compact: true, ignoreComment: true, spaces: 2, fullTagEmptyElement: true });
        }
        const validation = await xsd.validateXML(facturaFirmada, `${_path}/xml/${archivo}.xsd`);
        if (!validation.valid) {
            console.log(validation);
            throw new Error('La estructura XML no cumple las especificaciones XSD de Impuestos Nacionales.');
        }
        await app.dao.venta.put(id, tipoEmision, archivo, facturaXML, facturaFirmada, t);
        return facturaFirmada;
    }

    async function anular(id, body, t) {
        const params = await app.dao.venta.getId(id, body.codigo, t);
        if (params.estado == 'ANULADO') {
            throw new Error('La factura ya se encuentra anulada.');
        }
        if (params.estado != 'VALIDADO' && params.estado != 'RECHAZADO') {
            throw new Error(`La factura tiene un estado [${params.estado}].`);
        }
        if (body.audit_usuario.id_grupo != 1 && params._usuario_creacion != body.audit_usuario.usuario) {
            throw new Error(`La factura fue emitida por ${params._usuario_creacion}.`);
        }
        const keys = Object.keys(params.datos);
        if (moment().isAfter(moment(params.datos[keys[0]].cabecera.fechaEmision).add(1, 'M').set('days', app.config.impuestos.diasAnulacion))) {
            console.log(moment(params.datos[keys[0]].cabecera.fechaEmision), '-------------');
            //throw new Error(`La factura fue emitida el mes pasado.`);
        }
        const cufd = await cola.cufd(params.fid_punto_venta, body.audit_usuario.usuario, t);

        delete params['contribuyente'];
        delete params['direccion'];
        delete params['tipo_emision'];
        delete params['datos'];
        delete params['estado'];
        delete params['fid_punto_venta'];
        delete params['_usuario_creacion'];
        delete params['cufdt'];
        delete params['detalle'];

        params.cufd = cufd.codigo;
        params.codigoEmision = 1;
        let recepcion = await impuestos.anulacionFactura(params);
console.log(recepcion);
        if (recepcion.transaccion) {
            return await app.dao.venta.setCodigoAnulacion(id, body.codigo, body.motivo, body.audit_usuario.usuario, t);
        } else {
            delete params['codigoMotivo'];
            recepcion = await impuestos.verificacionEstadoFactura(params);
            if (recepcion.codigoEstado == '691') {
                return await app.dao.venta.setCodigoAnulacion(id, body.codigo, body.motivo, body.audit_usuario.usuario, t);
            }
            throw new Error(recepcion.codigoDescripcion);
        }
    }

    return {
        crear,
        actualizar,
        anular
    };
};
