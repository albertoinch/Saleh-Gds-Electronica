/**
 * Módulo para item
 *
 * @module
 *
 **/

module.exports = (sequelize, DataType) => {
    const item = sequelize.define('item', {
        codigo: {
            type: DataType.STRING(50),
            field: 'codigo',
            primaryKey: true
        },
        actividad_economica: {
            type: DataType.STRING(50),
            field: 'actividad_economica',
            allowNull: false
        },
        codigo_sin: {
            type: DataType.STRING(50),
            field: 'codigo_sin',
            allowNull: false
        },
        descripcion: {
            type: DataType.STRING(250),
            field: 'descripcion',
            allowNull: false
        },
        imei: {
            type: DataType.BOOLEAN,
            field: 'imei',
            allowNull: false,
            defaultValue: false
        },
        serie: {
            type: DataType.BOOLEAN,
            field: 'serie',
            allowNull: false,
            defaultValue: false
        },
        codigo_unidad: {
            type: DataType.STRING(50),
            field: 'codigo_unidad',
            allowNull: false
        },
        codigo_documento_sector: {
            type: DataType.STRING(50),
            field: 'codigo_documento_sector',
            allowNull: false
        },
        fid_contribuyente: {
            type: DataType.INTEGER,
            field: 'fid_contribuyente',
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
        tableName: 'item',
    });

    item.associate = (models) => {
        item.belongsTo(models.esquema, {
            as: 'esquema',
            foreignKey: { name: 'codigo_documento_sector', allowNull: false },
            targetKey: 'codigo'
        });
        item.belongsTo(models.contribuyente, {
            as: 'contribuyente',
            foreignKey: { name: 'fid_contribuyente', allowNull: false },
            targetKey: 'id_contribuyente'
        });
        item.belongsTo(models.catalogo, {
            as: 'unidad',
            foreignKey: { name: 'codigo_unidad', allowNull: false },
            targetKey: 'codigo'
        });
    };

    return item;
};
