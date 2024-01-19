module.exports = {
    post: {
        type: 'object',
        properties: {
            actividad_economica: {
                type: 'string',
                required: true
            },
            codigo: {
                type: 'string',
                required: true
            },
            codigo_sin: {
                type: 'string',
                required: true
            },
            descripcion: {
                type: 'string',
                required: true
            },
            precio_unitario: {
                type: 'numeric',
                required: false
            },
            codigo_moneda: {
                type: 'string',
                required: false
            },
            codigo_unidad: {
                type: 'string',
                required: true
            },
            tipo_documento_fiscal: {
                type: 'string',
                required: false
            },
            tipo_documento_sector: {
                type: 'string',
                required: true
            },

        }
    },
    params: {
        type: 'object',
        properties: {
            id: {
                type: 'numeric',
                required: true
            }
        }
    }
};
