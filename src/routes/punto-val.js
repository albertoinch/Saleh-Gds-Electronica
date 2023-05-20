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
    post: {
        type: 'object',
        properties: {
            nombre: {
                type: 'string',
                required: true
            },
            descripcion: {
                type: 'string',
                required: true
            },
            fidSucursal: {
                type: 'numeric',
                required: true
            },
            tipo: {
                type: 'numeric',
                required: true
            }
        }
    }
};
