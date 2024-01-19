/**
 * Módulo para correlativo
 *
 * @module
 *
 **/

module.exports = (sequelize, DataType) => {
    const correlativo = sequelize.define('correlativo', {
        correlativo: {
            type: DataType.STRING(50),
            field: 'correlativo',
            primaryKey: true
        },
        fid_sucursal: {
            type: DataType.INTEGER,
            field: 'fid_sucursal',
            primaryKey: true
        },
        gestion: {
            type: DataType.STRING(4),
            field: 'gestion',
            primaryKey: true
        },
        nro: {
            type: DataType.INTEGER,
            field: 'nro',
            allowNull: false
        }
    }, {
        createdAt: false,
        updatedAt: false,
        tableName: 'correlativo',
    });

    correlativo.associate = (models) => {
    };

    return correlativo;
};
