/**
 * Módulo para catalogo
 *
 * @module
 *
 **/

module.exports = (sequelize, DataType) => {
    const catalogo = sequelize.define('catalogo', {
        fid_contribuyente: {
            type: DataType.INTEGER,
            field: 'fid_contribuyente',
            primaryKey: true
        },
        agrupador: {
            type: DataType.STRING(50),
            field: 'agrupador',
            primaryKey: true
        },
        codigo: {
            type: DataType.STRING(50),
            field: 'codigo',
            primaryKey: true
        },
        descripcion: {
            type: DataType.STRING(1000),
            field: 'descripcion',
            allowNull: true
        },
        codigo_actividad: {
            type: DataType.STRING(50),
            field: 'codigo_actividad',
            allowNull: true
        }
    }, {
        createdAt: false,
        updatedAt: false,
        tableName: 'catalogo',
    });

    catalogo.associate = (models) => {
        catalogo.belongsTo(models.agrupador, {
            as: 'grupo',
            foreignKey: { name: 'agrupador', allowNull: false },
            targetKey: 'codigo'
        });
        catalogo.belongsTo(models.contribuyente, {
            as: 'contribuyente',
            foreignKey: { name: 'fid_contribuyente', allowNull: false },
            targetKey: 'id_contribuyente'
        });
    };

    return catalogo;
};
