const validate = require('express-jsonschema').validate;
const sucusalVal = require('./sucursal-val');
const asyncHandler = require('../lib/asyncHandler');

module.exports = (app) => {
   /**
    * @api {post} /api/v1/sucursal Registrar Sucursal
    * @apiGroup Sucursal
    * @apiDescription Registra sucursal
    *
    * @apiParamExample Ejemplo
    * { }
    *
    * @apiSuccessExample Success-Response:
    * HTTP/1.1 200 OK
    * 
    */
    app.api.post('/sucursal', validate({body: sucusalVal.post}), asyncHandler(app.controllers.sucursal.post));

    /**
     * @api {put} /api/v1/sucursal/:id Actualizar Sucursal
     * @apiGroup Sucursal
     * @apiDescription Actualiza sucursal
     * 
     * @apiParamExample Ejemplo
     * {
     *    "nombre": "ADSIB",
     *    "municipio": "La Paz",
     *    "direccion": "Jaime Mendoza Nº 981, Zona San Miguel",
     *    "telefono": "(591)2-2200720",
     *    "descripcion": "Edificio ADSIB",
     *    "codigo": "0",
     *    "nit": 120431020,
     *    "codigo_sistema": "6D2366276C028E9E3B11F76",
     *    "codigo_ambiente": 2,
     *    "codigo_modalidad": 1
     * }
     */
    app.api.put('/sucursal/:id', validate({body: sucusalVal.post}), asyncHandler(app.controllers.sucursal.put));

    /**
    * @api {get} /api/v1/sucursales/:page Recupera todas las sucursales
    * @apiGroup Venta
    * @apiDescription Recupera todas las sucursales
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
    *   "datos":[
    *     {
    *       "id_punto":1,
    *       "nombre":"Punto de Venta 1",
    *       "descripcion":"Punto para ferias",
    *       "estado":"PENDIENTE",
    *       "codigo_punto_venta":null,
    *       "fid_sucursal":1,
    *       "tipo":2
    *     }
    *    ],
    *     "paginacion":
    *     {
    *       "totalRegistros":1,
    *       "paginas":1,
    *       "paginaActual":"1",
    *       "cantidad":1
    *     }
    * }
    *
    *
    */
  app.api.get('/sucursales/:page', asyncHandler(app.controllers.sucursal.index));
  /**
    * @api {get} /api/v1/sucursal/:id Recupera datos de una sucursal popr Id
    * @apiGroup Venta
    * @apiDescription Recupera datos de una sucursal popr Id
    * 
    * @apiHeader {String} Authorization Token de acceso generado para facturación
    * @apiParam {Number} id Id de la sucursal
    * @apiSuccessExample Success-Response:
    * {
    *   "finalizado":true,
    *   "mensaje":"Sucursal Encontrada",
    *   "datos": {
    *     "idSucursal":1,
    *     "direccion":"Jaime Mendoza Nº 981,Zona San Miguel",
    *     "codigoSucursal":"0",
    *     "nitEmisor":120431020,
    *     "codigoAmbiente":2,
    *     "codigoSistema":"4EEA445D57F",
    *     "codigoPuntoVenta":"0",
    *     "nombre":"ADSIB San Miguel"
    *   }
    * }
    *
    *
    */
   app.api.get('/sucursal/:id', asyncHandler(app.controllers.sucursal.get));
     /**
    * @api {get} /api/v1/sucursales Lista de sucursales
    * @apiGroup Sucursal
    * @apiDescription Lista de sucursales
    *
    * @apiSuccessExample Success-Response:
    * HTTP/1.1 200 OK
    * {
    *      "finalizado": true,
    *      "mensaje": "Sucursales.",
    *      "datos": [
    *          {
    *             "descripcion": "Edificio ADSIB"
    *             "id_sucursal": 1
    *             "nombre": "ADSIB San Miguel"
    *          }
    *      ]
    *  }
    */
   app.api.get('/sucursales',asyncHandler(app.controllers.sucursal.getSucursales));
};