const Sequelize = require('sequelize');

module.exports = (app) => {
    const models = app.db.models;

    async function getCod(codigo, t) {
        const esquemaRes = await models.esquema.findOne({
            attributes: ['codigo', 'archivo', 'objeto', ['tipo_factura', 'tipoFacturaDocumento']],
            where: {
                codigo
            },
            transaction: t
        });
        if (esquemaRes) {
            return esquemaRes.toJSON();
        } else {
            return esquemaRes;
        }
    }

    async function getTipo(archivo, t) {
        const esquemaRes = await models.esquema.findOne({
            attributes: ['tipo_factura'],
            where: {
                archivo
            },
            transaction: t
        });
        if (esquemaRes) {
            return esquemaRes.tipo_factura;
        } else {
            return esquemaRes;
        }
    }

    return {
        getCod,
        getTipo
    };
};