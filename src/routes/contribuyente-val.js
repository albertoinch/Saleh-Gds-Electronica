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
            nit: {
                type: 'string',
                required: true
            }
        }
    }
};
