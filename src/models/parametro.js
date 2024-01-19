/**
 * Módulo para parametros
 *
 * @module
 *
 **/

module.exports = (sequelize, DataType) => {
    const parametro = sequelize.define('parametro', {
        codigo: {
            type: DataType.STRING(50),
            primaryKey: true
        },
        grupo: {
            type: DataType.STRING(30),
            field: 'grupo',
            allowNull: false
        },
        nombre: {
            type: DataType.STRING(50),
            field: 'nombre',
            allowNull: false
        },
        descripcion: {
            type: DataType.STRING(100),
            field: 'descripcion'
        },
        orden: {
            type: DataType.DECIMAL(5,1),
            field: 'orden',
            allowNull: false
        },
        _usuario_creacion: {
            type: DataType.STRING(100),
            field: '_usuario_creacion',
            allowNull: false
        },
        _usuario_modificacion: {
            type: DataType.STRING(100),
            field: '_usuario_modificacion'
        }
    }, {
        createdAt: '_fecha_creacion',
        updatedAt: '_fecha_modificacion',
        tableName: 'parametro',
    });

    parametro.associate = (models) => {
    };

    return parametro;
};
