/**
 * Módulo para contribuyente
 *
 * @module
 *
 **/

module.exports = (sequelize, DataType) => {
    const contribuyente = sequelize.define('contribuyente', {
        id_contribuyente: {
            type: DataType.INTEGER,
            field: 'id_contribuyente',
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataType.STRING(150),
            field: 'nombre',
            allowNull: false
        },
        nit: {
            type: DataType.BIGINT,
            field: 'nit',
            allowNull: false
        },
        codigo_ambiente: {
            type: DataType.INTEGER,
            field: 'codigo_ambiente',
            allowNull: false
        },
        codigo_modalidad: {
            type: DataType.INTEGER,
            field: 'codigo_modalidad',
            allowNull: false
        },
        estado: {
            type: DataType.STRING(30),
            field: 'estado',
            allowNull: false,
            defaultValue: 'ACTIVO'
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
        tableName: 'contribuyente',
    });

    contribuyente.associate = (models) => {
    };

    return contribuyente;
};
