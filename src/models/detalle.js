/**
 * Módulo para detalle
 *
 * @module
 *
 **/

module.exports = (sequelize, DataType) => {
    const detalle = sequelize.define('detalle', {
        id_detalle: {
            type: DataType.INTEGER,
            field: 'id_detalle',
            primaryKey: true,
            autoIncrement: true
        },
        fid_venta: {
            type: DataType.INTEGER,
            field: 'fid_venta',
            allowNull: false
        },
        codigo: {
            type: DataType.STRING(50),
            field: 'codigo',
            allowNull: false
        },
        descripcion: {
            type: DataType.STRING(250),
            field: 'descripcion',
            allowNull: false
        },
        cantidad: {
            type: DataType.INTEGER,
            field: 'cantidad',
            allowNull: false
        },
        unidad_medida: {
            type: DataType.STRING(50),
            field: 'unidad_medida',
            allowNull: false
        },
        precio_unitario: {
            type: DataType.DECIMAL(12,2),
            field: 'precio_unitario',
            allowNull: false
        },
        monto_descuento: {
            type: DataType.DECIMAL(12,2),
            field: 'monto_descuento',
            allowNull: false
        },
        sub_total: {
            type: DataType.DECIMAL(12,2),
            field: 'sub_total',
            allowNull: false
        },
        numero_imei: {
            type: DataType.STRING,
            filed: 'numero_imei',
            allowNull: true
        },
        numero_serie: {
            type: DataType.STRING,
            filed: 'numero_serie',
            allowNull: true
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
        tableName: 'detalle',
    });

    detalle.associate = (models) => {
        detalle.belongsTo(models.venta, {
            as: 'venta',
            foreignKey: { name: 'fid_venta', allowNull: false },
            targetKey: 'id_venta'
        });
        detalle.belongsTo(models.item, {
            as: 'item',
            foreignKey: { name: 'codigo', allowNull: false },
            targetKey: 'codigo'
        });
    };

    return detalle;
};
