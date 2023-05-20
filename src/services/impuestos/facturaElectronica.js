const soap = require('soap');

module.exports = (app) => {
    function verificarComunicacion() {
        return new Promise((resolve, reject) => {
            soap.createClient(app.config.impuestos.facturaElectronica, function(err, client) {
                if (err) {
                    reject(err);
                } else {
                    client.addHttpHeader('apikey', `TokenApi ${app.config.impuestos.TokenApi}`);
                    client.verificarComunicacion({}, function(err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result.return);
                        }
                    });
                }
            });
        });
    }

    function recepcionFactura(params) {
        return new Promise((resolve, reject) => {
            soap.createClient(app.config.impuestos.facturaElectronica, function(err, client) {
                if (err) {
                    reject(err);
                } else {
                    client.addHttpHeader('apikey', `TokenApi ${app.config.impuestos.TokenApi}`);
                    client.recepcionFactura({
                        SolicitudServicioRecepcionFactura: params
                    }, function(err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result.RespuestaServicioFacturacion);
                        }
                    });
                }
            });
        });
    }

    function verificacionEstadoFactura(params) {
        return new Promise((resolve, reject) => {
            soap.createClient(app.config.impuestos.facturaElectronica, function(err, client) {
                if (err) {
                    reject(err);
                } else {
                    client.addHttpHeader('apikey', `TokenApi ${app.config.impuestos.TokenApi}`);
                    client.verificacionEstadoFactura({
                        SolicitudServicioVerificacionEstadoFactura: params
                    }, function(err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result.RespuestaServicioFacturacion);
                        }
                    });
                }
            });
        });
    }

    function anulacionFactura(params) {
        return new Promise((resolve, reject) => {
            soap.createClient(app.config.impuestos.facturaElectronica, function(err, client) {
                if (err) {
                    reject(err);
                } else {
                    client.addHttpHeader('apikey', `TokenApi ${app.config.impuestos.TokenApi}`);
                    client.anulacionFactura({
                        SolicitudServicioAnulacionFactura: params
                    }, function(err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result.RespuestaServicioFacturacion);
                        }
                    });
                }
            });
        });
    }

    function recepcionPaqueteFactura(params) {
        return new Promise((resolve, reject) => {
            soap.createClient(app.config.impuestos.facturaElectronica, function(err, client) {
                if (err) {
                    reject(err);
                } else {
                    client.addHttpHeader('apikey', `TokenApi ${app.config.impuestos.TokenApi}`);
                    client.recepcionPaqueteFactura({
                        SolicitudServicioRecepcionPaquete: params
                    }, function(err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result.RespuestaServicioFacturacion);
                        }
                    });
                }
            });
        });
    }

    function validacionRecepcionPaqueteFactura(params) {
        return new Promise((resolve, reject) => {
            soap.createClient(app.config.impuestos.facturaElectronica, function(err, client) {
                if (err) {
                    reject(err);
                } else {
                    client.addHttpHeader('apikey', `TokenApi ${app.config.impuestos.TokenApi}`);
                    client.validacionRecepcionPaqueteFactura({
                        SolicitudServicioValidacionRecepcionPaquete: params
                    }, function(err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result.RespuestaServicioFacturacion);
                        }
                    });
                }
            });
        });
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