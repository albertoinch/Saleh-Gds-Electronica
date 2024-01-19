module.exports = (app) => {
    const models = app.db.models;

    async function crear(persona, t) {
        return await models.persona.create({
            tipo_documento: 'TD_CI',
            complemento_visible: false,
            numero_documento: '0',
            fecha_nacimiento: new Date(),
            nombres: persona.nombre,
            primer_apellido: persona.apellido,
            _usuario_creacion: persona.uid
        }, {
            transaction: t
        });
    }

    return {
        crear
    };
};
