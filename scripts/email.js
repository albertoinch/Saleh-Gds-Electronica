const Mailer = require('../src/lib/mailer');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

const config = require('../src/config/config.js')();

global._path = `${__dirname}/../`;

const mailer = new Mailer('envio_factura');
mailer.sendEmail({
    //from: config.correo.auth.user,
    from: 'facturacion@facturacion.expresomopar.com.bo',
    to: process.argv[process.argv.length - 1],
    cco: config.correo_cco,
    subject: 'Prueba de envío de correo',
    nombre: process.argv[process.argv.length - 1],
    pdf: `${config.urlsFactura.adsib}/pdf/`,
    xml: `${config.urlsFactura.adsib}/`,
    estado: 'VALIDADO'
});
