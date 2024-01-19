/**
 * @api {get} /api/v1/estado Estado del servicio
 * @apiGroup Estado
 * @apiDescription Obtiene el estado del servicio
 *
 * @apiHeader {String} [Content-Type=application/json] Tipo de contenido
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "finalizado": true,
 *   "mensaje": "Conexión exitosa.",
 * }
 */
module.exports = (app) => {
    app.api.get('/estado', (req, res) => {
        res.json({
            finalizado: true,
            mensaje: 'Conexión exitosa.'
        });
    });
};
