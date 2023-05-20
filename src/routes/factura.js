const validate = require('express-jsonschema').validate;
const facturaVal = require('./factura-val');
const asyncHandler = require('../lib/asyncHandler');

module.exports = (app) => {
/**
 * @api {post} /api/v1/factura Registrar factura
 * @apiGroup Factura
 * @apiDescription Registra una nueva factura
 *
 * @apiHeader {String} [Content-Type=application/json] Tipo de contenido
 * @apiHeader {String} Authorization Token de autorización
 *
 * @apiBody {String} codigoSucursal Sucursal en la que se registro la factura
 * @apiBody {String} [codigoPuntoVenta=0] Punto de venta en el que se registro la factura
 * @apiBody {String} codigoTipoDocumentoIdentidad Tipo de documento (1 = CI, 2 = CE, 3 = PASS, 4 = OD, 5 = NIT)
 * @apiBody {String} numeroDocumento Numero del documento
 * @apiBody {String} [complemento] Complemento del documento
 * @apiBody {String} nombreRazonSocial Nombre del cliente o razón social
 * @apiBody {String} [email] Correo electrónico para realizar la notificación (Si se omite no se enviará notificación)
 * @apiBody {String} [codigoExcepcion] Fuerza el registro de un NIT inválido (1 = Registrar, 0 = Validar)
 * @apiBody {String} tipoCambio Tipo de cambio a bolivianos
 * @apiBody {String} codigoMetodoPago Código del metodo de pago (1 = Efectivo, 2 = Tarjeta, 6 = Posterior, 7 = Transferencia, 8 = Depósito)
 * @apiBody {String} [numeroTarjeta] Número de tarjeta utilizada para el pago (Ofuscada) solo si el anterior es 2
 * @apiBody {String} tipoEmision Tipo de emisión (1 = Online, 2 = Offline)
 * @apiBody {String} [cafc] Código de Autorización de Facturas por Contingencia
 * @apiBody {String} [codigoMoneda] Valor de la paramétrica que identifica la moneda en la cual se realiza la transacción (1 = Bs, 2 = USD)
 * @apiBody {Object[]} detalle Detalle de productos o servicios facturados
 * @apiBody {String} detalle.codigoProducto Identificador del servicio (producto o servicio)
 * @apiBody {String} detalle.descripcion Descripción del servicio
 * @apiBody {String} detalle.cantidad Cantidad de items vendidos
 * @apiBody {String} detalle.unidadMedida Unidad de medida
 * @apiBody {String} detalle.precioUnitario Precio del servicio
 * @apiBody {String} [detalle.montoDescuento] Descuento por item si corresponde
 * @apiBody {String} [detalle.numeroSerie] Número de serie del producto
 * @apiBody {String} [detalle.numeroImei] Número IMEI del producto
 * @apiBody {Object[]} [depositos] Depósitos asociados a la factura en caso de que codigoMetodoPago sea 7 u 8
 * @apiBody {String} depositos.numero Número de documento en la cuenta de ADSIB
 * @apiBody {Date} depositos.fecha Fecha en la que se realizó el depósito
 *
 * @apiParamExample Ejemplo de emisión de factura depósito
 * {
 *   "codigoSucursal": 0,
 *   "codigoTipoDocumentoIdentidad": 1,
 *   "numeroDocumento": "1234567",
 *   "complemento": "1E",
 *   "nombreRazonSocial": "Juan Perez",
 *   "tipoCambio": "1",
 *   "codigoMetodoPago": 8,
 *   "tipoEmision": 1,
 *   "detalle": [
 *     {
 *       "codigoProducto": "020001",
 *       "descripcion": "Persona Natural con Token",
 *       "cantidad": "1",
 *       "unidadMedida": "58",
 *       "precioUnitario": "80.00"
 *     }
 *   ]
 * }
 *
 * @apiParamExample Ejemplo de emisión de factura efectivo
 * {
 *   "codigoTipoDocumentoIdentidad": 1,
 *   "numeroDocumento": "1234567",
 *   "nombreRazonSocial": "Juan Perez",
 *   "tipoCambio": "1",
 *   "codigoMetodoPago": 1,
 *   "tipoEmision": 1,
 *   "detalle": [
 *     {
 *       "codigoProducto": "020001",
 *       "descripcion": "Persona Natural con Token",
 *       "cantidad": "1",
 *       "unidadMedida": "58",
 *       "precioUnitario": "80.00"
 *     }
 *   ]
 * }
 *
 * @apiParamExample Ejemplo de emisión de factura tarjeta
 * {
 *   "codigoTipoDocumentoIdentidad": 1,
 *   "numeroDocumento": "1234567",
 *   "nombreRazonSocial": "Juan Perez",
 *   "tipoCambio": "1",
 *   "codigoMetodoPago": 2,
 *   "numeroTarjeta": "1234000000001234",
 *   "tipoEmision": 1,
 *   "detalle": [
 *     {
 *       "codigoProducto": "020001",
 *       "descripcion": "Persona Natural con Token",
 *       "cantidad": "1",
 *       "unidadMedida": "58",
 *       "precioUnitario": "80.00"
 *     }
 *   ]
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "finalizado": true,
 *   "mensaje": "Factura creada.",
 *   "datos": {
 *       "id": 30,
 *       "numeroFactura": "30",
 *       "fecha": "2021/11/26",
 *       "numeroDocumento": "1234567",
 *       "nombreRazonSocial": "Juan Perez",
 *       "cuf": "83D7F5F29D62EF8643688C5C25368FC862FBF986C243C99F27AEDC74",
 *       "estado": "PENDIENTE",
 *       "url": "https://desarrollo.adsib.gob.bo/facturacion/services/factura/83D7F5F29D62EF8643688C5C25368FC862FBF986C243C99F27AEDC74",
 *       "urlPdf": "https://desarrollo.adsib.gob.bo/facturacion/services/factura/pdf/83D7F5F29D62EF8643688C5C25368FC862FBF986C243C99F27AEDC74"
 *   }
 * }
 *
 * @apiSuccessExample Error-Response:
 * HTTP/1.1 200 OK
 * {
 *   "finalizado": false,
 *   "codigo": "3001",
 *   "mensaje": "Debe enviar el número de tarjeta ofuscada."
 * }
 */
  app.api.post('/factura', validate({body: facturaVal.post}), asyncHandler(app.controllers.factura.post));

/**
 * @api {put} /api/v1/factura/:id Actualizar datos factura
 * @apiGroup Factura
 * @apiDescription Actualiza datos de una factura rechazada
 *
 * @apiHeader {String} Authorization Token de autorización
 *
 * @apiParam {Number} id Identificador de la venta
 * @apiParam {String} codigoTipoDocumentoIdentidad Tipo de documento (1 = CI, 2 = CE, 3 = PASS, 4 = OD, 5 = NIT)
 * @apiParam {String} numeroDocumento Numero del documento
 * @apiParam {String} [complemento] Complemento del documento
 * @apiParam {String} nombreRazonSocial Nombre del cliente o razón social
 *
 * @apiParamExample Ejemplo de emisión de factura depósito
 * {
 *   "codigoTipoDocumentoIdentidad": 1,
 *   "numeroDocumento": "1234567",
 *   "complemento": "1E",
 *   "nombreRazonSocial": "Juan Perez"
 * }
 *
 * @apiParamExample Ejemplo de emisión de factura efectivo
 * {
 *   "codigoTipoDocumentoIdentidad": 1,
 *   "numeroDocumento": "1234567",
 *   "nombreRazonSocial": "Juan Perez",
 *   "tipoEmision": 1,
 *   "detalle": [
 *     {
 *       "codigoProducto": "020001",
 *       "descripcion": "Persona Natural con Token",
 *       "cantidad": "1",
 *       "unidadMedida": "58",
 *       "precioUnitario": "80.00"
 *     }
 *   ]
 * }
 */
  app.api.put('/factura/:id', validate({params: facturaVal.get, body: facturaVal.put}), asyncHandler(app.controllers.factura.put));

/**
 * @api {delete} /api/v1/factura/:id Anular factura
 * @apiGroup Factura
 * @apiDescription Anular una factura
 *
 * @apiHeader {String} Authorization Token de autorización
 *
 * @apiParam {String} id Identificador de la factura id o cuf
 * 
 * @apiParam {Number} codigo Código del motivo que causa la anulación de la factura
 * @apiParam {String} motivo Motivo que causa la anulación de la factura
 * 
 * @apiParamExample Ejemplo de anulación de factura
 * {
 *   "codigo": 1,
 *   "motivo": "Solicitud ADSIB/DE/0001/2021"
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "finalizado": true,
 *   "mensaje": "Factura anulada.",
 *   "datos": {
 *     "id": 1,
       "numeroFactura": "1",
       "numeroDocumento": "1234567",
       "nombreRazonSocial": "Juan Perez",
       "estado": "ANULADO"
 *   }
 * }
 */
  app.api.delete('/factura/:id', validate({body: facturaVal.delete}), asyncHandler(app.controllers.factura.annul));

/**
 * @api {get} /api/v1/factura/:cuf/estado Recuperar el estado de una factura
 * @apiGroup Factura
 * @apiDescription Estado de una factura
 *
 * @apiHeader {String} Authorization Token de autorización
 *
 * @apiParam {String} cuf Codigo único de factura o Identificador de la factura
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "finalizado": true,
 *   "mensaje": "Factura creada.",
 *   "datos": {
 *       "id": 30,
 *       "numeroFactura": "30",
 *       "fecha": "2021/11/26",
 *       "numeroDocumento": "1234567",
 *       "nombreRazonSocial": "Juan Perez",
 *       "cuf": "83D7F5F29D62EF8643688C5C25368FC862FBF986C243C99F27AEDC74",
 *       "estado": "PENDIENTE",
 *       "url": "https://desarrollo.adsib.gob.bo/facturacion/services/factura/83D7F5F29D62EF8643688C5C25368FC862FBF986C243C99F27AEDC74",
 *       "urlPdf": "https://desarrollo.adsib.gob.bo/facturacion/services/factura/pdf/83D7F5F29D62EF8643688C5C25368FC862FBF986C243C99F27AEDC74"
 *   }
 * }
 */
 app.api.get('/factura/:cuf/estado', asyncHandler(app.controllers.factura.get));

/**
 * @api {get} /api/v1/factura/:nro/:fecha/estado Recuperar el estado de una factura a partir del número y fecha
 * @apiGroup Factura
 * @apiDescription Estado de una factura
 *
 * @apiHeader {String} Authorization Token de autorización
 *
 * @apiParam {String} nro Número de factura Ejemplo: 953
 * @apiParam {String} fecha Fecha de factura con formato YYYY-MM-DD Ejemplo: 2021-12-20
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "finalizado": true,
 *   "mensaje": "Factura creada.",
 *   "datos": {
 *       "id": 953,
 *       "numeroFactura": "953",
 *       "fecha": "2021/12/20",
 *       "numeroDocumento": "1234567",
 *       "nombreRazonSocial": "Juan Perez",
 *       "cuf": "83D7F5F29D62EF8643688C5C25368FC862FBF986C243C99F27AEDC74",
 *       "estado": "VALIDADO",
 *       "url": "https://desarrollo.adsib.gob.bo/facturacion/services/factura/83D7F5F29D62EF8643688C5C25368FC862FBF986C243C99F27AEDC74",
 *       "urlPdf": "https://desarrollo.adsib.gob.bo/facturacion/services/factura/pdf/83D7F5F29D62EF8643688C5C25368FC862FBF986C243C99F27AEDC74"
 *   }
 * }
 */
 app.api.get('/factura/:nro/:fecha/estado', validate({params: facturaVal.getNro}), asyncHandler(app.controllers.factura.get));

/**
 * @api {get} /api/v1/factura/:id Recuperar factura
 * @apiGroup Factura
 * @apiDescription Descargar una factura
 *
 * @apiHeader {String} Authorization Token de autorización
 *
 * @apiParam {Number} id Identificador de la factura
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * Binary data
 */
 app.api.get('/factura/:id', validate({params: facturaVal.get}), asyncHandler(app.controllers.factura.build));

/**
 * @api {get} /factura/:cuf Recuperar factura xml
 * @apiGroup Factura
 * @apiDescription Descargar una factura en XML
 *
 * @apiParam {Number} cuf Codigo Unico de Factura
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * XML
 */
 app.pub.get('/factura/:cuf', validate({params: facturaVal.getCuf}), asyncHandler(app.controllers.factura.xml));

/**
 * @api {get} /factura/pdf/:cuf Recuperar factura
 * @apiGroup Factura
 * @apiDescription Descargar una factura
 *
 * @apiParam {Number} cuf Codigo Unico de Factura
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * Binary data
 */
 app.pub.get('/factura/pdf/:cuf', validate({params: facturaVal.getCuf}), asyncHandler(app.controllers.factura.build));

/**
 * @api {get} /api/v1/factura/verificar/:nit Verifica nit
 * @apiGroup Factura
 * @apiDescription Verifica NIT para usarlo en una factura
 *
 * @apiHeader {String} Authorization Token de autorización
 *
 * @apiParam {Number} nit Número de identificación tributatira a verificar
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "finalizado": true,
 *   "mensaje": "Consulta realizada satisfactoriamente.",
 *   "datos": {
 *     "mensajesList": [
         {
           "codigo": 986,
           "descripcion": "NIT ACTIVO"
         }
       ],
       "transaccion": true
 *   }
 * }
 */
 app.api.get('/factura/verificar/:nit', validate({params: facturaVal.verificar}), asyncHandler(app.controllers.factura.validate));

/**
 * @api {get} /api/v1/factura/:nro/:cafc Recuperar factura
 * @apiGroup Factura
 * @apiDescription Datos de una factura
 *
 * @apiHeader {String} Authorization Token de autorización
 *
 * @apiParam {Number} nro Número de Factura
 * @apiParam {String} cafc Código de autorización de factura de contingencia
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {}
 */
 app.api.get('/factura/:nro/:cafc', asyncHandler(app.controllers.factura.data));
};
