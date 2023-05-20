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
    delete: {
        type: 'object',
        properties: {
            motivo: {
                type: 'numeric',
                required: true
            },
            email: {
                type: 'string',
                format: 'email',
                required: false
            },
            celular: {
                type: 'string',
                pattern: '^[0-9()\\-\\.\\s]+$',
                required: false
            }
        }
    }
};
