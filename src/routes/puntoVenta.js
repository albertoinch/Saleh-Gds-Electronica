const validate = require('express-jsonschema').validate;
const puntoVal = require('./punto-val');
const asyncHandler = require('../lib/asyncHandler');

module.exports = (app) => {
   /**
   * @api {post} /api/v1/puntoVenta Crear punto de venta
   * @apiGroup Sucursal
   * @apiDescription Crear punto de venta
   *
   * @apiParamExample Ejemplo
   * {
   *		"nombre": "Punto 2",
   *		"descripcion":"Punto de venta Nro 2, Chuquiago marka",
   *    "idPuntoVenta": 1,
   *    "tipo": 2    
   * }
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   *    "finalizado": true,
   *    "mensaje": 'Punto de venta creado.'
   * }
   */
   app.api.post('/puntoVenta', validate({body: puntoVal.post}), asyncHandler(app.controllers.punto_venta.post));
    /**
    * @api {get} /api/v1/puntoVenta Lista de sucursales y púntos de venta
    * @apiGroup Sucursal
    * @apiDescription Lista de sucursales y púntos de venta
    *
    * @apiParamExample Ejemplo
    * { }
    *
    * @apiSuccessExample Success-Response:
    * HTTP/1.1 200 OK
    * {
    *      "finalizado": true,
    *      "mensaje": "Sucursales.",
    *      "datos": [
    *          {
    *              "id_punto_venta": 1,
    *              "codigo": 0,
    *              "nombre": "ADSIB San Miguel",
    *              "fid_sucursal": 1,
    *              "sucursal": {
    *                  "codigo": "0",
    *                  "nit": 120431020,
    *                  "nombre": "ADSIB San Miguel"
    *              }
    *          }
    *      ]
    *  }
    */
    app.api.get('/puntoVenta',asyncHandler(app.controllers.punto_venta.get));
    /**
    * @api {get} /api/v1/puntoVenta/lista/:page Recupera todas los puntos de venta
    * @apiGroup Venta
    * @apiDescription Recupera todas los puntos de venta
    * 
    * @apiHeader {String} Authorization Token de acceso generado para facturación
    * @apiParam {String} buscarEstado Estado de venta
    * @apiParam {String} buscarNombre Nombre del punto de venta
    * @apiParam {Number} buscarCodigo codigo de punto
    * @apiParam {Number} limit cantidad de respuestas para devolución 
    * @apiParamExample 
    *  {
    *  	  "limit": 10
    *     "buscarEstado": ""
    *     "buscarNombre": ""
    *     "buscarCodigo": 0
    *  }
    * @apiSuccessExample Success-Response:
    * {
    *   "finalizado":true,
    *   "mensaje":"Datos obtenidos.",
    *   "datos": [
    *        {
    *            "id_punto_venta": 1,
    *            "nombre": "ADSIB San Miguel",
    *            "descripcion": "Punto único de venta",
    *            "estado": "ACTIVO",
    *            "codigo": 0,
    *            "fid_sucursal": 1,
    *            "tipo": 5
    *        }
    *    ],
    *    "paginacion": {
    *        "totalRegistros": 1,
    *        "paginas": 1,
    *        "paginaActual": "1",
    *        "cantidad": 1
    *    }
    * }
    *
    *
    */
  app.api.get('/puntoVenta/lista/:page', asyncHandler(app.controllers.punto_venta.index));
  /**
   * @api {post} /api/v1/puntoVenta/registrar/:id Registrar con impuestos punto de venta segun ID
   * @apiGroup PuntoVenta
   * @apiDescription Registrar con impuestos punto de venta segun ID
   *
   * @apiHeader {String} Authorization Token de acceso generado para facturación
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   *    "finalizado": true,
   *    "mensaje": 'Punto de Venta registrado.',
   *    
   * }
   */
  app.api.post('/puntoVenta/registrar/:id', validate({params: puntoVal.params}),asyncHandler(app.controllers.punto_venta.registrar));
  /**
   * @api {get} /api/v1/puntoVentas/:id/:page Lista de punto de ventas por sucursal
   * @apiGroup Sucursal
   * @apiDescription Lista de punto de ventas por sucursal
   *
   * @apiHeader {String} Authorization Token de acceso generado para facturación
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   *      "finalizado": true,
   *      "mensaje": "Sucursales.",
   *      "datos": [
   *          {
   *              "id_sucursal": 1,
   *              "nombre": "ADSIB San Miguel"
   *          }
   *      ]
   *  }
   */
  app.api.get('/puntoVentas/:id/:page',asyncHandler(app.controllers.punto_venta.indexS));
  /**
   * @api {put} /api/v1/puntoVenta/cerrar/:id Cerrar el punto de venta con Impuestos Nacionales
   * @apiGroup PuntoVenta
   * @apiDescription Cerrar el punto de venta con Impuestos Nacionales
   *
   * @apiHeader {String} Authorization Token de acceso generado para facturación
   * @apiParamExample Ejemplo
   * { }
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   *    "finalizado": true,
   *    "mensaje": 'Punto de Venta cerrado.',
   *    
   * }
   */
  app.api.put('/puntoVenta/cerrar/:id', validate({params: puntoVal.params}),asyncHandler(app.controllers.punto_venta.cierrePuntoVenta));
  /**
   * @api {post} /api/v1/puntoVenta/cuis Actualiza el cuis
   * @apiGroup PuntoVenta
   * @apiDescription Obtiene un cuis del servicio de impuestos nacionales
   *
   * @apiHeader {String} [Content-Type=application/json] Tipo de contenido
   * @apiHeader {String} Authorization Token de acceso generado para facturación
   *
   * @apiBody {Number} id Identificador del punto de venta
   *
   * @apiParamExample {json} Ejemplo
   * {
   *     "id": 1
   * }
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   */
  app.api.post('/puntoVenta/cuis', validate({body: puntoVal.params}), asyncHandler(app.controllers.punto_venta.cuis));
};