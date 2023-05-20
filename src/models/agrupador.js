/**
 * Módulo para agrupador
 *
 * @module
 *
 **/

module.exports = (sequelize, DataType) => {
    const agrupador = sequelize.define('agrupador', {
        codigo: {
            type: DataType.STRING(50),
            field: 'codigo',
            primaryKey: true
        },
        descripcion: {
            type: DataType.STRING(250),
            field: 'descripcion',
            allowNull: false
        },
        metodo: {
            type: DataType.STRING(250),
            field: 'metodo'
        }
    }, {
        createdAt: false,
        updatedAt: false,
        tableName: 'agrupador',
    });

    agrupador.associate = (models) => {
        agrupador.hasOne(models.sync, {
            as: 'sync',
            foreignKey: 'codigo'
        });
    };

    return agrupador;
};
