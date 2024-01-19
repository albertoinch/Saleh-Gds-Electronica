/**
 * Módulo para puntos de venta
 *
 * @module punto_venta
 *
 **/

 module.exports = (sequelize, DataType) => {
    const punto_venta = sequelize.define('punto_venta', {
        id_punto_venta: {
            type: DataType.INTEGER,
            field: 'id_punto_venta',
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataType.TEXT,
            field: 'nombre',
            allowNull: false
        },
        descripcion: {
            type: DataType.TEXT,
            field: 'descripcion',
            allowNull: false
        },
        codigo: {
            type: DataType.STRING(10),
            field: 'codigo',
            allowNull: true
        },
        tipo: {
            type: DataType.INTEGER,
            field: 'tipo',
            allowNull: true
        },
        estado: {
            type: DataType.STRING(30),
            field: 'estado',
            allowNull: false,
            defaultValue: 'ACTIVO'
        },
        fid_sucursal: {
            type: DataType.INTEGER,
            field: 'fid_sucursal',
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
        tableName: 'punto_venta',
    });

    punto_venta.associate = (models) => {
        punto_venta.belongsTo(models.sucursal, {
            as: 'sucursal',
            foreignKey: { name: 'fid_sucursal', type: DataType.INTEGER },
            targetKey: 'id_sucursal'
        });
        punto_venta.hasOne(models.cuis, {
            as: 'cuist',
            foreignKey: 'fid_punto_venta'
        });
        punto_venta.hasOne(models.cufd, {
            as: 'cufdt',
            foreignKey: 'fid_punto_venta'
        });
        punto_venta.hasOne(models.evento_significativo, {
            as: 'evento_significativo',
            foreignKey: 'fid_punto_venta'
        });
        punto_venta.hasMany(models.venta, {
            as: 'venta',
            foreignKey: 'fid_punto_venta'
        });
    };

    return punto_venta;
};
