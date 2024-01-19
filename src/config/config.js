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
                user: 'facturacion@facturacion.expresomopar.com.bo',
                pass: 'contrasena'
            }*/
        },
        correo_cco: 'expresomopar@gmail.com	',
        api: {
            main: '/sfe/serv/api/v1',
            pub: '/sfe/serv/'
        },
        puerto: 3000,
        firma: {
            file: '/home/saleh/softoken.p12',
            pass: 'Jv3623719',
            privateKey: 'ADSIB'
        },
        impuestos: {
            TokenApi: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzYW5wYW5jaG8iLCJjb2RpZ29TaXN0ZW1hIjoiNzcyREUwMUZCRjZGMzdCNDA0RDM1NEYiLCJuaXQiOiJINHNJQUFBQUFBQUFBRE0wdGpReU56Y3dNZ2NBNW1JVHJ3a0FBQUE9IiwiaWQiOjkwNjQ1LCJleHAiOjE3MjIyOTc2MDAsImlhdCI6MTY5MDgyNTU1OCwibml0RGVsZWdhZG8iOjEzOTI3NzAyNywic3Vic2lzdGVtYSI6IlNGRSJ9.yFXsjxDKBCNBzBUp-gY7QimD7oFGcEcSzPrmj2O1SrZx7xUiSHx3NYwzmsmiOBXfLOSkKEYGF1tkEMQV4IJfWA',
            codigoSistema: '772DE01FBF6F37B404D354F',
            codigoModalidad: 1,
            diasAnulacion: 9,
            tipo: 'ROLLO',
            codigos: 'https://siatrest.impuestos.gob.bo/v2/FacturacionCodigos?wsdl',
            operaciones: 'https://siatrest.impuestos.gob.bo/v2/FacturacionOperaciones?wsdl',
            sincronizacion: 'https://siatrest.impuestos.gob.bo/v2/FacturacionSincronizacion?wsdl',
            facturaCompraVenta: 'https://siatrest.impuestos.gob.bo/v2/ServicioFacturacionCompraVenta?wsdl',
            compras: 'https://siatrest.impuestos.gob.bo/v2/ServicioRecepcionCompras?wsdl'
        },
        urlsFactura: {
            siat: 'https://siat.impuestos.gob.bo/consulta/QR?',
            local: 'http://181.115.244.226/sfe/serv/factura'
        },
        secret: 'H3ESrAxvHuXt033o'
    }
    return config;
}
