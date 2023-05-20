/**
 * Módulo para deposito
 *
 * @module
 *
 **/

module.exports = (sequelize, DataType) => {
    const deposito = sequelize.define('deposito', {
        id_deposito: {
            type: DataType.INTEGER,
            field: 'id_deposito',
            primaryKey: true,
            autoIncrement: true
        },
        fid_venta: {
            type: DataType.INTEGER,
            field: 'fid_venta',
            allowNull: false
        },
        id: {
            type: DataType.INTEGER,
            field: 'id',
            allowNull: false
        },
        numero: {
            type: DataType.BIGINT,
            field: 'numero',
            allowNull: false
        },
        fecha: {
            type: DataType.DATEONLY,
            field: 'fecha',
            allowNull: false
        },
        monto: {
            type: DataType.DECIMAL(12,2),
            field: 'monto',
            allowNull: false
        },
        facturado: {
            type: DataType.DECIMAL(12,2),
            field: 'facturado',
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
        tableName: 'deposito',
    });

    deposito.associate = (models) => {
        deposito.belongsTo(models.venta, {
            as: 'venta',
            foreignKey: { name: 'fid_venta', allowNull: false },
            targetKey: 'id_venta'
        });
    };

    return deposito;
};
