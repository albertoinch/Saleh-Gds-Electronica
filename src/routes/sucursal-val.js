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
            direccion: {
                type: 'string',
                required: true
            },
            descripcion: {
                type: 'string',
                required: true
            }
        }
    }
};
