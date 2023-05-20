module.exports = {
    post: {
        type: 'object',
        properties: {
            fid_persona: {
                type: 'numeric',
                required: true
            },
            fid_contribuyente: {
                type: 'numeric',
                required: false
            }
        }
    },
    put: {
        type: 'object',
        properties: {
            fidPuntoVenta: {
                type: 'numeric',
                required: true
            },
            estado: {
                type: 'string',
                required: true
            }
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
