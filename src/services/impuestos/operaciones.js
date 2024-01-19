const soap = require('soap');

module.exports = (app) => {
    function verificarComunicacion() {
        return new Promise((resolve, reject) => {
            soap.createClient(app.config.impuestos.operaciones, function(err, client) {
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

    function registroEventoSignificativo(params) {
console.log('*********************************');
console.log(app.config.impuestos.operaciones);
console.log('*********************************');
        return new Promise((resolve, reject) => {
            soap.createClient(app.config.impuestos.operaciones, function(err, client) {
console.log(err);
                if (err) {
                    reject(err);
                } else {
console.log(`TokenApi ${app.config.impuestos.TokenApi}`);
                    client.addHttpHeader('apikey', `TokenApi ${app.config.impuestos.TokenApi}`);
                    client.registroEventoSignificativo({
                        SolicitudEventoSignificativo: params
                    }, function(err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result.RespuestaListaEventos);
                        }
                    });
                }
            });
        });
    }

    function consultaEventoSignificativo(params) {
        return new Promise((resolve, reject) => {
            soap.createClient(app.config.impuestos.operaciones, function(err, client) {
                if (err) {
                    reject(err);
                } else {
                    client.addHttpHeader('apikey', `TokenApi ${app.config.impuestos.TokenApi}`);
                    client.consultaEventoSignificativo({
                        SolicitudConsultaEvento: params
                    }, function(err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result.RespuestaListaEventos);
                        }
                    });
                }
            });
        });
    }

    function registroPuntoVenta(params) {
        return new Promise((resolve, reject) => {
            soap.createClient(app.config.impuestos.operaciones, function(err, client) {
                if (err) {
                    reject(err);
                } else {
                    client.addHttpHeader('apikey', `TokenApi ${app.config.impuestos.TokenApi}`);
                    client.registroPuntoVenta({
                        SolicitudRegistroPuntoVenta: params
                    }, function(err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result.RespuestaRegistroPuntoVenta);
                        }
                    });
                }
            });
        });
    }

    function registroPuntoVentaComisionista(params) {
        return new Promise((resolve, reject) => {
            soap.createClient(app.config.impuestos.operaciones, function(err, client) {
                if (err) {
                    reject(err);
                } else {
                    client.addHttpHeader('apikey', `TokenApi ${app.config.impuestos.TokenApi}`);
                    client.registroPuntoVentaComisionista({
                        SolicitudRegistroPuntoVenta: params
                    }, function(err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result.RespuestaRegistroPuntoVenta);
                        }
                    });
                }
            });
        });
    }

    return {
        verificarComunicacion,
        registroEventoSignificativo,
        consultaEventoSignificativo,
        registroPuntoVenta,
        registroPuntoVentaComisionista
    };
};
