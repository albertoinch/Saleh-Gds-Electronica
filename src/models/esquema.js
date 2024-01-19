/**
 * Módulo para esquema
 *
 * @module
 *
 **/

module.exports = (sequelize, DataType) => {
    const esquema = sequelize.define('esquema', {
        codigo: {
            type: DataType.STRING(50),
            field: 'codigo',
            primaryKey: true
        },
        tipo_factura: {
            type: DataType.INTEGER,
            field: 'tipo_factura',
            allowNull: true
        },
        archivo: {
            type: DataType.STRING(250),
            field: 'archivo',
            allowNull: true
        },
        objeto: {
            type: DataType.JSON,
            field: 'objeto',
            allowNull: true
        },
        archivo2: {
            type: DataType.STRING(250),
            field: 'archivo2',
            allowNull: true
        },
        objeto2: {
            type: DataType.JSON,
            field: 'objeto2',
            allowNull: true
        }
    }, {
        createdAt: false,
        updatedAt: false,
        tableName: 'esquema',
    });

    esquema.associate = (models) => {
    };

    return esquema;
};
