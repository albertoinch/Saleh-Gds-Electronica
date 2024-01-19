const soap = require('soap');

module.exports = (app) => {
    function verificarComunicacion() {
        return new Promise((resolve, reject) => {
            soap.createClient(app.config.impuestos.sincronizacion, function(err, client) {
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

    function sincronizar(metodo, params) {
        return new Promise((resolve, reject) => {
            soap.createClient(app.config.impuestos.sincronizacion, function(err, client) {
                if (err) {
                    reject(err);
                } else {
                    client.addHttpHeader('apikey', `TokenApi ${app.config.impuestos.TokenApi}`);
                    client[metodo]({
                        SolicitudSincronizacion : params
                    }, function(err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            switch (metodo) {
                                case 'sincronizarListaProductosServicios':
                                    resolve(result.RespuestaListaProductos);
                                    break;
                                case 'sincronizarActividades':
                                    resolve(result.RespuestaListaActividades);
                                    break;
                                case 'sincronizarListaActividadesDocumentoSector':
                                    resolve(result.RespuestaListaActividadesDocumentoSector);
                                    break;
                                case 'sincronizarListaLeyendasFactura':
                                    resolve(result.RespuestaListaParametricasLeyendas);
                                    break;
                                default:
                                    resolve(result.RespuestaListaParametricas);
                                    break;
                            }
                        }
                    });
                }
            });
        });
    }

    function sincronizarFechaHora(params) {
        return new Promise((resolve, reject) => {
            soap.createClient(app.config.impuestos.sincronizacion, function(err, client) {
                if (err) {
                    reject(err);
                } else {
                    client.addHttpHeader('apikey', `TokenApi ${app.config.impuestos.TokenApi}`);
                    client.sincronizarFechaHora({
                        SolicitudSincronizacion: params
                    }, function(err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result.RespuestaFechaHora);
                        }
                    });
                }
            });
        });
    }

    return {
        verificarComunicacion,
        sincronizar,
        sincronizarFechaHora
    };
};
