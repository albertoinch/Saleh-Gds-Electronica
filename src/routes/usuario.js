const validate = require('express-jsonschema').validate;
const asyncHandler = require('../lib/asyncHandler');
const usuarioVal = require('./usuario-val');

module.exports = (app) => {
	/**
	 * @api {get} /api/v1/usuario-grupo/:page lista todos los usuarios
	 * @apiGroup Usuario
	 * @apiDescription lista todos los items registrados
	 *
	 * @apiParamExample Ejemplo
	 * {  }
	 *
	 * @apiSuccessExample Success-Response:
	 * HTTP/1.1 200 OK
	 * {
      *   "finalizado":true,
      *   "mensaje":"Datos obtenidos.",
      *   "datos":[ 
      *        {
      *             "id_usuario":3,
      *             "usuario":"adsib_documentos",
      *             "fid_persona":3,
      *             "estado":"ACTIVO",
      *             "fid_punto_venta":1,
      *             "_fecha_creacion":"2019-12-17T15:17:29.332Z",
      *             "persona":{
      *                  "nombres":"Alvaro",
      *                  "primer_apellido":"Apaza Ruiz",
      *                  "segundo_apellido":null
      *              },
      *             "punto_venta":{
      *                  "id_punto_venta":1,
      *                  "nombre":"ADSIB San Miguel"
      *             },
      *             "grupos":[{
      *                  "id_grupo":2,
      *                  "grupo":"VISITA",
      *                  "descripcion":"ROL TEMPORAL",
      *                  "peso":"0",
      *                  "estado":"ACTIVO",
      *                  "_usuario_creacion":"1",
      *                  "_usuario_modificacion":null,
      *                  "_fecha_creacion":"2019-12-16T16:02:58.661Z",
      *                  "_fecha_modificacion":"2019-12-16T16:02:58.661Z",
      *                  "usuario_grupo":{
      *                        "id_usuario_grupo":3,
      *                        "fid_usuario":3,
      *                        "fid_grupo":2,
      *                        "_usuario_modificacion":"admin",
      *                        "_fecha_creacion":"2019-12-17T15:17:29.342Z",
      *                        "_fecha_modificacion":"2019-12-18T16:14:06.433Z"
      *                   }
      *             }]
      *         },
      *        {
      *             "id_usuario":1,
      *             "usuario":"admin",
      *             "fid_persona":1,
      *             "estado":"ACTIVO",
      *             "fid_punto_venta":1,
      *             "_fecha_creacion":"2019-12-16T16:02:58.653Z",
      *             "persona":{
      *                  "nombres":"ADSIB",
      *                  "primer_apellido":"ADSIB",
      *                  "segundo_apellido":"ADSIB"
      *             },
      *             "punto_venta":{
      *                  "id_punto_venta":1,
      *                  "nombre":"ADSIB San Miguel"
      *             },
      *             "grupos":[{
      *                  "id_grupo":1,
      *                  "grupo":"ADMIN",
      *                  "descripcion":"Administrador",
      *                  "peso":"0",
      *                  "estado":"ACTIVO",
      *                  "_usuario_creacion":"1",
      *                  "_usuario_modificacion":null,
      *                  "_fecha_creacion":"2019-12-16T16:02:58.661Z",
      *                  "_fecha_modificacion":"2019-12-16T16:02:58.661Z",
      *                  "usuario_grupo":{
      *                       "id_usuario_grupo":1,
      *                       "fid_usuario":1,
      *                       "fid_grupo":1,
      *                       "_usuario_modificacion":null,
      *                       "_fecha_creacion":"2019-12-16T16:02:58.669Z",
      *                       "_fecha_modificacion":"2019-12-16T16:02:58.669Z"
      *                  }
      *             }]
      *    }],
      *    "paginacion":{
      *         "totalRegistros":2,
      *         "paginas":1,
      *         "paginaActual":"1",
      *         "cantidad":2
      *    }
      * }
	*/
    app.api.get('/usuario-grupo/:page',asyncHandler(app.controllers.usuario_grupo.index));
    /**
     * @api {put} /api/v1/usuario-grupo/:id Edita el rol del usuario.
     * @apiGroup Usuario
     * @apiDescription Edita el rol del usuario.
	 * 
     * @apiParam {Number} id del usuario-grupo
     * @apiParam {Number} fidUsuario Id foraneo de usuario
     * @apiParam {Number} fidGrupo Id foraneo de grupo(rol)
     *
     * @apiParamExample Ejemplo de edicion de usuario-grupo
     * {
     *   "fidUsuario": 2,
     *   "fidGrupo": 3,
     * }
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     *   "finalizado": true,
     *   "mensaje": "Asignación realizada correctamente",
     * }
     */
    app.api.put('/usuario-grupo/:id', validate({body: usuarioVal.post}), asyncHandler(app.controllers.usuario_grupo.post));
    /**
     * @api {get} /api/v1/usuario-grupos Lista de grupos (Roles)
     * @apiGroup Grupo
     * @apiDescription Lista de grupos (Roles)
	 * 
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     *  "finalizado":true,
     *  "mensaje":"Datos obtenidos.",
     *  "datos":[
     *      {
     *          "id_grupo":1,
     *          "grupo":"ADMIN",
     *          "descripcion":"Administrador",
     *          "estado":"ACTIVO",
     *      },
     *      {
     *          "id_grupo":2,
     *          "grupo":"VISITA",
     *          "descripcion":"ROL TEMPORAL",
     *          "estado":"ACTIVO",
     *      },
     *      {
     *          "id_grupo":3,
     *          "grupo":"FACTURA",
     *          "descripcion":"FACTURADOR",
     *          "estado":"ACTIVO",
     *        }
     *  ]
     * }
     */
    app.api.get('/usuario-grupos', asyncHandler(app.controllers.usuario_grupo.grupos));
    /**
     * @api {put} /api/v1/usuario/:id Editar un usuario.
     * @apiGroup Usuario
     * @apiDescription Editar un usuario.
	 * 
     * @apiParam {Number} id del usuario
     * @apiParam {Number} fidPuntoVenta Id foraneo de punto de venta
     * @apiParam {Number} estado Estado del usuario
     *
     * @apiParamExample Ejemplo de creacion de producto
     * {
     *   "fidPuntoVenta": 1,
     *   "estado": "INACTIVO"
     * }
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     *   "finalizado": true,
     *   "mensaje": "Edición realizada correctamente.",
     * }
     */
    app.api.put('/usuario/:id', validate({params: usuarioVal.params, body: usuarioVal.put}), asyncHandler(app.controllers.usuario_grupo.update));
    app.api.post('/usuario', validate({body: usuarioVal.post}), asyncHandler(app.controllers.usuario_grupo.post));
    /**
     * @api {get} /api/v1/usuario/:id Obtiene los datos del usuario mediante id
     * @apiGroup Usuario
     * @apiDescription Obtiene los datos del usuario mediante id
     * 
     * @apiHeader {String} Authorization Token de acceso generado para facturación
     *
     * @apiParam {Number} id Identificador del usuario
     * @apiSuccessExample 
     * 	{
     *	    "finalizado": true,
     *	    "mensaje": "Usuario obtenido",
     *	    "datos": {
     *	        "id_usuario": 1,
     *	        "fid_persona": 1,
     *	        "fid_sucursal": 1,
     *	        "usuario": "admin",
     *	        "estado": "ACTIVO",
     *	        "persona": {
     *	            "nombres": "admin",
     *	            "primer_apellido": "admin",
     *	            "segundo_apellido": "admin"
     *	        },
     *	        "grupos": [
     *	            {
     *	                "id_grupo": 1,
     *	                "grupo": "ADMIN",
     *	            }
     *	        ]
     *	    }
     *	}
     */
	app.api.get('/usuario/:id', asyncHandler(app.controllers.usuario_grupo.get));

    app.api.get('/usuario/token/:id', asyncHandler(app.controllers.usuario_grupo.getToken));
};
