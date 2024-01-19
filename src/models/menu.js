/**
 * Módulo para menu
 *
 * @module
 *
 **/
module.exports = (sequelize, DataType) => {
    const menu = sequelize.define('menu', {
        id_menu: {
            type: DataType.INTEGER,
            field: 'id_menu',
            primaryKey: true,
            autoIncrement: true
        },
        label: {
            type: DataType.STRING(100),
            field: 'label',
            allowNull: false,
            unique: true
        },
        descripcion: {
            type: DataType.STRING,
            field: 'descripcion',
            allowNull: false,
            defaultValue: ''
        },
        orden: {
            type: DataType.INTEGER,
            field: 'orden',
            allowNull: false,
            defaultValue: 1
        },
        ruta: {
            type: DataType.STRING(100),
            field: 'ruta',
            allowNull: true
        },
        icono: {
            type: DataType.STRING(100),
            field: 'icono',
            allowNull: true
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
            field: '_usuario_modificacion',
            allowNull: true
        }
    }, {
        createdAt: '_fecha_creacion',
        updatedAt: '_fecha_modificacion',
        tableName: 'menu'
    });

    menu.associate = (models) => {
        menu.belongsToMany(models.grupo, {
            through: 'grupo_menu',
            as: 'grupos',
            foreignKey: { name: 'fid_menu', allowNull: false },
            targetKey: 'id_grupo',
            otherKey: 'fid_grupo'
        });
    };

    return menu;
};
