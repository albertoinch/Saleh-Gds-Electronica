/**
 * Módulo para cuis
 *
 * @module
 *
 **/

module.exports = (sequelize, DataType) => {
    const cuis = sequelize.define('cuis', {
        id_cuis: {
            type: DataType.INTEGER,
            field: 'id_cuis',
            primaryKey: true,
            autoIncrement: true
        },
        codigo: {
            type: DataType.STRING(100),
            field: 'codigo',
            allowNull: false
        },
        vigencia: {
            type: DataType.DATEONLY,
            field: 'vigencia',
            allowNull: false
        },
        estado: {
            type: DataType.STRING(30),
            field: 'estado',
            allowNull: false,
            defaultValue: 'ACTIVO'
        },
        fid_punto_venta: {
            type: DataType.INTEGER,
            field: 'fid_punto_venta',
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
        tableName: 'cuis',
    });

    cuis.associate = (models) => {
        cuis.belongsTo(models.punto_venta, {
            as: 'punto_venta',
            foreignKey: { name: 'fid_punto_venta', type: DataType.INTEGER },
            targetKey: 'id_punto_venta'
        });
    };

    return cuis;
};

