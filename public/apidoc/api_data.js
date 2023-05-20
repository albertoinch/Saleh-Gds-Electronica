define({ "api": [
  {
    "type": "post",
    "url": "/autenticar",
    "title": "Autenticar usuario",
    "group": "Autenticar",
    "description": "<p>Obtiene el token de acceso a los servicios /api/v1</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": "<p>Tipo de contenido</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "username",
        "description": "<p>Nombre de usuario (CI)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "password",
        "description": "<p>Contraseña de usuario</p>"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Ejemplo de autenticación",
          "content": "{\n  \"username\": \"admin\",\n  \"password\": \"Developer\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"finalizado\": true,\n  \"mensaje\": \"Autenticación satisfactoria.\",\n  \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c3VhcmlvIjp7ImlkX3VzdWFyaW8iOjEsImlkX3BlcnNvbmEiOjEsIm5vbWJyZXMiOiJBRFNJQiIsImFwZWxsaWRvcyI6IkFEU0lCIEFEU0lCIiwiaWRfZ3J1cG8iOjEsImNhcmdvIjoiQURNSU4ifSwibWVudSI6W119.-vw9Of5rYg-9jDiEfV4WP9fSQi0J0IROLs4i0XNolKU\",\n  \"datos\": {\n    \"usuario\": {\n      \"id_usuario\": 1,\n      \"id_persona\": 1,\n      \"nombres\": \"ADSIB\",\n      \"apellidos\": \"ADSIB ADSIB\",\n      \"id_grupo\": 1,\n      \"cargo\": \"ADMIN\"\n    },\n    \"menu\": []\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/autenticacion.js",
    "groupTitle": "Autenticar",
    "name": "PostAutenticar",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/autenticar"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/catalogo/actividades",
    "title": "Lista de actividades economicas",
    "group": "Catalogo",
    "description": "<p>Lista de actividades economicas</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"finalizado\":true,\n\t\"mensaje\":\"Datos obtenidos.\",\n\t\"datos\":\n\t[\n\t\t{\n       \"codigo\":\"476111\",\n       \"descripcion\":\"VENTA POR MENOR DE LIBROS\"\n    },\n    {\n       \"codigo\":\"476112\",\n       \"descripcion\":\"VENTA POR MENOR DE REVISTAS\"\n    },\n    {\n       \"codigo\":\"641100\",\n       \"descripcion\":\"BANCA CENTRAL\"\n    }\n\t]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/catalogo.js",
    "groupTitle": "Catalogo",
    "name": "GetApiV1CatalogoActividades",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/catalogo/actividades"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/catalogo/:agrupador",
    "title": "Lista de un catalago segun agrupador seleccionado",
    "group": "Catalogo",
    "description": "<p>Lista de catalogos con agrupador</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "agrup",
            "description": "<p>Agrupador de catalogo { &quot;agrupador&quot;: 'ACTIVIDAD' }</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\t  \"finalizado\":true,\n  \"mensaje\":\"Datos obtenidos.\",\n\t  \"datos\":\n\t  [\n\t\t  {\n      \"codigo\":\"476111\",\n      \"descripcion\":\"VENTA POR MENOR DE LIBROS\"\n    },\n    {\n      \"codigo\":\"476112\",\n      \"descripcion\":\"VENTA POR MENOR DE REVISTAS\"\n    },\n    {\n      \"codigo\":\"641100\",\n      \"descripcion\":\"SERVICIOS Y/O ACTIVIDADES SUJETAS AL IVA\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/catalogo.js",
    "groupTitle": "Catalogo",
    "name": "GetApiV1CatalogoAgrupador",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/catalogo/:agrupador"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/catalogo/codigoSin",
    "title": "Lista de actividades economicas",
    "group": "Catalogo",
    "description": "<p>Lista de actividades economicas</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"finalizado\":true,\n\t\"mensaje\":\"Datos obtenidos.\",\n\t\"datos\":\n\t[\n\t\t{\n       \"codigo\":\"476111\",\n       \"descripcion\":\"VENTA POR MENOR DE LIBROS\"\n    },\n    {\n       \"codigo\":\"476112\",\n       \"descripcion\":\"VENTA POR MENOR DE REVISTAS\"\n    },\n    {\n       \"codigo\":\"641100\",\n       \"descripcion\":\"SERVICIOS Y/O ACTIVIDADES SUJETAS AL IVA\"\n    }\n\t]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/catalogo.js",
    "groupTitle": "Catalogo",
    "name": "GetApiV1CatalogoCodigosin",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/catalogo/codigoSin"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/cliente/buscar/:ci",
    "title": "Buscar datos de cliente",
    "group": "Cliente",
    "description": "<p>Buscar datos de cliente</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "complemento",
            "description": "<p>Código del motivo para anular la factura</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ci",
            "description": "<p>Número de documento del cliente</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tipoDoc",
            "description": "<p>Tipo de documento del cliente</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo para buscar cliente",
          "content": "{\n   \"complemento\": \"\"\n\t \"tipoDoc\": \"5\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\t   \"finalizado\":true,\n\t   \"mensaje\":\"Datos encontrados\",\n\t   \"datos\":\n\t   {\n\t   \t\"id_cliente\":14,\n\t    \t\"tipo_documento\":\"1\",\n\t    \t\"complemento_visible\":false,\n\t    \t\"numero_documento\":\"99002\",\n\t    \t\"complemento\":null,\n\t    \t\"fecha_nacimiento\":null,\n\t    \t\"razon_social\":\"Consumidor final\",\n\t    \t\"estado\":\"ACTIVO\",\n\t    \t\"correo\":null,\n\t    \t\"_usuario_creacion\":\"admin\",\n\t    \t\"_usuario_modificacion\":null,\n\t    \t\"_fecha_creacion\":\"2019-09-30T22:59:26.882Z\",\n\t    \t\"_fecha_modificacion\":\"2019-09-30T22:59:26.882Z\"\n\t   }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/cliente.js",
    "groupTitle": "Cliente",
    "name": "GetApiV1ClienteBuscarCi",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/cliente/buscar/:ci"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/cliente/:id",
    "title": "Buscar datos de cliente",
    "group": "Cliente",
    "description": "<p>Buscar datos de cliente por id</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/cliente.js",
    "groupTitle": "Cliente",
    "name": "GetApiV1ClienteId",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/cliente/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/clientes/:page",
    "title": "Recupera los clientes",
    "group": "Cliente",
    "description": "<p>Recupera la lista de clientes</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acceso generado para facturación</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Numero de página</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "buscarNroDoc",
            "description": "<p>Número de documento del cliente</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "buscarClientes",
            "description": "<p>Nombre del cliente o razón social</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "buscarEstado",
            "description": "<p>Numero de fatura de venta</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>cantidad de respuestas para devolución</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"finalizado\":true,\n   \"mensaje\":\"Datos obtenidos.\",\n   \"datos\":[\n       {\n           \"id_cliente\":1,\n           \"numero_documento\":\"99002\",\n           \"tipo_documento\":\"5\",\n           \"razon_social\":\"CONSUMIDOR FINAL\",\n           \"estado\":\"ACTIVO\",\n           \"complemento\":null,\n           \"complemento_visible\":false\n       }\n   ],\n   \"paginacion\":{\n       \"totalRegistros\":1,\n       \"paginas\":1,\n       \"paginaActual\":\"1\",\n       \"cantidad\":1\n   }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/cliente.js",
    "groupTitle": "Cliente",
    "name": "GetApiV1ClientesPage",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/clientes/:page"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/v1/cliente",
    "title": "Crear datos de cliente",
    "group": "Cliente",
    "description": "<p>Crear datos de cliente</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "codigoTipoDocumentoIdentidad",
            "description": "<p>Tipo de documento</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "numeroDocumento",
            "description": "<p>Numero del documento</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "complemento",
            "description": "<p>Complemento del documento</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nombreRazonSocial",
            "description": "<p>Nombre del cliente o razón social</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo para crear Cliente",
          "content": "{\n  \"codigoTipoDocumentoIdentidad\": 5,\n  \"numeroDocumento\": 1234567,\n  \"complemento\": \"1E\",\n  \"nombreRazonSocial\": \"Juan Perez\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\t   \"finalizado\":true,\n\t   \"mensaje\":\"Cliente creado correctamente\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/cliente.js",
    "groupTitle": "Cliente",
    "name": "PostApiV1Cliente",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/cliente"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/v1/cliente/:id",
    "title": "Editar datos de cliente",
    "group": "Cliente",
    "description": "<p>Editar datos de cliente por id</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "complemento",
            "description": "<p>Código del motivo para anular la factura</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "complemento_visible",
            "description": "<p>Valor boolean para verificar si tiene o no complemento</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "correo",
            "description": "<p>Correo electrónico del comprobador (Cuando se supera el plazo de anulación)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "estado",
            "description": "<p>Estado del cliente</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fecha_nacimiento",
            "description": "<p>Fecha de nacimiento del cliente</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id_cliente",
            "description": "<p>Número identificador del cliente</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "numero_documento",
            "description": "<p>Número de documento del cliente</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "razon_social",
            "description": "<p>Nombre o razon social del cliente</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tipo_documento",
            "description": "<p>Tipo de documento del cliente</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo para editar cliente",
          "content": "{\n   complemento: \"\"\n\t\tcomplemento_visible: false\n\t\tcorreo: \"prueba@gmail.com\"\n\t\testado: \"ACTIVO\"\n\t\tfecha_nacimiento: null\n\t\tid_cliente: 11\n\t\tnumero_documento: \"99004\"\n\t\trazon_social: \"CONTROL TRIBUTARIO\"\n\t\ttipo_documento: \"5\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\t   \"finalizado\":true,\n\t   \"mensaje\":\"Edición correcta\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/cliente.js",
    "groupTitle": "Cliente",
    "name": "PutApiV1ClienteId",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/cliente/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/estado",
    "title": "Estado del servicio",
    "group": "Estado",
    "description": "<p>Obtiene el estado del servicio</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": "<p>Tipo de contenido</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"finalizado\": true,\n  \"mensaje\": \"Conexión exitosa.\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/estado.js",
    "groupTitle": "Estado",
    "name": "GetApiV1Estado",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/estado"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/api/v1/evento/:id",
    "title": "Cerrar el último evento significativo",
    "group": "Evento",
    "description": "<p>Cerrar el último evento</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador del punto de venta</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"finalizado\": true,\n  \"mensaje\": \"Evento cerrado.\",\n  \"datos\": {\n    \"cufd\": \"BQUFDZkVNQUE=NkEU5RTNCMTFGNzY=Qm8maVZPS0xWVUFQyMzY2Mjc2QzAyO\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/evento.js",
    "groupTitle": "Evento",
    "name": "DeleteApiV1EventoId",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/evento/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/evento/:page?limit=&buscarEstado=&buscarTipo=",
    "title": "Lista de eventos registrados",
    "group": "Evento",
    "description": "<p>Lista de eventos registrados</p>",
    "parameter": {
      "examples": [
        {
          "title": "Ejemplo",
          "content": "{}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"finalizado\":true,\n\t\"mensaje\":\"Datos obtenidos.\",\n\t\"datos\":[{\n\t\t\"id_evento\":26,\n\t\t\"tipo\":\"CONTINGENCIA\",\n\t\t\"codigo_recepcion\":24563,\n\t\t\"fecha_inicio\":\"2019-10-07T15:37:38.953Z\",\n\t\t\"fecha_fin\":\"2019-10-07T16:20:00.000Z\",\n\t\t\"estado\":\"FINALIZADO\",\n\t\t\"codigo_evento\":973,\n\t\t\"descripcion\":\"CORTE DEL SERVICIO DE INTERNET\",\n\t\t\"fid_sucursal\":1\n\t},\n\t{\n\t\t\"id_evento\":21,\n\t\t\"tipo\":\"CONTINGENCIA\",\n\t\t\"codigo_recepcion\":19888,\n\t\t\"fecha_inicio\":\"2019-09-30T20:56:08.526Z\",\n\t\t\"fecha_fin\":\"2019-09-30T21:43:00.000Z\",\n\t\t\"estado\":\"FINALIZADO\",\n\t\t\"codigo_evento\":970,\n\t\t\"descripcion\":\"PROBLEMAS DE COMUNICACIÓN EXTERNA CON SERVIDOR\",\n\t\t\"fid_sucursal\":1\n\t}],\n\t\"paginacion\":\n\t{\n\t\t\"totalRegistros\":2,\n\t\t\"paginas\":1,\n\t\t\"paginaActual\":\"1\",\n\t\t\"cantidad\":2\n\t}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/evento.js",
    "groupTitle": "Evento",
    "name": "GetApiV1EventoPageLimitBuscarestadoBuscartipo",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/evento/:page?limit=&buscarEstado=&buscarTipo="
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/v1/evento",
    "title": "Iniciar nuevo evento significativo",
    "group": "Evento",
    "description": "<p>Registra un nuevo evento</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "codigo",
            "description": "<p>Código del evento significativo</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "descripcion",
            "description": "<p>Descripción del evento</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "cafc",
            "description": "<p>Código de Autorización de Facturas por Contingencia</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de nuevo evento",
          "content": "{\n  \"codigo\": 1,\n  \"descripcion\": \"Fallo en la fibra óptica\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"finalizado\": true,\n  \"mensaje\": \"Evento iniciado.\",\n  \"datos\": {\n    \"id_evento_significativo\": 1,\n    \"codigo\": \"1\",\n    \"descripcion\": \"Fallo la fibra óptica\",\n    \"fecha_inicio\": \"2021-11-22T12:47:18.779Z\",\n    \"fid_cufd_evento\": 1,\n    \"fid_punto_venta\": 1\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/evento.js",
    "groupTitle": "Evento",
    "name": "PostApiV1Evento",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/evento"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/api/v1/factura/:id",
    "title": "Anular factura",
    "group": "Factura",
    "description": "<p>Anular una factura</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador de la factura id o cuf</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "codigo",
            "description": "<p>Código del motivo que causa la anulación de la factura</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "motivo",
            "description": "<p>Motivo que causa la anulación de la factura</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de anulación de factura",
          "content": "{\n  \"codigo\": 1,\n  \"motivo\": \"Solicitud ADSIB/DE/0001/2021\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"finalizado\": true,\n  \"mensaje\": \"Factura anulada.\",\n  \"datos\": {\n    \"id\": 1,\n       \"numeroFactura\": \"1\",\n       \"numeroDocumento\": \"1234567\",\n       \"nombreRazonSocial\": \"Juan Perez\",\n       \"estado\": \"ANULADO\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/factura.js",
    "groupTitle": "Factura",
    "name": "DeleteApiV1FacturaId",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/factura/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/factura/:cuf/estado",
    "title": "Recuperar el estado de una factura",
    "group": "Factura",
    "description": "<p>Estado de una factura</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cuf",
            "description": "<p>Codigo único de factura o Identificador de la factura</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"finalizado\": true,\n  \"mensaje\": \"Factura creada.\",\n  \"datos\": {\n      \"id\": 30,\n      \"numeroFactura\": \"30\",\n      \"fecha\": \"2021/11/26\",\n      \"numeroDocumento\": \"1234567\",\n      \"nombreRazonSocial\": \"Juan Perez\",\n      \"cuf\": \"83D7F5F29D62EF8643688C5C25368FC862FBF986C243C99F27AEDC74\",\n      \"estado\": \"PENDIENTE\",\n      \"url\": \"https://desarrollo.adsib.gob.bo/facturacion/services/factura/83D7F5F29D62EF8643688C5C25368FC862FBF986C243C99F27AEDC74\",\n      \"urlPdf\": \"https://desarrollo.adsib.gob.bo/facturacion/services/factura/pdf/83D7F5F29D62EF8643688C5C25368FC862FBF986C243C99F27AEDC74\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/factura.js",
    "groupTitle": "Factura",
    "name": "GetApiV1FacturaCufEstado",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/factura/:cuf/estado"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/factura/:id",
    "title": "Recuperar factura",
    "group": "Factura",
    "description": "<p>Descargar una factura</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador de la factura</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nBinary data",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/factura.js",
    "groupTitle": "Factura",
    "name": "GetApiV1FacturaId",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/factura/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/factura/:nro/:cafc",
    "title": "Recuperar factura",
    "group": "Factura",
    "description": "<p>Descargar una factura</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "nro",
            "description": "<p>Número de Factura</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cafc",
            "description": "<p>Código de autorización de factura de contingencia</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/factura.js",
    "groupTitle": "Factura",
    "name": "GetApiV1FacturaNroCafc",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/factura/:nro/:cafc"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/factura/:nro/:fecha/estado",
    "title": "Recuperar el estado de una factura a partir del número y fecha",
    "group": "Factura",
    "description": "<p>Estado de una factura</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nro",
            "description": "<p>Número de factura Ejemplo: 953</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fecha",
            "description": "<p>Fecha de factura con formato YYYY-MM-DD Ejemplo: 2021-12-20</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"finalizado\": true,\n  \"mensaje\": \"Factura creada.\",\n  \"datos\": {\n      \"id\": 953,\n      \"numeroFactura\": \"953\",\n      \"fecha\": \"2021/12/20\",\n      \"numeroDocumento\": \"1234567\",\n      \"nombreRazonSocial\": \"Juan Perez\",\n      \"cuf\": \"83D7F5F29D62EF8643688C5C25368FC862FBF986C243C99F27AEDC74\",\n      \"estado\": \"VALIDADO\",\n      \"url\": \"https://desarrollo.adsib.gob.bo/facturacion/services/factura/83D7F5F29D62EF8643688C5C25368FC862FBF986C243C99F27AEDC74\",\n      \"urlPdf\": \"https://desarrollo.adsib.gob.bo/facturacion/services/factura/pdf/83D7F5F29D62EF8643688C5C25368FC862FBF986C243C99F27AEDC74\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/factura.js",
    "groupTitle": "Factura",
    "name": "GetApiV1FacturaNroFechaEstado",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/factura/:nro/:fecha/estado"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/factura/verificar/:nit",
    "title": "Verifica nit",
    "group": "Factura",
    "description": "<p>Verifica NIT para usarlo en una factura</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "nit",
            "description": "<p>Número de identificación tributatira a verificar</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"finalizado\": true,\n  \"mensaje\": \"Consulta realizada satisfactoriamente.\",\n  \"datos\": {\n    \"mensajesList\": [\n         {\n           \"codigo\": 986,\n           \"descripcion\": \"NIT ACTIVO\"\n         }\n       ],\n       \"transaccion\": true\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/factura.js",
    "groupTitle": "Factura",
    "name": "GetApiV1FacturaVerificarNit",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/factura/verificar/:nit"
      }
    ]
  },
  {
    "type": "get",
    "url": "/factura/:cuf",
    "title": "Recuperar factura xml",
    "group": "Factura",
    "description": "<p>Descargar una factura en XML</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "cuf",
            "description": "<p>Codigo Unico de Factura</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nXML",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/factura.js",
    "groupTitle": "Factura",
    "name": "GetFacturaCuf",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/factura/:cuf"
      }
    ]
  },
  {
    "type": "get",
    "url": "/factura/pdf/:cuf",
    "title": "Recuperar factura",
    "group": "Factura",
    "description": "<p>Descargar una factura</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "cuf",
            "description": "<p>Codigo Unico de Factura</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nBinary data",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/factura.js",
    "groupTitle": "Factura",
    "name": "GetFacturaPdfCuf",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/factura/pdf/:cuf"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/v1/factura",
    "title": "Registrar factura",
    "group": "Factura",
    "description": "<p>Registra una nueva factura</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": "<p>Tipo de contenido</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "codigoSucursal",
        "description": "<p>Sucursal en la que se registro la factura</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "codigoPuntoVenta",
        "defaultValue": "0",
        "description": "<p>Punto de venta en el que se registro la factura</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "codigoTipoDocumentoIdentidad",
        "description": "<p>Tipo de documento (1 = CI, 2 = CE, 3 = PASS, 4 = OD, 5 = NIT)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "numeroDocumento",
        "description": "<p>Numero del documento</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "complemento",
        "description": "<p>Complemento del documento</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "nombreRazonSocial",
        "description": "<p>Nombre del cliente o razón social</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "email",
        "description": "<p>Correo electrónico para realizar la notificación (Si se omite no se enviará notificación)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "codigoExcepcion",
        "description": "<p>Fuerza el registro de un NIT inválido (1 = Registrar, 0 = Validar)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "tipoCambio",
        "description": "<p>Tipo de cambio a bolivianos</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "codigoMetodoPago",
        "description": "<p>Código del metodo de pago (1 = Efectivo, 2 = Tarjeta, 6 = Posterior, 7 = Transferencia, 8 = Depósito)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "numeroTarjeta",
        "description": "<p>Número de tarjeta utilizada para el pago (Ofuscada) solo si el anterior es 2</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "tipoEmision",
        "description": "<p>Tipo de emisión (1 = Online, 2 = Offline)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "cafc",
        "description": "<p>Código de Autorización de Facturas por Contingencia</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "codigoMoneda",
        "description": "<p>Valor de la paramétrica que identifica la moneda en la cual se realiza la transacción (1 = Bs, 2 = USD)</p>"
      },
      {
        "group": "Body",
        "type": "Object[]",
        "optional": false,
        "field": "detalle",
        "description": "<p>Detalle de productos o servicios facturados</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "detalle.codigoProducto",
        "description": "<p>Identificador del servicio (producto o servicio)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "detalle.descripcion",
        "description": "<p>Descripción del servicio</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "detalle.cantidad",
        "description": "<p>Cantidad de items vendidos</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "detalle.unidadMedida",
        "description": "<p>Unidad de medida</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "detalle.precioUnitario",
        "description": "<p>Precio del servicio</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "detalle.montoDescuento",
        "description": "<p>Descuento por item si corresponde</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "detalle.numeroSerie",
        "description": "<p>Número de serie del producto</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "detalle.numeroImei",
        "description": "<p>Número IMEI del producto</p>"
      },
      {
        "group": "Body",
        "type": "Object[]",
        "optional": true,
        "field": "depositos",
        "description": "<p>Depósitos asociados a la factura en caso de que codigoMetodoPago sea 7 u 8</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "depositos.numero",
        "description": "<p>Número de documento en la cuenta de ADSIB</p>"
      },
      {
        "group": "Body",
        "type": "Date",
        "optional": false,
        "field": "depositos.fecha",
        "description": "<p>Fecha en la que se realizó el depósito</p>"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Ejemplo de emisión de factura depósito",
          "content": "{\n  \"codigoSucursal\": 0,\n  \"codigoTipoDocumentoIdentidad\": 1,\n  \"numeroDocumento\": \"1234567\",\n  \"complemento\": \"1E\",\n  \"nombreRazonSocial\": \"Juan Perez\",\n  \"tipoCambio\": \"1\",\n  \"codigoMetodoPago\": 8,\n  \"tipoEmision\": 1,\n  \"detalle\": [\n    {\n      \"codigoProducto\": \"020001\",\n      \"descripcion\": \"Persona Natural con Token\",\n      \"cantidad\": \"1\",\n      \"unidadMedida\": \"58\",\n      \"precioUnitario\": \"80.00\"\n    }\n  ]\n}",
          "type": "json"
        },
        {
          "title": "Ejemplo de emisión de factura efectivo",
          "content": "{\n  \"codigoTipoDocumentoIdentidad\": 1,\n  \"numeroDocumento\": \"1234567\",\n  \"nombreRazonSocial\": \"Juan Perez\",\n  \"tipoCambio\": \"1\",\n  \"codigoMetodoPago\": 1,\n  \"tipoEmision\": 1,\n  \"detalle\": [\n    {\n      \"codigoProducto\": \"020001\",\n      \"descripcion\": \"Persona Natural con Token\",\n      \"cantidad\": \"1\",\n      \"unidadMedida\": \"58\",\n      \"precioUnitario\": \"80.00\"\n    }\n  ]\n}",
          "type": "json"
        },
        {
          "title": "Ejemplo de emisión de factura tarjeta",
          "content": "{\n  \"codigoTipoDocumentoIdentidad\": 1,\n  \"numeroDocumento\": \"1234567\",\n  \"nombreRazonSocial\": \"Juan Perez\",\n  \"tipoCambio\": \"1\",\n  \"codigoMetodoPago\": 2,\n  \"numeroTarjeta\": \"1234000000001234\",\n  \"tipoEmision\": 1,\n  \"detalle\": [\n    {\n      \"codigoProducto\": \"020001\",\n      \"descripcion\": \"Persona Natural con Token\",\n      \"cantidad\": \"1\",\n      \"unidadMedida\": \"58\",\n      \"precioUnitario\": \"80.00\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"finalizado\": true,\n  \"mensaje\": \"Factura creada.\",\n  \"datos\": {\n      \"id\": 30,\n      \"numeroFactura\": \"30\",\n      \"fecha\": \"2021/11/26\",\n      \"numeroDocumento\": \"1234567\",\n      \"nombreRazonSocial\": \"Juan Perez\",\n      \"cuf\": \"83D7F5F29D62EF8643688C5C25368FC862FBF986C243C99F27AEDC74\",\n      \"estado\": \"PENDIENTE\",\n      \"url\": \"https://desarrollo.adsib.gob.bo/facturacion/services/factura/83D7F5F29D62EF8643688C5C25368FC862FBF986C243C99F27AEDC74\",\n      \"urlPdf\": \"https://desarrollo.adsib.gob.bo/facturacion/services/factura/pdf/83D7F5F29D62EF8643688C5C25368FC862FBF986C243C99F27AEDC74\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"finalizado\": false,\n  \"codigo\": \"3001\",\n  \"mensaje\": \"Debe enviar el número de tarjeta ofuscada.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/factura.js",
    "groupTitle": "Factura",
    "name": "PostApiV1Factura",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/factura"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/v1/factura/:id",
    "title": "Actualizar datos factura",
    "group": "Factura",
    "description": "<p>Actualiza datos de una factura rechazada</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador de la venta</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "codigoTipoDocumentoIdentidad",
            "description": "<p>Tipo de documento (1 = CI, 2 = CE, 3 = PASS, 4 = OD, 5 = NIT)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "numeroDocumento",
            "description": "<p>Numero del documento</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "complemento",
            "description": "<p>Complemento del documento</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nombreRazonSocial",
            "description": "<p>Nombre del cliente o razón social</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de emisión de factura depósito",
          "content": "{\n  \"codigoTipoDocumentoIdentidad\": 1,\n  \"numeroDocumento\": \"1234567\",\n  \"complemento\": \"1E\",\n  \"nombreRazonSocial\": \"Juan Perez\"\n}",
          "type": "json"
        },
        {
          "title": "Ejemplo de emisión de factura efectivo",
          "content": "{\n  \"codigoTipoDocumentoIdentidad\": 1,\n  \"numeroDocumento\": \"1234567\",\n  \"nombreRazonSocial\": \"Juan Perez\",\n  \"tipoEmision\": 1,\n  \"detalle\": [\n    {\n      \"codigoProducto\": \"020001\",\n      \"descripcion\": \"Persona Natural con Token\",\n      \"cantidad\": \"1\",\n      \"unidadMedida\": \"58\",\n      \"precioUnitario\": \"80.00\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/factura.js",
    "groupTitle": "Factura",
    "name": "PutApiV1FacturaId",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/factura/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/usuario-grupos",
    "title": "Lista de grupos (Roles)",
    "group": "Grupo",
    "description": "<p>Lista de grupos (Roles)</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"finalizado\":true,\n \"mensaje\":\"Datos obtenidos.\",\n \"datos\":[\n     {\n         \"id_grupo\":1,\n         \"grupo\":\"ADMIN\",\n         \"descripcion\":\"Administrador\",\n         \"estado\":\"ACTIVO\",\n     },\n     {\n         \"id_grupo\":2,\n         \"grupo\":\"VISITA\",\n         \"descripcion\":\"ROL TEMPORAL\",\n         \"estado\":\"ACTIVO\",\n     },\n     {\n         \"id_grupo\":3,\n         \"grupo\":\"FACTURA\",\n         \"descripcion\":\"FACTURADOR\",\n         \"estado\":\"ACTIVO\",\n       }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/usuario.js",
    "groupTitle": "Grupo",
    "name": "GetApiV1UsuarioGrupos",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/usuario-grupos"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/item",
    "title": "lista todos los items registrados",
    "group": "Item",
    "description": "<p>lista todos los items registrados</p>",
    "parameter": {
      "examples": [
        {
          "title": "Ejemplo",
          "content": "{  }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"finalizado\":true,\n\t\"mensaje\":\"Items.\",\n\t\"datos\":[\n\t{\n\t\t\"id_item\":1,\n\t\t\"descripcion\":\"Venta de dominio .bo\"\n\t},\n\t{\n\t\t\"id_item\":2,\n\t\t\"descripcion\":\"Venta de dominio .com.bo\"\n\t},\n\t{\n\t\t\"id_item\":3,\n\t\t\"descripcion\":\"Venta de dominio .org.bo\"\n\t},\n\t{\t\n\t\t\"id_item\":4,\n\t\t\"descripcion\":\"Venta de dominio .net.bo\"\n\t},\n\t{\n\t\t\"id_item\":5,\n\t\t\"descripcion\":\"Venta de dominio .tv.bo\"\n\t},\n\t{\n\t\t\"id_item\":6,\n\t\t\"descripcion\":\"Venta de dominio .web.bo\"\n\t},\n\t{\n\t\t\"id_item\":7,\n\t\t\"descripcion\":\"Venta de dominio .ciencia.bo\"\n\t},\n\t{\n\t\t\"id_item\":8,\n\t\t\"descripcion\":\"Venta de dominio .salud.bo\"\n\t},\n\t{\t\n\t\t\"id_item\":9,\n\t\t\"descripcion\":\"Venta de certificado Persona Natural\"\n\t},\n\t{\n\t\t\"id_item\":10,\n\t\t\"descripcion\":\"Venta de certificado Persona Juridica\"\n\t}]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/item.js",
    "groupTitle": "Item",
    "name": "GetApiV1Item",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/item"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/v1/item",
    "title": "Registrar un nuevo producto.",
    "group": "Item",
    "description": "<p>Registra un nuevo producto.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "actividad_economica",
            "description": "<p>Actividad economica del producto</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "codigo",
            "description": "<p>Código del producto a designar</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "codigo_sin",
            "description": "<p>Codigo por parte de impuestos</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "descripcion",
            "description": "<p>Descripcion del producto</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "precio_unitario",
            "description": "<p>Precio por unidad del producto</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "codigo_moneda",
            "description": "<p>Código de Moneda del producto - 688 = Bolivianos</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "unidad_medida",
            "description": "<p>unidad del producto - 62 = otra unidad de medida(1 año)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tipo_documento_fiscal",
            "description": "<p>Tipo de factura - 1 = Factura</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tipo_documento_sector",
            "description": "<p>tipo de sector - 1 = Factura Estandar</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de creacion de producto",
          "content": "{\n  \"actividad_economica\": \"641100\",\n  \"codigo\": \"010009\",\n  \"codigo_sin\": \"83171\",\n  \"descripcion\": \"Venta de dominio .academia.bo\",\n  \"precio_unitario\": 55,\n  \"codigo_moneda\": \"688\",\n  \"unidad_medida\": \"62\"\n  \"tipo_documento_fiscal\": \"1\"\n  \"tipo_documento_sector\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"finalizado\": true,\n  \"mensaje\": \"Producto creado\",\n  \"datos\":{\n\t\t \"actividad_economica\": \"641100\"\n      \"codigo\": \"010009\"\n      \"codigo_moneda\": \"688\"\n      \"codigo_sin\": \"83172\"\n      \"descripcion\": \"Venta de dominio .academia.bo\"\n      \"id_item\": 11\n      \"precio_unitario\": \"55.00\"\n      \"tipo_documento_fiscal\": \"1\"\n      \"tipo_documento_sector\": \"1\"\n      \"unidad_medida\": \"62\"\n      \"_fecha_creacion\": \"2019-12-11T23:29:49.514Z\"\n      \"_fecha_modificacion\": \"2019-12-11T23:29:49.514Z\"\n      \"_usuario_creacion\": \"admin\"\n      \"_usuario_modificacion\": null\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/item.js",
    "groupTitle": "Item",
    "name": "PostApiV1Item",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/item"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/v1/item/solicitud/:id",
    "title": "Solicitud de registro de nuevo producto a Impuestos Nacionales",
    "group": "Item",
    "description": "<p>Solicitud de registro de nuevo producto (descripción, codigo actividad) a Impuestos Nacionales</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"finalizado\":true,\n     \"mensaje\": \"Solicitud realizada.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/item.js",
    "groupTitle": "Item",
    "name": "PutApiV1ItemSolicitudId",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/item/solicitud/:id"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/v1/item/validacion/:id",
    "title": "Validación de solicitud previa para registro de nuevo producto con Impuestos Nacionales",
    "group": "Item",
    "description": "<p>Validación de solicitud previa para registro de nuevo producto con Impuestos Nacionales</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"finalizado\":true,\n     \"mensaje\": \"Validación realizada.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/item.js",
    "groupTitle": "Item",
    "name": "PutApiV1ItemValidacionId",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/item/validacion/:id"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/v1/puntoVenta/cuis",
    "title": "Actualiza el cuis",
    "group": "PuntoVenta",
    "description": "<p>Obtiene un cuis del servicio de impuestos nacionales</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "Content-Type",
            "defaultValue": "application/json",
            "description": "<p>Tipo de contenido</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acceso generado para facturación</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "id",
        "description": "<p>Identificador del punto de venta</p>"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Ejemplo",
          "content": "{\n    \"id\": 1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/puntoVenta.js",
    "groupTitle": "PuntoVenta",
    "name": "PostApiV1PuntoventaCuis",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/puntoVenta/cuis"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/v1/puntoVenta/registrar/:id",
    "title": "Registrar con impuestos punto de venta segun ID",
    "group": "PuntoVenta",
    "description": "<p>Registrar con impuestos punto de venta segun ID</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acceso generado para facturación</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"finalizado\": true,\n   \"mensaje\": 'Punto de Venta registrado.',\n   \n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/puntoVenta.js",
    "groupTitle": "PuntoVenta",
    "name": "PostApiV1PuntoventaRegistrarId",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/puntoVenta/registrar/:id"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/v1/puntoVenta/cerrar/:id",
    "title": "Cerrar el punto de venta con Impuestos Nacionales",
    "group": "PuntoVenta",
    "description": "<p>Cerrar el punto de venta con Impuestos Nacionales</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acceso generado para facturación</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Ejemplo",
          "content": "{ }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"finalizado\": true,\n   \"mensaje\": 'Punto de Venta cerrado.',\n   \n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/puntoVenta.js",
    "groupTitle": "PuntoVenta",
    "name": "PutApiV1PuntoventaCerrarId",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/puntoVenta/cerrar/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/puntoVenta",
    "title": "Lista de sucursales y púntos de venta",
    "group": "Sucursal",
    "description": "<p>Lista de sucursales y púntos de venta</p>",
    "parameter": {
      "examples": [
        {
          "title": "Ejemplo",
          "content": "{ }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"finalizado\": true,\n     \"mensaje\": \"Sucursales.\",\n     \"datos\": [\n         {\n             \"id_punto_venta\": 1,\n             \"codigo\": 0,\n             \"nombre\": \"ADSIB San Miguel\",\n             \"fid_sucursal\": 1,\n             \"sucursal\": {\n                 \"codigo\": \"0\",\n                 \"nit\": 120431020,\n                 \"nombre\": \"ADSIB San Miguel\"\n             }\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/puntoVenta.js",
    "groupTitle": "Sucursal",
    "name": "GetApiV1Puntoventa",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/puntoVenta"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/puntoVentas/:id/:page",
    "title": "Lista de punto de ventas por sucursal",
    "group": "Sucursal",
    "description": "<p>Lista de punto de ventas por sucursal</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acceso generado para facturación</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"finalizado\": true,\n     \"mensaje\": \"Sucursales.\",\n     \"datos\": [\n         {\n             \"id_sucursal\": 1,\n             \"nombre\": \"ADSIB San Miguel\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/puntoVenta.js",
    "groupTitle": "Sucursal",
    "name": "GetApiV1PuntoventasIdPage",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/puntoVentas/:id/:page"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/sucursales",
    "title": "Lista de sucursales",
    "group": "Sucursal",
    "description": "<p>Lista de sucursales</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"finalizado\": true,\n     \"mensaje\": \"Sucursales.\",\n     \"datos\": [\n         {\n            \"descripcion\": \"Edificio ADSIB\"\n            \"id_sucursal\": 1\n            \"nombre\": \"ADSIB San Miguel\"\n         }\n     ]\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/sucursal.js",
    "groupTitle": "Sucursal",
    "name": "GetApiV1Sucursales",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/sucursales"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/v1/puntoVenta",
    "title": "Crear punto de venta",
    "group": "Sucursal",
    "description": "<p>Crear punto de venta</p>",
    "parameter": {
      "examples": [
        {
          "title": "Ejemplo",
          "content": "{\n\t\t\"nombre\": \"Punto 2\",\n\t\t\"descripcion\":\"Punto de venta Nro 2, Chuquiago marka\",\n   \"idPuntoVenta\": 1,\n   \"tipo\": 2    \n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"finalizado\": true,\n   \"mensaje\": 'Punto de venta creado.'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/puntoVenta.js",
    "groupTitle": "Sucursal",
    "name": "PostApiV1Puntoventa",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/puntoVenta"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/v1/sucursal",
    "title": "Registrar Sucursal",
    "group": "Sucursal",
    "description": "<p>Registra sucursal</p>",
    "parameter": {
      "examples": [
        {
          "title": "Ejemplo",
          "content": "{ }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/contribuyente.js",
    "groupTitle": "Sucursal",
    "name": "PostApiV1Sucursal",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/sucursal"
      }
    ]
  },
  {
    "type": "post",
    "url": "/api/v1/sucursal",
    "title": "Registrar Sucursal",
    "group": "Sucursal",
    "description": "<p>Registra sucursal</p>",
    "parameter": {
      "examples": [
        {
          "title": "Ejemplo",
          "content": "{ }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/sucursal.js",
    "groupTitle": "Sucursal",
    "name": "PostApiV1Sucursal",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/sucursal"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/v1/sucursal/:id",
    "title": "Actualizar Sucursal",
    "group": "Sucursal",
    "description": "<p>Actualiza sucursal</p>",
    "parameter": {
      "examples": [
        {
          "title": "Ejemplo",
          "content": "{\n   \"nombre\": \"ADSIB\",\n   \"municipio\": \"La Paz\",\n   \"direccion\": \"Jaime Mendoza Nº 981, Zona San Miguel\",\n   \"telefono\": \"(591)2-2200720\",\n   \"descripcion\": \"Edificio ADSIB\",\n   \"codigo\": \"0\",\n   \"nit\": 120431020,\n   \"codigo_sistema\": \"6D2366276C028E9E3B11F76\",\n   \"codigo_ambiente\": 2,\n   \"codigo_modalidad\": 1\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/contribuyente.js",
    "groupTitle": "Sucursal",
    "name": "PutApiV1SucursalId",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/sucursal/:id"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/v1/sucursal/:id",
    "title": "Actualizar Sucursal",
    "group": "Sucursal",
    "description": "<p>Actualiza sucursal</p>",
    "parameter": {
      "examples": [
        {
          "title": "Ejemplo",
          "content": "{\n   \"nombre\": \"ADSIB\",\n   \"municipio\": \"La Paz\",\n   \"direccion\": \"Jaime Mendoza Nº 981, Zona San Miguel\",\n   \"telefono\": \"(591)2-2200720\",\n   \"descripcion\": \"Edificio ADSIB\",\n   \"codigo\": \"0\",\n   \"nit\": 120431020,\n   \"codigo_sistema\": \"6D2366276C028E9E3B11F76\",\n   \"codigo_ambiente\": 2,\n   \"codigo_modalidad\": 1\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/sucursal.js",
    "groupTitle": "Sucursal",
    "name": "PutApiV1SucursalId",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/sucursal/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/usuario-grupo/:page",
    "title": "lista todos los usuarios",
    "group": "Usuario",
    "description": "<p>lista todos los items registrados</p>",
    "parameter": {
      "examples": [
        {
          "title": "Ejemplo",
          "content": "{  }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"finalizado\":true,\n  \"mensaje\":\"Datos obtenidos.\",\n  \"datos\":[ \n       {\n            \"id_usuario\":3,\n            \"usuario\":\"adsib_documentos\",\n            \"fid_persona\":3,\n            \"estado\":\"ACTIVO\",\n            \"fid_punto_venta\":1,\n            \"_fecha_creacion\":\"2019-12-17T15:17:29.332Z\",\n            \"persona\":{\n                 \"nombres\":\"Alvaro\",\n                 \"primer_apellido\":\"Apaza Ruiz\",\n                 \"segundo_apellido\":null\n             },\n            \"punto_venta\":{\n                 \"id_punto_venta\":1,\n                 \"nombre\":\"ADSIB San Miguel\"\n            },\n            \"grupos\":[{\n                 \"id_grupo\":2,\n                 \"grupo\":\"VISITA\",\n                 \"descripcion\":\"ROL TEMPORAL\",\n                 \"peso\":\"0\",\n                 \"estado\":\"ACTIVO\",\n                 \"_usuario_creacion\":\"1\",\n                 \"_usuario_modificacion\":null,\n                 \"_fecha_creacion\":\"2019-12-16T16:02:58.661Z\",\n                 \"_fecha_modificacion\":\"2019-12-16T16:02:58.661Z\",\n                 \"usuario_grupo\":{\n                       \"id_usuario_grupo\":3,\n                       \"fid_usuario\":3,\n                       \"fid_grupo\":2,\n                       \"_usuario_modificacion\":\"admin\",\n                       \"_fecha_creacion\":\"2019-12-17T15:17:29.342Z\",\n                       \"_fecha_modificacion\":\"2019-12-18T16:14:06.433Z\"\n                  }\n            }]\n        },\n       {\n            \"id_usuario\":1,\n            \"usuario\":\"admin\",\n            \"fid_persona\":1,\n            \"estado\":\"ACTIVO\",\n            \"fid_punto_venta\":1,\n            \"_fecha_creacion\":\"2019-12-16T16:02:58.653Z\",\n            \"persona\":{\n                 \"nombres\":\"ADSIB\",\n                 \"primer_apellido\":\"ADSIB\",\n                 \"segundo_apellido\":\"ADSIB\"\n            },\n            \"punto_venta\":{\n                 \"id_punto_venta\":1,\n                 \"nombre\":\"ADSIB San Miguel\"\n            },\n            \"grupos\":[{\n                 \"id_grupo\":1,\n                 \"grupo\":\"ADMIN\",\n                 \"descripcion\":\"Administrador\",\n                 \"peso\":\"0\",\n                 \"estado\":\"ACTIVO\",\n                 \"_usuario_creacion\":\"1\",\n                 \"_usuario_modificacion\":null,\n                 \"_fecha_creacion\":\"2019-12-16T16:02:58.661Z\",\n                 \"_fecha_modificacion\":\"2019-12-16T16:02:58.661Z\",\n                 \"usuario_grupo\":{\n                      \"id_usuario_grupo\":1,\n                      \"fid_usuario\":1,\n                      \"fid_grupo\":1,\n                      \"_usuario_modificacion\":null,\n                      \"_fecha_creacion\":\"2019-12-16T16:02:58.669Z\",\n                      \"_fecha_modificacion\":\"2019-12-16T16:02:58.669Z\"\n                 }\n            }]\n   }],\n   \"paginacion\":{\n        \"totalRegistros\":2,\n        \"paginas\":1,\n        \"paginaActual\":\"1\",\n        \"cantidad\":2\n   }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/usuario.js",
    "groupTitle": "Usuario",
    "name": "GetApiV1UsuarioGrupoPage",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/usuario-grupo/:page"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/usuario/:id",
    "title": "Obtiene los datos del usuario mediante id",
    "group": "Usuario",
    "description": "<p>Obtiene los datos del usuario mediante id</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acceso generado para facturación</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Identificador del usuario</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "{",
          "content": "{\n    \"finalizado\": true,\n    \"mensaje\": \"Usuario obtenido\",\n    \"datos\": {\n        \"id_usuario\": 1,\n        \"fid_persona\": 1,\n        \"fid_sucursal\": 1,\n        \"usuario\": \"admin\",\n        \"estado\": \"ACTIVO\",\n        \"persona\": {\n            \"nombres\": \"admin\",\n            \"primer_apellido\": \"admin\",\n            \"segundo_apellido\": \"admin\"\n        },\n        \"grupos\": [\n            {\n                \"id_grupo\": 1,\n                \"grupo\": \"ADMIN\",\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/usuario.js",
    "groupTitle": "Usuario",
    "name": "GetApiV1UsuarioId",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/usuario/:id"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/v1/usuario-grupo/:id",
    "title": "Edita el rol del usuario.",
    "group": "Usuario",
    "description": "<p>Edita el rol del usuario.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>del usuario-grupo</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "fidUsuario",
            "description": "<p>Id foraneo de usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "fidGrupo",
            "description": "<p>Id foraneo de grupo(rol)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de edicion de usuario-grupo",
          "content": "{\n  \"fidUsuario\": 2,\n  \"fidGrupo\": 3,\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"finalizado\": true,\n  \"mensaje\": \"Asignación realizada correctamente\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/usuario.js",
    "groupTitle": "Usuario",
    "name": "PutApiV1UsuarioGrupoId",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/usuario-grupo/:id"
      }
    ]
  },
  {
    "type": "put",
    "url": "/api/v1/usuario/:id",
    "title": "Editar un usuario.",
    "group": "Usuario",
    "description": "<p>Editar un usuario.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>del usuario</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "fidPuntoVenta",
            "description": "<p>Id foraneo de punto de venta</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "estado",
            "description": "<p>Estado del usuario</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ejemplo de creacion de producto",
          "content": "{\n  \"fidPuntoVenta\": 1,\n  \"estado\": \"INACTIVO\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"finalizado\": true,\n  \"mensaje\": \"Edición realizada correctamente.\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/usuario.js",
    "groupTitle": "Usuario",
    "name": "PutApiV1UsuarioId",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/usuario/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/contribuyente/:page",
    "title": "Recupera todas las sucursales",
    "group": "Venta",
    "description": "<p>Recupera todas las sucursales</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acceso generado para facturación</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "buscarEstado",
            "description": "<p>Estado de venta</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "buscarNombre",
            "description": "<p>Nombre del punto de venta</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "buscarCodigo",
            "description": "<p>codigo de punto</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>cantidad de respuestas para devolución</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "{",
          "content": "{\n\t  \"limit\": 10\n   \"buscarEstado\": \"\"\n   \"buscarNombre\": \"\"\n   \"buscarCodigo\": 0\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"finalizado\":true,\n  \"mensaje\":\"Datos obtenidos.\",\n  \"datos\":[\n    {\n      \"id_punto\":1,\n      \"nombre\":\"Punto de Venta 1\",\n      \"descripcion\":\"Punto para ferias\",\n      \"estado\":\"PENDIENTE\",\n      \"codigo_punto_venta\":null,\n      \"fid_sucursal\":1,\n      \"tipo\":2\n    }\n   ],\n    \"paginacion\":\n    {\n      \"totalRegistros\":1,\n      \"paginas\":1,\n      \"paginaActual\":\"1\",\n      \"cantidad\":1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/contribuyente.js",
    "groupTitle": "Venta",
    "name": "GetApiV1ContribuyentePage",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/contribuyente/:page"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/contribuyentes",
    "title": "Recupera contribuyentes",
    "group": "Venta",
    "description": "<p>Recupera datos de los contribuyentes</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acceso generado para facturación</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id de la sucursal</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"finalizado\":true,\n  \"mensaje\":\"Sucursal Encontrada\",\n  \"datos\": {\n    \"idSucursal\":1,\n    \"direccion\":\"Jaime Mendoza Nº 981,Zona San Miguel\",\n    \"codigoSucursal\":\"0\",\n    \"nitEmisor\":120431020,\n    \"codigoAmbiente\":2,\n    \"codigoSistema\":\"4EEA445D57F\",\n    \"codigoPuntoVenta\":\"0\",\n    \"nombre\":\"ADSIB San Miguel\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/contribuyente.js",
    "groupTitle": "Venta",
    "name": "GetApiV1Contribuyentes",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/contribuyentes"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/items/:page",
    "title": "Recupera todas los productos registrados",
    "group": "Venta",
    "description": "<p>Recupera todas los productos registrados</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acceso generado para facturación</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "buscarActividad",
            "description": "<p>Código de actividad economica</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "buscarCodigo",
            "description": "<p>Código interno del producto</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "buscarCodigoSin",
            "description": "<p>Código signado por el sin del producto</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "{",
          "content": "{\n\t  \"limit\": 10\n   \"buscarActividad\": \"\"\n   \"buscarCodigo\": \"\"\n   \"buscarCodigoSin\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"finalizado\":true,\n  \"mensaje\":\"Datos obtenidos.\",\n  \"datos\":[\n    {\n       \"id_item\": 10,\n       \"actividad_economica\": \"641100\",\n       \"codigo\": \"020002\",\n       \"codigo_sin\": \"83171\",\n       \"descripcion\": \"Venta de certificado Persona Juridica\",\n       \"precio_unitario\": \"370.00\",\n       \"codigo_moneda\": \"688\"\n   },\n   {\n       \"id_item\": 9,\n       \"actividad_economica\": \"641100\",\n       \"codigo\": \"020001\",\n       \"codigo_sin\": \"83171\",\n       \"descripcion\": \"Venta de certificado Persona Natural\",\n       \"precio_unitario\": \"195.00\",\n       \"codigo_moneda\": \"688\"\n   },\n   {\n       \"id_item\": 1,\n       \"actividad_economica\": \"641100\",\n       \"codigo\": \"010001\",\n       \"codigo_sin\": \"83172\",\n       \"descripcion\": \"Venta de dominio .bo\",\n       \"precio_unitario\": \"980.00\",\n       \"codigo_moneda\": \"688\"\n   },\n   {\n       \"id_item\": 7,\n       \"actividad_economica\": \"641100\",\n       \"codigo\": \"010007\",\n       \"codigo_sin\": \"83172\",\n       \"descripcion\": \"Venta de dominio .ciencia.bo\",\n       \"precio_unitario\": \"55.00\",\n       \"codigo_moneda\": \"688\"\n   },\n   {\n       \"id_item\": 2,\n       \"actividad_economica\": \"641100\",\n       \"codigo\": \"010002\",\n       \"codigo_sin\": \"83172\",\n       \"descripcion\": \"Venta de dominio .com.bo\",\n       \"precio_unitario\": \"500.00\",\n       \"codigo_moneda\": \"688\"\n   },\n   {\n       \"id_item\": 4,\n       \"actividad_economica\": \"641100\",\n       \"codigo\": \"010004\",\n       \"codigo_sin\": \"83172\",\n       \"descripcion\": \"Venta de dominio .net.bo\",\n       \"precio_unitario\": \"280.00\",\n       \"codigo_moneda\": \"688\"\n   },\n   {\n       \"id_item\": 3,\n       \"actividad_economica\": \"641100\",\n       \"codigo\": \"010003\",\n       \"codigo_sin\": \"83172\",\n       \"descripcion\": \"Venta de dominio .org.bo\",\n       \"precio_unitario\": \"280.00\",\n       \"codigo_moneda\": \"688\"\n   },\n   {\n       \"id_item\": 8,\n       \"actividad_economica\": \"641100\",\n       \"codigo\": \"010008\",\n       \"codigo_sin\": \"83172\",\n       \"descripcion\": \"Venta de dominio .salud.bo\",\n       \"precio_unitario\": \"55.00\",\n       \"codigo_moneda\": \"688\"\n   },\n   {\n       \"id_item\": 5,\n       \"actividad_economica\": \"641100\",\n       \"codigo\": \"010005\",\n       \"codigo_sin\": \"83172\",\n       \"descripcion\": \"Venta de dominio .tv.bo\",\n       \"precio_unitario\": \"280.00\",\n       \"codigo_moneda\": \"688\"\n   },\n   {\n       \"id_item\": 6,\n       \"actividad_economica\": \"641100\",\n       \"codigo\": \"010006\",\n       \"codigo_sin\": \"83172\",\n       \"descripcion\": \"Venta de dominio .web.bo\",\n       \"precio_unitario\": \"280.00\",\n       \"codigo_moneda\": \"688\"\n   }],\n   \"paginacion\": {\n       \"totalRegistros\": 10,\n       \"paginas\": 1,\n       \"paginaActual\": \"1\",\n       \"cantidad\": 10\n   }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/item.js",
    "groupTitle": "Venta",
    "name": "GetApiV1ItemsPage",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/items/:page"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/puntoVenta/lista/:page",
    "title": "Recupera todas los puntos de venta",
    "group": "Venta",
    "description": "<p>Recupera todas los puntos de venta</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acceso generado para facturación</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "buscarEstado",
            "description": "<p>Estado de venta</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "buscarNombre",
            "description": "<p>Nombre del punto de venta</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "buscarCodigo",
            "description": "<p>codigo de punto</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>cantidad de respuestas para devolución</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "{",
          "content": "{\n\t  \"limit\": 10\n   \"buscarEstado\": \"\"\n   \"buscarNombre\": \"\"\n   \"buscarCodigo\": 0\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"finalizado\":true,\n  \"mensaje\":\"Datos obtenidos.\",\n  \"datos\": [\n       {\n           \"id_punto_venta\": 1,\n           \"nombre\": \"ADSIB San Miguel\",\n           \"descripcion\": \"Punto único de venta\",\n           \"estado\": \"ACTIVO\",\n           \"codigo\": 0,\n           \"fid_sucursal\": 1,\n           \"tipo\": 5\n       }\n   ],\n   \"paginacion\": {\n       \"totalRegistros\": 1,\n       \"paginas\": 1,\n       \"paginaActual\": \"1\",\n       \"cantidad\": 1\n   }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/puntoVenta.js",
    "groupTitle": "Venta",
    "name": "GetApiV1PuntoventaListaPage",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/puntoVenta/lista/:page"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/sucursal/:id",
    "title": "Recupera datos de una sucursal popr Id",
    "group": "Venta",
    "description": "<p>Recupera datos de una sucursal popr Id</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acceso generado para facturación</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id de la sucursal</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"finalizado\":true,\n  \"mensaje\":\"Sucursal Encontrada\",\n  \"datos\": {\n    \"idSucursal\":1,\n    \"direccion\":\"Jaime Mendoza Nº 981,Zona San Miguel\",\n    \"codigoSucursal\":\"0\",\n    \"nitEmisor\":120431020,\n    \"codigoAmbiente\":2,\n    \"codigoSistema\":\"4EEA445D57F\",\n    \"codigoPuntoVenta\":\"0\",\n    \"nombre\":\"ADSIB San Miguel\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/sucursal.js",
    "groupTitle": "Venta",
    "name": "GetApiV1SucursalId",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/sucursal/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/sucursales/:page",
    "title": "Recupera todas las sucursales",
    "group": "Venta",
    "description": "<p>Recupera todas las sucursales</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de acceso generado para facturación</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "buscarEstado",
            "description": "<p>Estado de venta</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "buscarNombre",
            "description": "<p>Nombre del punto de venta</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "buscarCodigo",
            "description": "<p>codigo de punto</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>cantidad de respuestas para devolución</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "{",
          "content": "{\n\t  \"limit\": 10\n   \"buscarEstado\": \"\"\n   \"buscarNombre\": \"\"\n   \"buscarCodigo\": 0\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"finalizado\":true,\n  \"mensaje\":\"Datos obtenidos.\",\n  \"datos\":[\n    {\n      \"id_punto\":1,\n      \"nombre\":\"Punto de Venta 1\",\n      \"descripcion\":\"Punto para ferias\",\n      \"estado\":\"PENDIENTE\",\n      \"codigo_punto_venta\":null,\n      \"fid_sucursal\":1,\n      \"tipo\":2\n    }\n   ],\n    \"paginacion\":\n    {\n      \"totalRegistros\":1,\n      \"paginas\":1,\n      \"paginaActual\":\"1\",\n      \"cantidad\":1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/sucursal.js",
    "groupTitle": "Venta",
    "name": "GetApiV1SucursalesPage",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/sucursales/:page"
      }
    ]
  },
  {
    "type": "get",
    "url": "/api/v1/ventas/:page",
    "title": "Lista las ventas realizadas",
    "group": "Venta",
    "description": "<p>Lista las ventas realizadas</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token de autorización</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Número de página a listar</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"finalizado\": true,\n  \"mensaje\": \"Datos obtenidos\",\n  \"datos\": [\n    {\n      \"id_venta\": 2,\n      \"numero_factura\": \"2\",\n      \"numero_documento\": \"1234567\",\n      \"nombre_razon_social\": \"Juan Perez\",\n      \"monto\": \"1960.00\",\n      \"tipo_emision\": 1,\n      \"cuf\": \"83D7F5F29D62E323BDF7E335FA2946B02A19F8D508E6BF86389EDC74\",\n      \"cufd\": \"BQUFDZkVNQUE=NkEU5RTNCMTFGNzY=QkFEYVdRYkxWVUJQyMzY2Mjc2QzAyO\",\n      \"codigo_documento_sector\": \"1\",\n      \"codigo_recepcion\": \"c2a6b8ad-4ef6-11ec-be57-c1d9beb48396\",\n      \"codigo_anulacion\": null,\n      \"codigo_motivo\": null,\n      \"estado\": \"VALIDADO\",\n      \"_usuario_creacion\": \"admin\",\n      \"_usuario_modificacion\": null,\n      \"_fecha_creacion\": \"2021-11-26T20:23:46.971Z\",\n      \"_fecha_modificacion\": \"2021-11-26T20:23:50.208Z\",\n      \"fid_punto_venta\": 2,\n      \"fid_cliente\": 1\n    }\n  ],\n  \"paginacion\": {\n    \"totalRegistros\": 100,\n    \"paginas\": 10,\n    \"paginaActual\": 1,\n    \"cantidad\": 4\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/venta.js",
    "groupTitle": "Venta",
    "name": "GetApiV1VentasPage",
    "sampleRequest": [
      {
        "url": "https://tecno.ciencia.bo/sf/serv/api/v1/ventas/:page"
      }
    ]
  }
] });
