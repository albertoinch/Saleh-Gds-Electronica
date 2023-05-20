const validate = require('express-jsonschema').validate;
const eventoVal = require('./evento-val');
const asyncHandler = require('../lib/asyncHandler');

module.exports = (app) => {
  /**
   * @api {get} /api/v1/catalogo/actividades Lista de actividades economicas
   * @apiGroup Catalogo
   * @apiDescription Lista de actividades economicas
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   *	"finalizado":true,
   *	"mensaje":"Datos obtenidos.",
   *	"datos":
   *	[
   *		{
   *        "codigo":"476111",
   *        "descripcion":"VENTA POR MENOR DE LIBROS"
   *     },
   *     {
   *        "codigo":"476112",
   *        "descripcion":"VENTA POR MENOR DE REVISTAS"
   *     },
   *     {
   *        "codigo":"641100",
   *        "descripcion":"BANCA CENTRAL"
   *     }
   *	]
   * }
   */
   app.api.get('/catalogo/actividades', asyncHandler(app.controllers.catalogo.getActividades));
   /**
    * @api {get} /api/v1/catalogo/codigoSin Lista de actividades economicas
    * @apiGroup Catalogo
    * @apiDescription Lista de actividades economicas
    * @apiSuccessExample Success-Response:
    * HTTP/1.1 200 OK
    * {
    *	"finalizado":true,
    *	"mensaje":"Datos obtenidos.",
    *	"datos":
    *	[
    *		{
    *        "codigo":"476111",
    *        "descripcion":"VENTA POR MENOR DE LIBROS"
    *     },
    *     {
    *        "codigo":"476112",
    *        "descripcion":"VENTA POR MENOR DE REVISTAS"
    *     },
    *     {
    *        "codigo":"641100",
    *        "descripcion":"SERVICIOS Y/O ACTIVIDADES SUJETAS AL IVA"
    *     }
    *	]
    * }
    */
   app.api.get('/catalogo/codigoSin', asyncHandler(app.controllers.catalogo.getCodigoSinActividad));
   /**
    * @api {get} /api/v1/catalogo/:agrupador Lista de un catalago segun agrupador seleccionado
    * @apiGroup Catalogo
    * @apiDescription Lista de catalogos con agrupador
    *
    * @apiParam {string} agrup Agrupador de catalogo 
    * {
    * 	 "agrupador": 'ACTIVIDAD'
    * }
    * @apiSuccessExample Success-Response:
    * HTTP/1.1 200 OK
    * {
    *	  "finalizado":true,
    *   "mensaje":"Datos obtenidos.",
    *	  "datos":
    *	  [
    *		  {
    *       "codigo":"476111",
    *       "descripcion":"VENTA POR MENOR DE LIBROS"
    *     },
    *     {
    *       "codigo":"476112",
    *       "descripcion":"VENTA POR MENOR DE REVISTAS"
    *     },
    *     {
    *       "codigo":"641100",
    *       "descripcion":"SERVICIOS Y/O ACTIVIDADES SUJETAS AL IVA"
    *     }
    *   ]
    * }
    */
   app.api.get('/catalogo/:agrupador', asyncHandler(app.controllers.catalogo.getCatalogo));
};
