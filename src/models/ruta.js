/**
 * Módulo para ruta
 *
 * @module
 *
 **/
module.exports = (sequelize, DataType) => {
    const ruta = sequelize.define('ruta', {
        id_ruta: {
            type: DataType.INTEGER,
            field: 'id_ruta',
            primaryKey: true,
            autoIncrement: true
        },
        ruta: {
            type: DataType.STRING(100),
            field: 'ruta',
            allowNull: false,
            unique: true
        },
        descripcion: {
            type: DataType.STRING,
            field: 'descripcion',
            allowNull: false,
            defaultValue: ''
        },
        method_get: {
            type: DataType.BOOLEAN,
            field: 'method_get',
            allowNull: false,
            defaultValue: false
        },
        method_post: {
            type: DataType.BOOLEAN,
            field: 'method_post',
            allowNull: false,
            defaultValue: false
        },
        method_put: {
            type: DataType.BOOLEAN,
            field: 'method_put',
            allowNull: false,
            defaultValue: false
        },
        method_delete: {
            type: DataType.BOOLEAN,
            field: 'method_delete',
            allowNull: false,
            defaultValue: false
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
        tableName: 'ruta'
    });

    ruta.associate = (models) => {
        ruta.belongsToMany(models.grupo, {
            through: 'grupo_ruta',
            as: 'grupos',
            foreignKey: { name: 'fid_ruta', allowNull: false },
            targetKey: 'id_grupo',
            otherKey: 'fid_grupo'
        });
    };

    return ruta;
};

