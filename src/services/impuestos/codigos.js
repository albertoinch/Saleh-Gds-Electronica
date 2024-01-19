const soap = require('soap');

module.exports = (app) => {
    function verificarComunicacion() {
        return new Promise((resolve, reject) => {
            soap.createClient(app.config.impuestos.codigos, function(err, client) {
                if (err) {
                    reject(err);
                } else {
                    client.addHttpHeader('apikey', `TokenApi ${app.config.impuestos.TokenApi}`);
                    client.verificarComunicacion({}, function(err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result.RespuestaComunicacion);
                        }
                    });
                }
            });
        });
    }

    function cuis(params) {
        return new Promise((resolve, reject) => {
            soap.createClient(app.config.impuestos.codigos, function(err, client) {
                if (err) {
                    reject(err);
                } else {
                    client.addHttpHeader('apikey', `TokenApi ${app.config.impuestos.TokenApi}`);
                    client.cuis({
                        SolicitudCuis: params
                    }, function(err, result) {
                        console.log(err);
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result.RespuestaCuis);
                        }
                    });
                }
            });
        });
    }

    function cufd(params) {
        return new Promise((resolve, reject) => {
            soap.createClient(app.config.impuestos.codigos, function(err, client) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    client.addHttpHeader('apikey', `TokenApi ${app.config.impuestos.TokenApi}`);
                    client.cufd({
                        SolicitudCufd: params
                    }, function(err, result) {
                        console.log(err);
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result.RespuestaCufd);
                        }
                    });
                }
            });
        });
    }

    function verificarNit(params) {
        return new Promise((resolve, reject) => {
            soap.createClient(app.config.impuestos.codigos, function(err, client) {
                if (err) {
                    reject(err);
                } else {
                    client.addHttpHeader('apikey', `TokenApi ${app.config.impuestos.TokenApi}`);
                    client.verificarNit({
                        SolicitudVerificarNit: params
                    }, function(err, result) {
                        console.log(err);
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result.RespuestaVerificarNit);
                        }
                    });
                }
            });
        });
    }

    return {
        verificarComunicacion,
        cuis,
        cufd,
        verificarNit
    };
}
