module.exports = {
    post: {
        type: 'object',
        properties: {
            codigo: {
                type: 'numeric',
                required: true
            },
            descripcion: {
                type: 'string',
                required: true
            }
        }
    }
};
