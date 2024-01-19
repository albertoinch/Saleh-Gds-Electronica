/**
 * Módulo para grupo
 *
 * @module
 *
 **/
module.exports = (sequelize, DataType) => {
    const grupo = sequelize.define('grupo', {
        id_grupo: {
            type: DataType.INTEGER,
            field: 'id_grupo',
            primaryKey: true,
            autoIncrement: true
        },
        grupo: {
            type: DataType.STRING(100),
            field: 'grupo',
            allowNull: false,
            unique: true
        },
        descripcion: {
            type: DataType.STRING,
            field: 'descripcion',
            allowNull: false,
            defaultValue: ''
        },
        peso: {
            type: DataType.STRING(8),
            field: 'peso',
            allowNull: false,
            defaultValue: 1
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
        tableName: 'grupo'
    });

    grupo.associate = (models) => {
        grupo.belongsToMany(models.usuario, {
            through: 'usuario_grupo',
            as: 'usuarios',
            foreignKey: { name: 'fid_grupo', allowNull: false },
            targetKey: 'id_usuario',
            otherKey: 'fid_usuario'
        });
        grupo.belongsToMany(models.ruta, {
            through: 'grupo_ruta',
            as: 'rutas',
            foreignKey: { name: 'fid_grupo', allowNull: false },
            targetKey: 'id_ruta',
            otherKey: 'fid_ruta'
        });
        grupo.belongsToMany(models.menu, {
            through: 'grupo_menu',
            as: 'menus',
            foreignKey: { name: 'fid_grupo', allowNull: false },
            targetKey: 'id_menu',
            otherKey: 'fid_menu'
        });
    };

    return grupo;
};
