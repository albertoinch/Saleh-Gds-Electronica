/**
 * Módulo para sucursal
 *
 * @module
 *
 **/

module.exports = (sequelize, DataType) => {
    const sucursal = sequelize.define('sucursal', {
        id_sucursal: {
            type: DataType.INTEGER,
            field: 'id_sucursal',
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataType.STRING(150),
            field: 'nombre',
            allowNull: false
        },
        municipio: {
            type: DataType.STRING(250),
            field: 'municipio',
            allowNull: false
        },
        direccion: {
            type: DataType.STRING(250),
            field: 'direccion',
            allowNull: false
        },
        telefono: {
            type: DataType.STRING(250),
            field: 'telefono',
            allowNull: false
        },
        descripcion: {
            type: DataType.STRING(250),
            field: 'descripcion',
            allowNull: true
        },
        codigo: {
            type: DataType.STRING(50),
            field: 'codigo',
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
        tableName: 'sucursal',
    });

    sucursal.associate = (models) => {
        sucursal.belongsTo(models.contribuyente, {
            as: 'contribuyente',
            foreignKey: { name: 'fid_contribuyente', allowNull: false },
            targetKey: 'id_contribuyente'
        });
        sucursal.hasMany(models.punto_venta, {
            as: 'punto_venta',
            foreignKey: 'fid_sucursal'
        });
    };

    return sucursal;
};
