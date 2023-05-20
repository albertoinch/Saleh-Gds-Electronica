/**
 * Módulo para sync
 *
 * @module
 *
 **/

module.exports = (sequelize, DataType) => {
    const sync = sequelize.define('sync', {
        fid_contribuyente: {
            type: DataType.INTEGER,
            field: 'fid_contribuyente',
            primaryKey: true
        },
        codigo: {
            type: DataType.STRING(50),
            field: 'codigo',
            primaryKey: true
        },
        fecha: {
            type: DataType.STRING(10),
            field: 'fecha',
            allowNull: false,
            defaultValue: ''
        }
    }, {
        createdAt: false,
        updatedAt: '_fecha_modificacion',
        tableName: 'sync',
    });

    sync.associate = (models) => {
        sync.belongsTo(models.agrupador, {
            as: 'grupo',
            foreignKey: { name: 'codigo', allowNull: false },
            targetKey: 'codigo'
        });
        sync.belongsTo(models.contribuyente, {
            as: 'contribuyente',
            foreignKey: { name: 'fid_contribuyente', allowNull: false },
            targetKey: 'id_contribuyente'
        });
    };

    return sync;
};
