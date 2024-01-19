/**
 * File Name: Mailer.js
 * Task: Envía un correo
 * Realiza el envío del correo.
 * Ejemplo:
 *     const Mailer = require('../../lib/Mailer.js');
 *     const mailer = new Mailer(`${__dirname}/../../templates/correo/plantilla.html`);
 *     mailer.send({
 *       from: 'INST <remitent@mail.com>',
 *       to: 'receiver@mail.com',
 *       subject: 'Notificación',
 *       person: 'Juan Perez',
 *     });
 */

/*
 * Carga los módulos requeridos
 */
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');
const config = require('../config/config');
// Esta variable contiene la plantilla html para el correo
let template;
// Esta variable contiene la conexión al servidor de correo
let transporter;

/**
 * @constructor
 * @param {string} pugFile Nombre del archivo y dirección de la plantilla pug
 */
function mailer(pugFile, html) {
    if (html) {
        template = require('pug').compile(html);
    } else {
        const file = `${_path}/src/templates/correo/${pugFile}.pug`;
        template = require('pug').compileFile(file);
    }
    transporter = nodemailer.createTransport(smtpTransport(config().correo));
};

/**
 * Esta función envía un correo.
 * @param {Object} email Objeto con los datos de correo
 *     {
 *       from: 'INST <remitent@mail.com>',
 *       to: 'receiver@mail.com',
 *       subject: 'Notificación',
 *       attachments: [
 *         {
 *           filename: 'prueba.pdf',
 *           path: '/tmp/prueba.pdf'
 *         }
 *       ]
 *     }
 */
mailer.prototype.sendEmail = function(email) {
    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: email.from,
            to: email.to,
            cc: email.cc,
            bcc: email.cco,
            subject: email.subject,
            html: template(email),
            text: email.subject
        };
        if (email.attachments) {
            mailOptions.attachments = email.attachments;
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                if (error.code === 'UNABLE_TO_VERIFY_LEAF_SIGNATURE') {
                    resolve(error);
                } else {
                    reject(error);
                }
            } else {
                resolve(info);
            }
        });
    });
};

module.exports = mailer;
