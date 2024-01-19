const validate = require('express-jsonschema').validate;
const clienteVal = require('./cliente-val');
const asyncHandler = require('../lib/asyncHandler');

module.exports = (app) => {

   /**
    * @api {get} /api/v1/clientes/:page Recupera los clientes
    * @apiGroup Cliente
    * @apiDescription Recupera la lista de clientes
    * 
    * 
    * @apiHeader {String} Authorization Token de acceso generado para facturación
    * @apiParam {Number} page Numero de página
    * @apiParam {Number} buscarNroDoc Número de documento del cliente
    * @apiParam {Number} buscarClientes Nombre del cliente o razón social
    * @apiParam {Number} buscarEstado Numero de fatura de venta
    * @apiParam {Number} limit cantidad de respuestas para devolución 
    * @apiSuccessExample Success-Response:
    *{
    *    "finalizado":true,
    *    "mensaje":"Datos obtenidos.",
    *    "datos":[
    *        {
    *            "id_cliente":1,
    *            "numero_documento":"99002",
    *            "tipo_documento":"5",
    *            "razon_social":"CONSUMIDOR FINAL",
    *            "estado":"ACTIVO",
    *            "complemento":null,
    *            "complemento_visible":false
    *        }
    *    ],
    *    "paginacion":{
    *        "totalRegistros":1,
    *        "paginas":1,
    *        "paginaActual":"1",
    *        "cantidad":1
    *    }
    *}
    */
	app.api.get('/clientes/:page', asyncHandler(app.controllers.cliente.index));
   /**
    * @api {put} /api/v1/cliente/:id Editar datos de cliente
    * @apiGroup Cliente
    * @apiDescription Editar datos de cliente por id
    *
    * @apiParam {String} complemento Código del motivo para anular la factura
    * @apiParam {String} complemento_visible Valor boolean para verificar si tiene o no complemento
    * @apiParam {String} [correo] Correo electrónico del comprobador (Cuando se supera el plazo de anulación)
    * @apiParam {String} estado Estado del cliente
    * @apiParam {String} fecha_nacimiento Fecha de nacimiento del cliente
    * @apiParam {Number} id_cliente Número identificador del cliente
    * @apiParam {Number} numero_documento Número de documento del cliente
    * @apiParam {String} razon_social Nombre o razon social del cliente
    * @apiParam {String} tipo_documento Tipo de documento del cliente
    * 
    * @apiParamExample Ejemplo para editar cliente
    * {
    *    complemento: ""
    *		complemento_visible: false
    *		correo: "prueba@gmail.com"
    *		estado: "ACTIVO"
    *		fecha_nacimiento: null
    *		id_cliente: 11
    *		numero_documento: "99004"
    *		razon_social: "CONTROL TRIBUTARIO"
    *		tipo_documento: "5"
    * }
    *
    * @apiSuccessExample Success-Response:
    * HTTP/1.1 200 OK
    * {
    *	   "finalizado":true,
    *	   "mensaje":"Edición correcta"
    * }
    */
    app.api.put('/cliente/:id', validate({params: clienteVal.params, body: clienteVal.put}), asyncHandler(app.controllers.cliente.put));
   /**
    * @api {get} /api/v1/cliente/:id Buscar datos de cliente
    * @apiGroup Cliente
    * @apiDescription Buscar datos de cliente por id
    *
    * @apiSuccessExample Success-Response:
    * HTTP/1.1 200 OK
    * 
    */
    app.api.get('/cliente/:id', validate({params: clienteVal.params}), asyncHandler(app.controllers.cliente.buscaCliente));
   /**
    * @api {get} /api/v1/cliente/buscar/:ci Buscar datos de cliente
    * @apiGroup Cliente
    * @apiDescription Buscar datos de cliente
    * 
    * @apiParam {String} complemento Código del motivo para anular la factura
    * @apiParam {Number} ci Número de documento del cliente
    * @apiParam {String} tipoDoc Tipo de documento del cliente
    * 
    * @apiParamExample Ejemplo para buscar cliente
    * {
    *    "complemento": ""
    *	 "tipoDoc": "5"
    * }
    *
    * @apiSuccessExample Success-Response:
    * HTTP/1.1 200 OK
    * {
    *	   "finalizado":true,
    *	   "mensaje":"Datos encontrados",
    *	   "datos":
    *	   {
    *	   	"id_cliente":14,
    *	    	"tipo_documento":"1",
    *	    	"complemento_visible":false,
    *	    	"numero_documento":"99002",
    *	    	"complemento":null,
    *	    	"fecha_nacimiento":null,
    *	    	"razon_social":"Consumidor final",
    *	    	"estado":"ACTIVO",
    *	    	"correo":null,
    *	    	"_usuario_creacion":"admin",
    *	    	"_usuario_modificacion":null,
    *	    	"_fecha_creacion":"2019-09-30T22:59:26.882Z",
    *	    	"_fecha_modificacion":"2019-09-30T22:59:26.882Z"
    *	   }
    * }
    */
    app.api.get('/cliente/buscar/:ci', validate({params: clienteVal.search}), asyncHandler(app.controllers.cliente.buscaClienteCI));
    /**
     * @api {post} /api/v1/cliente Crear datos de cliente
     * @apiGroup Cliente
     * @apiDescription Crear datos de cliente
     *
     * @apiParam {String} codigoTipoDocumentoIdentidad Tipo de documento
     * @apiParam {String} numeroDocumento Numero del documento
     * @apiParam {String} complemento Complemento del documento
     * @apiParam {String} nombreRazonSocial Nombre del cliente o razón social
     *
     * @apiParamExample Ejemplo para crear Cliente
     * {
     *   "codigoTipoDocumentoIdentidad": 5,
     *   "numeroDocumento": 1234567,
     *   "complemento": "1E",
     *   "nombreRazonSocial": "Juan Perez",
     * }
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     *	   "finalizado":true,
     *	   "mensaje":"Cliente creado correctamente"
     * }
     */
   app.api.post('/cliente', validate({body: clienteVal.post}), asyncHandler(app.controllers.cliente.post));

};
