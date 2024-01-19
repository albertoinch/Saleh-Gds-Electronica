const validate = require('express-jsonschema').validate;
const eventoVal = require('./evento-val');
const asyncHandler = require('../lib/asyncHandler');

/**
 * @api {post} /api/v1/evento Iniciar nuevo evento significativo
 * @apiGroup Evento
 * @apiDescription Registra un nuevo evento
 * 
 * @apiHeader {String} Authorization Token de autorización
 *
 * @apiParam {Number} codigo Código del evento significativo
 * @apiParam {String} descripcion Descripción del evento
 * @apiParam {String} [cafc] Código de Autorización de Facturas por Contingencia
 *
 * @apiParamExample Ejemplo de nuevo evento
 * {
 *   "codigo": 1,
 *   "descripcion": "Fallo en la fibra óptica"
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "finalizado": true,
 *   "mensaje": "Evento iniciado.",
 *   "datos": {
 *     "id_evento_significativo": 1,
 *     "codigo": "1",
 *     "descripcion": "Fallo la fibra óptica",
 *     "fecha_inicio": "2021-11-22T12:47:18.779Z",
 *     "fid_cufd_evento": 1,
 *     "fid_punto_venta": 1
 *   }
 * }
 */
 module.exports = (app) => {
    app.api.post('/evento', asyncHandler(app.controllers.evento.post));

/**
 * @api {delete} /api/v1/evento/:id Cerrar el último evento significativo
 * @apiGroup Evento
 * @apiDescription Cerrar el último evento
 * 
 * @apiHeader {String} Authorization Token de autorización
 * @apiParam {String} id Identificador del punto de venta
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "finalizado": true,
 *   "mensaje": "Evento cerrado.",
 *   "datos": {
 *     "cufd": "BQUFDZkVNQUE=NkEU5RTNCMTFGNzY=Qm8maVZPS0xWVUFQyMzY2Mjc2QzAyO"
 *   }
 * }
 */
    app.api.delete('/evento/:id', asyncHandler(app.controllers.evento.close));
    app.api.delete('/evento/:suc/:punto', asyncHandler(app.controllers.evento.close));

    	/**
	 * @api {get} /api/v1/evento/:page Lista de eventos registrados
	 * @api {get} /api/v1/evento/:page?limit=&buscarEstado=&buscarTipo=    Lista de eventos registrados
	 * @apiGroup Evento
	 * @apiDescription Lista de eventos registrados
	 *
	 * @apiParamExample Ejemplo
	 * {}
	 *
	 * @apiSuccessExample Success-Response:
	 * HTTP/1.1 200 OK
	 * {
	 * 	"finalizado":true,
	 * 	"mensaje":"Datos obtenidos.",
	 * 	"datos":[{
	 * 		"id_evento":26,
	 * 		"tipo":"CONTINGENCIA",
	 * 		"codigo_recepcion":24563,
	 * 		"fecha_inicio":"2019-10-07T15:37:38.953Z",
	 * 		"fecha_fin":"2019-10-07T16:20:00.000Z",
	 * 		"estado":"FINALIZADO",
	 * 		"codigo_evento":973,
	 * 		"descripcion":"CORTE DEL SERVICIO DE INTERNET",
	 * 		"fid_sucursal":1
	 * 	},
	 * 	{
	 * 		"id_evento":21,
	 * 		"tipo":"CONTINGENCIA",
	 * 		"codigo_recepcion":19888,
	 * 		"fecha_inicio":"2019-09-30T20:56:08.526Z",
	 * 		"fecha_fin":"2019-09-30T21:43:00.000Z",
	 * 		"estado":"FINALIZADO",
	 * 		"codigo_evento":970,
	 * 		"descripcion":"PROBLEMAS DE COMUNICACIÓN EXTERNA CON SERVIDOR",
	 * 		"fid_sucursal":1
	 * 	}],
	 * 	"paginacion":
	 * 	{
	 * 		"totalRegistros":2,
	 * 		"paginas":1,
	 * 		"paginaActual":"1",
	 * 		"cantidad":2
	 * 	}
	 * }
	*/
    app.api.get('/evento/:page', asyncHandler(app.controllers.evento.index));
    app.api.get('/evento/:punto/:suc', asyncHandler(app.controllers.evento.estado));
};
