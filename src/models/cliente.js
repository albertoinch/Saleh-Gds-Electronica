/**
 * Módulo para cliente
 *
 * @module
 *
 */
module.exports = (sequelize, DataType) => {
    const cliente = sequelize.define('cliente', {
        id_cliente: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tipo_documento: {
            type: DataType.STRING(50),
            allowNull: false,
            unique: 'uniqueSelectedItem'
        },
        complemento_visible: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        numero_documento: {
            type: DataType.STRING(20),
            allowNull: false,
            unique: 'uniqueSelectedItem'
        },
        complemento: {
            type: DataType.STRING(2),
            unique: 'uniqueSelectedItem',
            allowNull: true
        },
        fecha_nacimiento: {
            type: DataType.DATEONLY,
            allowNull: true
        },
        razon_social: {
            type: DataType.STRING(100),
            allowNull: false
        },
        estado: {
            type: DataType.STRING(30),
            allowNull: false,
            defaultValue: 'ACTIVO'
        },
        _usuario_creacion: {
            type: DataType.STRING(100),
            allowNull: false
        },
        _usuario_modificacion: {
            type: DataType.STRING(100)
        },
    }, {
        createdAt: '_fecha_creacion',
        updatedAt: '_fecha_modificacion',
        tableName: 'cliente'
    });

    cliente.associate = (models) => {
    };

    return cliente;
};
