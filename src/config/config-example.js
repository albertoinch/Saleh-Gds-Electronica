const params = require('./config.json');

module.exports = () => {
    let env = process.env.NODE_ENV;

    const config = {
        database: {
            database: params[env].database,
            username: params[env].username,
            password: params[env].password,
            options: {
                host: params[env].host,
                port: params[env].port,
                dialect: params[env].dialect,
                pool: params[env].pool,
                sync: { force: process.env.FORCE || false },
                logging: (sql) => {
                    if (process.env.NODE_ENV === 'development') {
                        console.log('info', `[${new Date()}] ${sql}`);
                    }
                }
            }
        },
        correo: {
            host: 'localhost',
            port: 25,
            secure: false,
            ignoreTLS: false,
            tls: { rejectUnauthorized: false },
            /*auth: {
                user: 'user@example.domain',
                pass: 'pwd'
            }*/
        },
        correo_cco: 'factura@dominio',
        api: {
            main: '/sfe/serv/api/v1',
            pub: '/sfe/serv/'
        },
        puerto: 3000,
        firma: {
            file: '/home/saleh/softoken.p12',
            pass: 'Contrasena12',
            privateKey: 'ADSIB'
        },
        impuestos: {
            TokenApi: 'Token SIAT',
            codigoSistema: 'Codio SIAT',
            codigoModalidad: 2,
            diasAnulacion: 9,
            codigos: 'https://pilotosiatservicios.impuestos.gob.bo/v2/FacturacionCodigos?wsdl',
            operaciones: 'https://pilotosiatservicios.impuestos.gob.bo/v2/FacturacionOperaciones?wsdl',
            sincronizacion: 'https://pilotosiatservicios.impuestos.gob.bo/v2/FacturacionSincronizacion?wsdl',
            facturaCompraVenta: 'https://pilotosiatservicios.impuestos.gob.bo/v2/ServicioFacturacionCompraVenta?wsdl',
            compras: 'https://pilotosiatservicios.impuestos.gob.bo/v2/ServicioRecepcionCompras?wsdl'
        },
        urlsFactura: {
            siat: 'https://pilotosiat.impuestos.gob.bo/facturacionv2/public/Qr.xhtml?',
            local: 'http://localhost:3000/factura'
        },
        secret: 'H3ESrAxvHuXt033o'
    }
    return config;
}
