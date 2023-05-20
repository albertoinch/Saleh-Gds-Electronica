/**
 * Módulo par usuario_grupo
 *
 * @module
 *
 **/
module.exports = (sequelize, DataType) => {
    const usuario_grupo = sequelize.define('usuario_grupo', {
        fid_grupo: {
            type: DataType.INTEGER,
            field: 'fid_grupo',
            primaryKey: true
        },
        fid_usuario: {
            type: DataType.INTEGER,
            field: 'fid_usuario',
            primaryKey: true
        }
    }, {
        createdAt: '_fecha_creacion',
        updatedAt: '_fecha_modificacion',
        tableName: 'usuario_grupo'
    });

    return usuario_grupo;
};

