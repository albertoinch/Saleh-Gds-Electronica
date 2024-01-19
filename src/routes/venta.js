const validate = require('express-jsonschema').validate;
const ventaVal = require('./venta-val');
const asyncHandler = require('../lib/asyncHandler');

module.exports = (app) => {

/**
 * @api {get} /api/v1/ventas/:page Lista las ventas realizadas
 * @apiGroup Venta
 * @apiDescription Lista las ventas realizadas
 *
 * @apiHeader {String} Authorization Token de autorización
 *
 * @apiParam {Number} page Número de página a listar
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "finalizado": true,
 *   "mensaje": "Datos obtenidos",
 *   "datos": [
 *     {
 *       "id_venta": 2,
 *       "numero_factura": "2",
 *       "numero_documento": "1234567",
 *       "nombre_razon_social": "Juan Perez",
 *       "monto": "1960.00",
 *       "tipo_emision": 1,
 *       "cuf": "83D7F5F29D62E323BDF7E335FA2946B02A19F8D508E6BF86389EDC74",
 *       "cufd": "BQUFDZkVNQUE=NkEU5RTNCMTFGNzY=QkFEYVdRYkxWVUJQyMzY2Mjc2QzAyO",
 *       "codigo_documento_sector": "1",
 *       "codigo_recepcion": "c2a6b8ad-4ef6-11ec-be57-c1d9beb48396",
 *       "codigo_anulacion": null,
 *       "codigo_motivo": null,
 *       "estado": "VALIDADO",
 *       "_usuario_creacion": "admin",
 *       "_usuario_modificacion": null,
 *       "_fecha_creacion": "2021-11-26T20:23:46.971Z",
 *       "_fecha_modificacion": "2021-11-26T20:23:50.208Z",
 *       "fid_punto_venta": 2,
 *       "fid_cliente": 1
 *     }
 *   ],
 *   "paginacion": {
 *     "totalRegistros": 100,
 *     "paginas": 10,
 *     "paginaActual": 1,
 *     "cantidad": 4
 *   }
 * }
 */
  app.api.get('/ventas/:page', asyncHandler(app.controllers.venta.lista));

  app.api.get('/ventaReporte', asyncHandler(app.controllers.venta.total));

  app.api.get('/ventaPdf', asyncHandler(app.controllers.venta.pdf));

  app.api.get('/ventaMensual', asyncHandler(app.controllers.venta.mensual));

  app.api.post('/venta/:id', asyncHandler(app.controllers.venta.deposito));
};
