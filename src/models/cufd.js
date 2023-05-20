/**
 * Módulo para cufd
 *
 * @module
 *
 **/

module.exports = (sequelize, DataType) => {
    const cufd = sequelize.define('cufd', {
        id_cufd: {
            type: DataType.INTEGER,
            field: 'id_cufd',
            primaryKey: true,
            autoIncrement: true
        },
        codigo: {
            type: DataType.STRING(100),
            field: 'codigo',
            allowNull: false
        },
        codigo_control: {
            type: DataType.STRING(50),
            field: 'codigo_control',
            allowNull: false
        },
        fecha: {
            type: DataType.DATEONLY,
            field: 'fecha',
            allowNull: false
        },
        fecha_vigencia: {
            type: DataType.DATE,
            field: 'fecha_vigencia',
            allowNull: false
        },
        estado: {
            type: DataType.STRING(30),
            field: 'estado',
            allowNull: false,
            defaultValue: 'ACTIVO'
        },
        fid_punto_venta: {
            type: DataType.INTEGER,
            field: 'fid_punto_venta',
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
        tableName: 'cufd',
    });

    cufd.associate = (models) => {
        cufd.belongsTo(models.punto_venta, {
            as: 'punto_venta',
            foreignKey: { name: 'fid_punto_venta', type: DataType.INTEGER },
            targetKey: 'id_punto_venta'
        });
    };

    return cufd;
};

