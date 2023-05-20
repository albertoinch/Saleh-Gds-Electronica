/**
 * Módulo para persona
 *
 * @module
 *
 */
module.exports = (sequelize, DataType) => {
    const persona = sequelize.define('persona', {
        id_persona: {
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
            unique: 'uniqueSelectedItem',
            allowNull: false
        },
        nombres: {
            type: DataType.STRING(100),
            allowNull: false,
        },
        primer_apellido: {
            type: DataType.STRING(100),
            allowNull: true,
        },
        segundo_apellido: {
            type: DataType.STRING(100),
            allowNull: true
        },
        casada_apellido: {
            type: DataType.STRING(100),
            allowNull: true
        },
        sexo: {
            type: DataType.CHAR(1),
            allowNull: true,
        },
        direccion: {
            type: DataType.STRING(100),
            allowNull: true,
        },
        telefono: {
            type: DataType.STRING(100),
            allowNull: true,
        },
        correo: {
            type: DataType.STRING(100),
            allowNull: true,
        },
        estado: {
            type: DataType.STRING(30),
            allowNull: false,
            defaultValue: 'ACTIVO',
        },
        _usuario_creacion: {
            type: DataType.STRING(100),
            allowNull: false,
        },
        _usuario_modificacion: {
            type: DataType.STRING(100)
        },
    }, {
        createdAt: '_fecha_creacion',
        updatedAt: '_fecha_modificacion',
        tableName: 'persona',
    });

    persona.associate = (models) => {
        persona.belongsTo(models.parametro, {
            as: 'tipo_documento_identidad',
            foreignKey: { name: 'tipo_documento', unique: 'uniqueSelectedItem' },
            targetKey: 'codigo'
        });
    };

    return persona;
};
