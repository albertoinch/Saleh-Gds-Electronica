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
            host: 'smtp.entidad.dominio',
            port: 587,
            secure: false,
            ignoreTLS: false,
            tls: { rejectUnauthorized: false },
            auth: {
                user: 'user@example.domain',
                pass: 'pwd'
            }
        },
        correo_cco: 'factura@dominio',
        api: {
            main: '/sf/serv/api/v1',
            pub: '/sf/serv/'
        },
        puerto: 3000,
        pkcs11: {
            driver: '/usr/lib/x86_64-linux-gnu/pkcs11/opensc-pkcs11.so',
            pass: '12345678',
            privateKey: 'Certificado'
        },
        impuestos: {
            TokenApi: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJleHByZXNvbW9wYXIiLCJjb2RpZ29TaXN0ZW1hIjoiNzcxMDE4OEVDOTIxMDVDNkQ3RTQ4MUUiLCJuaXQiOiJINHNJQUFBQUFBQUFBRE0wdGpReU1qWXdNZ01BVjBxV253a0FBQUE9IiwiaWQiOjIxMTg3LCJleHAiOjE2ODM5MzYwMDAsImlhdCI6MTY3ODczNzk2Niwibml0RGVsZWdhZG8iOjEzOTIyMzAyNiwic3Vic2lzdGVtYSI6IlNGRSJ9.hzgG77ibYDQr0JMCUeefhy2QjT7oP20vj4wxd09Iud-gbdFcUdF9A5DxhyKG5wATk7msv-nl59HyxAoaZybxZA',
            codigoSistema: '7710188EC92105C6D7E481E',
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
