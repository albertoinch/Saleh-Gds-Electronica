const validate = require('express-jsonschema').validate;
const autenticacionVal = require('./autenticacion-val');
const asyncHandler = require('../lib/asyncHandler');

/**
 * @api {post} /autenticar Autenticar usuario
 * @apiGroup Autenticar
 * @apiDescription Obtiene el token de acceso a los servicios /api/v1
 *
 * @apiHeader {String} [Content-Type=application/json] Tipo de contenido
 *
 * @apiBody {String} username Nombre de usuario (CI)
 * @apiBody {String} password Contraseña de usuario
 *
 * @apiParamExample Ejemplo de autenticación
 * {
 *   "username": "admin",
 *   "password": "Developer"
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "finalizado": true,
 *   "mensaje": "Autenticación satisfactoria.",
 *   "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c3VhcmlvIjp7ImlkX3VzdWFyaW8iOjEsImlkX3BlcnNvbmEiOjEsIm5vbWJyZXMiOiJBRFNJQiIsImFwZWxsaWRvcyI6IkFEU0lCIEFEU0lCIiwiaWRfZ3J1cG8iOjEsImNhcmdvIjoiQURNSU4ifSwibWVudSI6W119.-vw9Of5rYg-9jDiEfV4WP9fSQi0J0IROLs4i0XNolKU",
 *   "datos": {
 *     "usuario": {
 *       "id_usuario": 1,
 *       "id_persona": 1,
 *       "nombres": "ADSIB",
 *       "apellidos": "ADSIB ADSIB",
 *       "id_grupo": 1,
 *       "cargo": "ADMIN"
 *     },
 *     "menu": []
 *   }
 * }
 */
module.exports = (app) => {
    app.pub.post('/autenticar', validate({body: autenticacionVal.post}), asyncHandler(app.controllers.autenticacion.autenticar));
};
