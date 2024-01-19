/**
 * Módulo para venta
 *
 * @module
 *
 **/

module.exports = (sequelize, DataType) => {
    const venta = sequelize.define('venta', {
        id_venta: {
            type: DataType.INTEGER,
            field: 'id_venta',
            primaryKey: true,
            autoIncrement: true
        },
        numero_factura: {
            type: DataType.BIGINT,
            field: 'numero_factura',
            allowNull: false
        },
        fecha_emision: {
            type: DataType.STRING(50),
            field: 'fecha_emision',
            allowNull: false,
            defaultValue: ''
        },
        codigo_tipo_documento: {
            type: DataType.INTEGER,
            field: 'codigo_tipo_documento',
            allowNull: false,
            defaultValue: 5
        },
        numero_documento: {
            type: DataType.STRING(50),
            field: 'numero_documento',
            allowNull: false
        },
        nombre_razon_social: {
            type: DataType.STRING(250),
            field: 'nombre_razon_social',
            allowNull: false
        },
        monto: {
            type: DataType.DECIMAL(12,2),
            field: 'monto',
            allowNull: false
        },
        tipo_emision: {
            type: DataType.INTEGER,
            field: 'tipo_emision',
            allowNull: false
        },
        codigo_metodo_pago: {
            type: DataType.INTEGER,
            field: 'codigo_metodo_pago',
            allowNull: false,
            defaultValue: 6
        },
        cafc: {
            type: DataType.STRING(100),
            field: 'cafc',
            allowNull: false,
            defaultValue: ''
        },
        datos: {
            type: DataType.JSON,
            field: 'datos',
            allowNull: false
        },
        factura: {
            type: DataType.TEXT,
            field: 'factura',
            allowNull: false
        },
        cuf: {
            type: DataType.STRING(100),
            field: 'cuf',
            unique: true,
            allowNull: false
        },
        cufd: {
            type: DataType.STRING(100),
            field: 'cufd',
            allowNull: false
        },
        codigo_documento_sector: {
            type: DataType.STRING(50),
            field: 'codigo_documento_sector',
            allowNull: false
        },
        codigo_recepcion: {
            type: DataType.STRING(250),
            field: 'codigo_recepcion',
            allowNull: true
        },
        codigo_anulacion: {
            type: DataType.INTEGER,
            field: 'codigo_anulacion',
            allowNull: true
        },
        motivo: {
            type: DataType.STRING(250),
            field: 'motivo',
            allowNull: true
        },
        email: {
            type: DataType.STRING(250),
            field: 'email',
            allowNull: true
        },
        email_estado: {
            type: DataType.STRING(30),
            field: 'email_estado',
            allowNull: false,
            defaultValue: 'PENDIENTE'
        },
        estado: {
            type: DataType.STRING(30),
            field: 'estado',
            allowNull: false,
            defaultValue: 'PENDIENTE'
        },
        observacion: {
            type: DataType.STRING(250),
            field: 'observacion',
            allowNull: true
        },
        notificacion: {
            type: DataType.STRING(30),
            field: 'notificacion',
            allowNull: false,
            defaultValue: 'PENDIENTE'
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
        tableName: 'venta',
    });

    venta.associate = (models) => {
        venta.belongsTo(models.punto_venta, {
            as: 'punto_venta',
            foreignKey: { name: 'fid_punto_venta', type: DataType.INTEGER },
            targetKey: 'id_punto_venta'
        });
        venta.belongsTo(models.esquema, {
            as: 'esquema',
            foreignKey: { name: 'codigo_documento_sector', type: DataType.INTEGER },
            targetKey: 'codigo'
        });
        venta.belongsTo(models.cliente, {
            as: 'cliente',
            foreignKey: { name: 'fid_cliente', allowNull: false },
            targetKey: 'id_cliente'
        });
        venta.hasMany(models.detalle, {
            as: 'detalle',
            foreignKey: 'fid_venta'
        });
        venta.hasMany(models.deposito, {
            as: 'depositos',
            foreignKey: 'fid_venta'
        });
    };

    return venta;
};
