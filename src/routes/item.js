const validate = require('express-jsonschema').validate;
const asyncHandler = require('../lib/asyncHandler');
const itemVal = require('./item-val');

module.exports = (app) => {
	/**
	 * @api {get} /api/v1/item lista todos los items registrados
	 * @apiGroup Item
	 * @apiDescription lista todos los items registrados
	 *
	 * @apiParamExample Ejemplo
	 * {  }
	 *
	 * @apiSuccessExample Success-Response:
	 * HTTP/1.1 200 OK
	 * {
	 * 	"finalizado":true,
	 * 	"mensaje":"Items.",
	 * 	"datos":[
	 * 	{
	 * 		"id_item":1,
	 * 		"descripcion":"Venta de dominio .bo"
	 * 	},
	 *	{
	 *		"id_item":2,
	*		"descripcion":"Venta de dominio .com.bo"
	*	},
	*	{
	*		"id_item":3,
	*		"descripcion":"Venta de dominio .org.bo"
	*	},
	*	{	
	*		"id_item":4,
	*		"descripcion":"Venta de dominio .net.bo"
	*	},
	*	{
	*		"id_item":5,
	*		"descripcion":"Venta de dominio .tv.bo"
	*	},
	*	{
	*		"id_item":6,
	*		"descripcion":"Venta de dominio .web.bo"
	*	},
	*	{
	*		"id_item":7,
	*		"descripcion":"Venta de dominio .ciencia.bo"
	*	},
	*	{
	*		"id_item":8,
	*		"descripcion":"Venta de dominio .salud.bo"
	*	},
	*	{	
	*		"id_item":9,
	*		"descripcion":"Venta de certificado Persona Natural"
	*	},
	*	{
	*		"id_item":10,
	*		"descripcion":"Venta de certificado Persona Juridica"
	*	}]
	* }
	*/
	app.api.get('/item',asyncHandler(app.controllers.item.get));
    /**
     * @api {post} /api/v1/item Registrar un nuevo producto.
     * @apiGroup Item
     * @apiDescription Registra un nuevo producto.
	 * 
     * @apiParam {String} actividad_economica Actividad economica del producto
     * @apiParam {String} codigo Código del producto a designar
     * @apiParam {String} codigo_sin Codigo por parte de impuestos
     * @apiParam {String} descripcion Descripcion del producto
     * @apiParam {Number} precio_unitario Precio por unidad del producto
     * @apiParam {String} codigo_moneda Código de Moneda del producto - 688 = Bolivianos
     * @apiParam {String} unidad_medida unidad del producto - 62 = otra unidad de medida(1 año)
     * @apiParam {String} tipo_documento_fiscal Tipo de factura - 1 = Factura
     * @apiParam {String} tipo_documento_sector tipo de sector - 1 = Factura Estandar

     *
     * @apiParamExample Ejemplo de creacion de producto
     * {
     *   "actividad_economica": "641100",
     *   "codigo": "010009",
     *   "codigo_sin": "83171",
     *   "descripcion": "Venta de dominio .academia.bo",
     *   "precio_unitario": 55,
     *   "codigo_moneda": "688",
     *   "unidad_medida": "62"
     *   "tipo_documento_fiscal": "1"
     *   "tipo_documento_sector": "1"
     * }
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     *   "finalizado": true,
     *   "mensaje": "Producto creado",
     *   "datos":{
	 * 		 "actividad_economica": "641100"
     *       "codigo": "010009"
     *       "codigo_moneda": "688"
     *       "codigo_sin": "83172"
     *       "descripcion": "Venta de dominio .academia.bo"
     *       "id_item": 11
     *       "precio_unitario": "55.00"
     *       "tipo_documento_fiscal": "1"
     *       "tipo_documento_sector": "1"
     *       "unidad_medida": "62"
     *       "_fecha_creacion": "2019-12-11T23:29:49.514Z"
     *       "_fecha_modificacion": "2019-12-11T23:29:49.514Z"
     *       "_usuario_creacion": "admin"
     *       "_usuario_modificacion": null
	 *   }
     * }
     */
	app.api.post('/item', validate({body: itemVal.post}), asyncHandler(app.controllers.item.post));
	/**
    * @api {get} /api/v1/items/:page Recupera todas los productos registrados
    * @apiGroup Venta
    * @apiDescription Recupera todas los productos registrados
    * 
    * @apiHeader {String} Authorization Token de acceso generado para facturación
    * @apiParam {String} buscarActividad Código de actividad economica
    * @apiParam {String} buscarCodigo Código interno del producto
    * @apiParam {String} buscarCodigoSin Código signado por el sin del producto
    * @apiParamExample 
    *  {
    *  	  "limit": 10
    *     "buscarActividad": ""
    *     "buscarCodigo": ""
    *     "buscarCodigoSin": ""
    *  }
    * @apiSuccessExample Success-Response:
    * {
    *   "finalizado":true,
    *   "mensaje":"Datos obtenidos.",
    *   "datos":[
    *     {
    *        "id_item": 10,
    *        "actividad_economica": "641100",
    *        "codigo": "020002",
    *        "codigo_sin": "83171",
    *        "descripcion": "Venta de certificado Persona Juridica",
    *        "precio_unitario": "370.00",
    *        "codigo_moneda": "688"
    *    },
    *    {
    *        "id_item": 9,
    *        "actividad_economica": "641100",
    *        "codigo": "020001",
    *        "codigo_sin": "83171",
    *        "descripcion": "Venta de certificado Persona Natural",
    *        "precio_unitario": "195.00",
    *        "codigo_moneda": "688"
    *    },
    *    {
    *        "id_item": 1,
    *        "actividad_economica": "641100",
    *        "codigo": "010001",
    *        "codigo_sin": "83172",
    *        "descripcion": "Venta de dominio .bo",
    *        "precio_unitario": "980.00",
    *        "codigo_moneda": "688"
    *    },
    *    {
    *        "id_item": 7,
    *        "actividad_economica": "641100",
    *        "codigo": "010007",
    *        "codigo_sin": "83172",
    *        "descripcion": "Venta de dominio .ciencia.bo",
    *        "precio_unitario": "55.00",
    *        "codigo_moneda": "688"
    *    },
    *    {
    *        "id_item": 2,
    *        "actividad_economica": "641100",
    *        "codigo": "010002",
    *        "codigo_sin": "83172",
    *        "descripcion": "Venta de dominio .com.bo",
    *        "precio_unitario": "500.00",
    *        "codigo_moneda": "688"
    *    },
    *    {
    *        "id_item": 4,
    *        "actividad_economica": "641100",
    *        "codigo": "010004",
    *        "codigo_sin": "83172",
    *        "descripcion": "Venta de dominio .net.bo",
    *        "precio_unitario": "280.00",
    *        "codigo_moneda": "688"
    *    },
    *    {
    *        "id_item": 3,
    *        "actividad_economica": "641100",
    *        "codigo": "010003",
    *        "codigo_sin": "83172",
    *        "descripcion": "Venta de dominio .org.bo",
    *        "precio_unitario": "280.00",
    *        "codigo_moneda": "688"
    *    },
    *    {
    *        "id_item": 8,
    *        "actividad_economica": "641100",
    *        "codigo": "010008",
    *        "codigo_sin": "83172",
    *        "descripcion": "Venta de dominio .salud.bo",
    *        "precio_unitario": "55.00",
    *        "codigo_moneda": "688"
    *    },
    *    {
    *        "id_item": 5,
    *        "actividad_economica": "641100",
    *        "codigo": "010005",
    *        "codigo_sin": "83172",
    *        "descripcion": "Venta de dominio .tv.bo",
    *        "precio_unitario": "280.00",
    *        "codigo_moneda": "688"
    *    },
    *    {
    *        "id_item": 6,
    *        "actividad_economica": "641100",
    *        "codigo": "010006",
    *        "codigo_sin": "83172",
    *        "descripcion": "Venta de dominio .web.bo",
    *        "precio_unitario": "280.00",
    *        "codigo_moneda": "688"
    *    }],
    *    "paginacion": {
    *        "totalRegistros": 10,
    *        "paginas": 1,
    *        "paginaActual": "1",
    *        "cantidad": 10
    *    }
    * }
    */
   app.api.get('/items/:page', asyncHandler(app.controllers.item.index));
   /**
     * @api {put} /api/v1/item/solicitud/:id Solicitud de registro de nuevo producto a Impuestos Nacionales
     * @apiGroup Item
     * @apiDescription Solicitud de registro de nuevo producto (descripción, codigo actividad) a Impuestos Nacionales
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     *      "finalizado":true,
     *      "mensaje": "Solicitud realizada."
     * }
     * 
     */
    app.api.post('/item/solicitud/:id', validate({params: itemVal.params}), asyncHandler(app.controllers.item.solicitudNuevoProducto));
    /**
     * @api {put} /api/v1/item/validacion/:id Validación de solicitud previa para registro de nuevo producto con Impuestos Nacionales
     * @apiGroup Item
     * @apiDescription Validación de solicitud previa para registro de nuevo producto con Impuestos Nacionales
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     *      "finalizado":true,
     *      "mensaje": "Validación realizada."
     * }
     * 
     */
    app.api.post('/item/validacion/:id', validate({params: itemVal.params}), asyncHandler(app.controllers.item.validarNuevoProducto));

    app.api.get('/item/catalogo', asyncHandler(app.controllers.item.catalogo));

    app.api.get('/item/:id', asyncHandler(app.controllers.item.buscaItem));

    app.api.put('/item/:id', asyncHandler(app.controllers.item.put));
};
