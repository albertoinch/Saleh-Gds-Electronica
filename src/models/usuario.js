/**
 * Módulo par usuario
 *
 * @module
 *
 **/
module.exports = (sequelize, DataType) => {
    const usuario = sequelize.define('usuario', {
        id_usuario: {
            type: DataType.INTEGER,
            field: 'id_usuario',
            primaryKey: true,
            autoIncrement: true
        },
        usuario: {
            type: DataType.STRING(100),
            field: 'usuario',
            allowNull: false,
            unique: true
        },
        contrasena: {
            type: DataType.STRING,
            field: 'contrasena',
            allowNull: false,
            defaultValue: ''
        },
        codigo_contrasena: {
            type: DataType.STRING(8),
            field: 'codigo_contrasena',
            allowNull: true
        },
        fecha_expiracion: {
            type: DataType.DATE,
            field: 'fecha_expiracion',
            allowNull: true
        },
        token: {
            type: DataType.STRING(50),
            field: 'token',
            allowNull: true
        },
        estado: {
            type: DataType.STRING(30),
            field: 'estado',
            allowNull: false,
            defaultValue: 'ACTIVO'
        },
        fid_persona: {
            type: DataType.INTEGER,
            field: 'fid_persona',
            allowNull: false
        },
        fid_contribuyente: {
            type: DataType.INTEGER,
            field: 'fid_contribuyente',
            allowNull: true
        },
        fid_punto_venta: {
            type: DataType.INTEGER,
            field: 'fid_punto_venta',
            allowNull: true
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
        tableName: 'usuario'
    });

    usuario.associate = (models) => {
        usuario.belongsTo(models.persona, {
            as: 'persona',
            foreignKey: { name: 'fid_persona', allowNull: false },
            targetKey: 'id_persona'
        });
        usuario.belongsTo(models.contribuyente, {
            as: 'contribuyente',
            foreignKey: { name: 'fid_contribuyente', allowNull: true },
            targetKey: 'id_contribuyente'
        });
        usuario.belongsTo(models.punto_venta, {
            as: 'punto_venta',
            foreignKey: { name: 'fid_punto_venta', allowNull: true },
            targetKey: 'id_punto_venta'
        });
        usuario.belongsToMany(models.grupo, {
            through: 'usuario_grupo',
            as: 'grupos',
            foreignKey: { name: 'fid_usuario', allowNull: false },
            targetKey: 'id_grupo',
            otherKey: 'fid_grupo'
        });
    };

    return usuario;
};

