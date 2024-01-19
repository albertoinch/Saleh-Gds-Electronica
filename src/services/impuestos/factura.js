const soap = require('soap');

module.exports = (app) => {
    const compraVenta = require('./facturaCompraVenta')(app);
    const electronica = require('./facturaElectronica')(app);

    function verificarComunicacion() {
        return compraVenta.verificarComunicacion();
    }

    function recepcionFactura(params) {
        switch (params.codigoDocumentoSector) {
            case '1':
                return compraVenta.recepcionFactura(params);
            case '8':
                return electronica.recepcionFactura(params);
            default:
                throw new Error('Don\'t supported yet.');
        }
    }

    function verificacionEstadoFactura(params) {
        switch (params.codigoDocumentoSector) {
            case '1':
                return compraVenta.verificacionEstadoFactura(params);
            case '8':
                return electronica.verificacionEstadoFactura(params);
            default:
                throw new Error('Don\'t supported yet.');
        }
    }

    function anulacionFactura(params) {
        switch (params.codigoDocumentoSector) {
            case '1':
                return compraVenta.anulacionFactura(params);
            case '8':
                return electronica.anulacionFactura(params);
            default:
                throw new Error('Don\'t supported yet.');
        }
    }

    function recepcionPaqueteFactura(params) {
        switch (params.codigoDocumentoSector) {
            case '1':
                return compraVenta.recepcionPaqueteFactura(params);
            case '8':
                return electronica.recepcionPaqueteFactura(params);
            default:
                throw new Error('Don\'t supported yet.');
        }
    }

    function validacionRecepcionPaqueteFactura(params) {
        switch (params.codigoDocumentoSector) {
            case '1':
                return compraVenta.validacionRecepcionPaqueteFactura(params);
            case '8':
                return electronica.validacionRecepcionPaqueteFactura(params);
            default:
                throw new Error('Don\'t supported yet.');
        }
    }

    return {
        verificarComunicacion,
        recepcionFactura,
        verificacionEstadoFactura,
        anulacionFactura,
        recepcionPaqueteFactura,
        validacionRecepcionPaqueteFactura
    };
};
