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
            main: '/api/v1',
            pub: '/'
        },
        puerto: 8000,
        firma: {
            file: '/home/fernando/softoken.p12',
            pass: 'Contrasena12',
            privateKey: 'ADSIB'
        },
        impuestos: {
            TokenApi: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJEQ2FycmV0ZXJvMSIsImNvZGlnb1Npc3RlbWEiOiI3NkY4QURENTlGNzdBRjRCN0MzOTU0RiIsIm5pdCI6Ikg0c0lBQUFBQUFBQUFETTJOclcwTkRBeU1MUUVBQ0drWWVJS0FBQUEiLCJpZCI6Mjg4OTUzLCJleHAiOjE3MDM5ODA4MDAsImlhdCI6MTY3NDU5MzQ5Miwibml0RGVsZWdhZG8iOjMzNTk5MDIwMTksInN1YnNpc3RlbWEiOiJTRkUifQ.WQhS5oN__-ix5d2lvdHRO7xcGuNuyPjRlJUdV0PvTngijNpjHdBuboREH5io8Xqa2fOXbyAZYoAk6U4-c1Iwpg',
            codigoSistema: '76F8ADD59F77AF4B7C3954F',
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
