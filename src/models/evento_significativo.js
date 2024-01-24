/**
 * Módulo para evento_significativo
 *
 * @module evento_significativo
 *
 **/

 module.exports = (sequelize, DataType) => {
    const evento_significativo = sequelize.define('evento_significativo', {
        id_evento_significativo: {
            type: DataType.INTEGER,
            field: 'id_evento_significativo',
            primaryKey: true,
            autoIncrement: true
        },
        codigo: {
            type: DataType.STRING(10),
            field: 'codigo',
            allowNull: false
        },
        descripcion: {
            type: DataType.STRING(250),
            field: 'descripcion',
            allowNull: false
        },
        codigo_recepcion: {
            type: DataType.STRING(50),
            field: 'codigo_recepcion',
            allowNull: true
        },
        fid_cufd_evento: {
            type: DataType.INTEGER,
            field: 'fid_cufd_evento',
            allowNull: false
        },
        fid_cufd: {
            type: DataType.INTEGER,
            field: 'fid_cufd',
            allowNull: true
        },
        cafc: {
            type: DataType.STRING(100),
            field: 'cafc',
            allowNull: true
        },
        fecha_inicio: {
            type: DataType.DATE,
            field: 'fecha_inicio',
            allowNull: false
        },
        fecha_fin: {
            type: DataType.DATE,
            field: 'fecha_fin',
            allowNull: true
        },
        archivos: {
            type: DataType.JSONB,
            field: 'archivos',
            allowNull: true
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
        manual: {
            type: DataType.BOOLEAN,
            field: 'manual',
            allowNull: false,
            defaultValue: false
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
        tableName: 'evento_significativo',
    });

    evento_significativo.associate = (models) => {
        evento_significativo.belongsTo(models.punto_venta, {
            as: 'punto_venta',
            foreignKey: { name: 'fid_punto_venta', type: DataType.INTEGER },
            targetKey: 'id_punto_venta'
        });
        evento_significativo.belongsTo(models.cufd, {
            as: 'cufd_evento',
            foreignKey: { name: 'fid_cufd_evento', type: DataType.INTEGER },
            targetKey: 'id_cufd'
        });
        evento_significativo.belongsTo(models.cufd, {
            as: 'cufd',
            foreignKey: { name: 'fid_cufd', type: DataType.INTEGER },
            targetKey: 'id_cufd'
        });
    };

    return evento_significativo;
};

