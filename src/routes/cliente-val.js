module.exports = {
    params: {
        type: 'object',
        properties: {
            id: {
                type: 'numeric',
                required: true
            }
        }
    },
    put: {
        type: 'object',
        properties: {
            /* estado: {
                type: 'string',
                required: false
            }, */
            date: {
                type: 'string',
                format: 'date',
                required: false
            },
            email: {
                type: 'string',
                format: 'email',
                required: false
            },
            /* numero_documento: {
                type: 'string',
                required: true
            },
            razon_social: {
                type: 'string',
                required: true
            },
            tipo_documento: {
                type: 'string',
                required: true
            },
            complemento: {
                type: 'string',
                required: false
            } */
        }
    },
    search: {
        type: 'object',
        properties: {
            ci: {
                type: 'string',
                required: true
            }
        }
    },
    post: {
        type: 'object',
        properties: {
            codigoTipoDocumentoIdentidad: {
                type: 'string',
                required: true
            },
            complemento: {
                type: 'string',
                required: false
            },
            numeroDocumento: {
                type: 'string',
                required: true
            },
            nombreRazonSocial: {
                type: 'string',
                required: true
            },
            pais: {
                type: 'string',
                required: false
            },
            /*correo: {
                type: 'string',
                required: false
            },*/
            fechaNacimiento: {
                type: 'string',
                required: false
            },
        }
    },
};
