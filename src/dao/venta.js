const moment = require('moment');
const Sequelize = require('sequelize');
const queryProcessor = require('../lib/queryProcessor');
const config = require('../config/config')();
const Op = Sequelize.Op;

module.exports = (app) => {
    const models = app.db.models;

    async function get(query, audit, t) {
        const options = queryProcessor(query, {}, undefined, t);
        if (options.where && options.where[Op.and] && options.where[Op.and].find(e => e.tipo_emision == 2)) {
            options.where[Op.and].push({
                cafc: {
                    [Op.ne]: ''
                }
            });
        } else if (options.where && options.where[Op.and] && options.where[Op.and].find(e => e.tipo_emision == 1)) {
            let i = options.where[Op.and].findIndex(e => e.tipo_emision == 1);
            options.where[Op.and][i] = {
                cafc: ''
            };
        }
        if (options.where) {
            if (options.where[Op.and]) {
                options.where[Op.and].push(Sequelize.literal(`"venta"."fid_punto_venta" IN(SELECT id_punto_venta FROM punto_venta p, sucursal s WHERE p.fid_sucursal = s.id_sucursal AND s.fid_contribuyente = ${audit.id_contribuyente})`));
            } else {
                options.where[Op.and] = [Sequelize.literal(`"venta"."fid_punto_venta" IN(SELECT id_punto_venta FROM punto_venta p, sucursal s WHERE p.fid_sucursal = s.id_sucursal AND s.fid_contribuyente = ${audit.id_contribuyente})`)];
            }
        } else {
            options.where = {
                [Op.and]: [Sequelize.literal(`"venta"."fid_punto_venta" IN(SELECT id_punto_venta FROM punto_venta p, sucursal s WHERE p.fid_sucursal = s.id_sucursal AND s.fid_contribuyente = ${audit.id_contribuyente})`)]
            }
        }
        options.order = [['id_venta', 'DESC']];
        options.include = [
            {
                model: models.deposito,
                as: 'depositos'
            }
        ];
options.logging = console.log;
        const ventas = await models.venta.findAll(options);
        return ventas;
    }

    async function getTotal(query, audit, t) {
        const options = queryProcessor(query, {}, undefined, t);
        if (options.where && options.where[Op.and] && options.where[Op.and].find(e => e.tipo_emision == 2)) {
            options.where[Op.and].push({
                cafc: {
                    [Op.ne]: ''
                }
            });
        } else if (options.where && options.where[Op.and] && options.where[Op.and].find(e => e.tipo_emision == 1)) {
            let i = options.where[Op.and].findIndex(e => e.tipo_emision == 1);
            options.where[Op.and][i] = {
                cafc: ''
            };
        }
        delete options['limit'];
        delete options['offset'];
        options.attributes = [[Sequelize.fn('COUNT', Sequelize.col('id_venta')), 'count']];
        const ventas = await models.venta.findOne(options);
        return ventas.toJSON().count;
    }

    async function getId(id, codigoMotivo, t) {
        const annulFactura = await models.venta.findOne({
            attributes: [
                [Sequelize.literal('"punto_venta->sucursal->contribuyente"."nombre"'), 'contribuyente'],
                [Sequelize.literal('"punto_venta->sucursal->contribuyente"."codigo_ambiente"'), 'codigoAmbiente'],
                [Sequelize.literal('"esquema".codigo'), 'codigoDocumentoSector'],
                ['tipo_emision', 'codigoEmision'],
                [Sequelize.literal('"punto_venta->sucursal->contribuyente"."codigo_modalidad"'), 'codigoModalidad'],
                [Sequelize.literal(`'${config.impuestos.codigoSistema}'`), 'codigoSistema'],
                [Sequelize.literal('"punto_venta->sucursal"."codigo"'), 'codigoSucursal'],
                [Sequelize.literal('"punto_venta"."codigo"'), 'codigoPuntoVenta'],
                'cufd',
                [Sequelize.literal('"punto_venta->cuist"."codigo"'), 'cuis'],
                [Sequelize.literal('"punto_venta->sucursal->contribuyente"."nit"'), 'nit'],
                [Sequelize.literal('"esquema"."tipo_factura"'), 'tipoFacturaDocumento'],
                [Sequelize.literal(codigoMotivo), 'codigoMotivo'],
                'cuf',
                [Sequelize.literal('"punto_venta->sucursal"."direccion"'), 'direccion'],
                'tipo_emision',
                'datos',
                'estado',
                'fid_punto_venta',
                '_usuario_creacion',
                [Sequelize.literal(`jsonb_build_object('codigo', "punto_venta->cufdt"."codigo", 'codigoControl', "punto_venta->cufdt"."codigo_control")`), 'cufdt']
            ],
            include: [
                {
                    attributes: [],
                    model: models.punto_venta,
                    as: 'punto_venta',
                    include: [
                        {
                            attributes: [],
                            model: models.sucursal,
                            as: 'sucursal',
                            include: [
                                {
                                    attributes: [],
                                    model: models.contribuyente,
                                    as: 'contribuyente'
                                }
                            ]
                        }, {
                            attributes: [],
                            model: models.cuis,
                            as: 'cuist',
                            required: false,
                            where: {
                                estado: 'ACTIVO'
                            }
                        }, {
                            attributes: [],
                            model: models.cufd,
                            as: 'cufdt',
                            required: false,
                            where: {
                                estado: 'ACTIVO'
                            }
                        }
                    ]
                }, {
                    attributes: [
                        'id_detalle',
                        ['codigo', 'codigoProducto'],
                        'cantidad',
                        [Sequelize.literal('"detalle->item->unidad"."descripcion"'), 'unidadMedida'],
                        [Sequelize.literal('"detalle->item"."descripcion"'), 'descripcionItem'],
                        'descripcion',
                        ['numero_imei', 'numeroImei'],
                        ['numero_serie', 'numeroSerie'],
                        ['precio_unitario', 'precioUnitario'],
                        ['monto_descuento', 'montoDescuento'],
                        ['sub_total', 'subTotal']
                    ],
                    model: models.detalle,
                    as: 'detalle',
                    include: [
                        {
                            attributes: [],
                            model: models.item,
                            as: 'item',
                            include: [
                                {
                                    attributes: [],
                                    model: models.catalogo,
                                    as: 'unidad',
                                    required: false,
                                    where: Sequelize.literal(`"detalle->item->unidad"."agrupador" = 'UNIDAD MEDIDA' AND "detalle->item->unidad"."fid_contribuyente" = "punto_venta->sucursal"."fid_contribuyente"`)
                                }
                            ]
                        }
                    ]
                }, {
                    attributes: [],
                    model: models.esquema,
                    as: 'esquema'
                }
            ],
            where: /^\d+$/.test(id) ? {
                id_venta: parseInt(id)
            } : {
                cuf: id
            },
            transaction: t,
            lock: t ? {
                level: t.LOCK.UPDATE,
                of: models.venta
            } : undefined
        });
        if (annulFactura) {
            return annulFactura.toJSON();
        } else {
            throw new Error('No se encontró una factura solicitada.');
        }
    }

    async function getCuf(cuf, t) {
        const factura = await models.venta.findOne({
            attributes: ['id_venta', 'cuf', 'tipo_emision', 'datos', 'factura', 'estado'],
            include: [
                {
                    attributes: [],
                    model: models.punto_venta,
                    as: 'punto_venta',
                    include: [
                        {
                            attributes: [],
                            model: models.sucursal,
                            as: 'sucursal'
                        }
                    ]
                }, {
                    attributes: [
                        'id_detalle',
                        ['codigo', 'codigoProducto'],
                        'cantidad',
                        [Sequelize.literal('"detalle->item->unidad"."descripcion"'), 'unidadMedida'],
                        [Sequelize.literal('"detalle->item"."descripcion"'), 'descripcionItem'],
                        'descripcion',
                        ['numero_imei', 'numeroImei'],
                        ['numero_serie', 'numeroSerie'],
                        ['precio_unitario', 'precioUnitario'],
                        ['monto_descuento', 'montoDescuento'],
                        ['sub_total', 'subTotal']
                    ],
                    model: models.detalle,
                    as: 'detalle',
                    include: [
                        {
                            attributes: [],
                            model: models.item,
                            as: 'item',
                            include: [
                                {
                                    attributes: [],
                                    model: models.catalogo,
                                    as: 'unidad',
                                    required: false,
                                    where: Sequelize.literal(`"detalle->item->unidad"."agrupador" = 'UNIDAD MEDIDA' AND "detalle->item->unidad"."fid_contribuyente" = "punto_venta->sucursal"."fid_contribuyente"`)
                                }
                            ]
                        }
                    ]
                }, {
                    attributes: ['numero', 'fecha'],
                    model: models.deposito,
                    as: 'depositos'
                }
            ],
            where: /^\d+$/.test(cuf) ? {
                id_venta: parseInt(cuf)
            } : {
                cuf: cuf
            },
            transaction: t
        });
        if (factura) {
            return factura.toJSON();
        } else {
            throw new Error('No se encontró una factura solicitada.');
        }
    }

    async function getByNro(nro, cafc, t) {
        const factura = await models.venta.findAll({
            attributes: [
                [Sequelize.literal('"punto_venta->sucursal->contribuyente"."nombre"'), 'contribuyente'],
                [Sequelize.literal('"punto_venta->sucursal->contribuyente"."codigo_ambiente"'), 'codigoAmbiente'],
                [Sequelize.literal('"esquema".codigo'), 'codigoDocumentoSector'],
                ['tipo_emision', 'codigoEmision'],
                [Sequelize.literal('"punto_venta->sucursal->contribuyente"."codigo_modalidad"'), 'codigoModalidad'],
                [Sequelize.literal(`'${config.impuestos.codigoSistema}'`), 'codigoSistema'],
                [Sequelize.literal('"punto_venta->sucursal"."codigo"'), 'codigoSucursal'],
                [Sequelize.literal('"punto_venta"."codigo"'), 'codigoPuntoVenta'],
                'cufd',
                [Sequelize.literal('"punto_venta->cuist"."codigo"'), 'cuis'],
                [Sequelize.literal('"punto_venta->sucursal->contribuyente"."nit"'), 'nit'],
                [Sequelize.literal('"esquema"."tipo_factura"'), 'tipoFacturaDocumento'],
                'cuf',
                [Sequelize.literal('"punto_venta->sucursal"."direccion"'), 'direccion'],
                'tipo_emision',
                'datos',
                'estado',
                'fid_punto_venta',
                '_usuario_creacion',
                [Sequelize.literal(`jsonb_build_object('codigo', "punto_venta->cufdt"."codigo", 'codigoControl', "punto_venta->cufdt"."codigo_control")`), 'cufdt']
            ],
            include: [
                {
                    attributes: [],
                    model: models.punto_venta,
                    as: 'punto_venta',
                    include: [
                        {
                            attributes: [],
                            model: models.sucursal,
                            as: 'sucursal',
                            include: [
                                {
                                    attributes: [],
                                    model: models.contribuyente,
                                    as: 'contribuyente'
                                }
                            ]
                        }, {
                            attributes: [],
                            model: models.cuis,
                            as: 'cuist',
                            required: false,
                            where: {
                                estado: 'ACTIVO'
                            }
                        }, {
                            attributes: [],
                            model: models.cufd,
                            as: 'cufdt',
                            required: false,
                            where: {
                                estado: 'ACTIVO'
                            }
                        }
                    ]
                }, {
                    attributes: [
                        'id_detalle',
                        ['codigo', 'codigoProducto'],
                        'cantidad',
                        [Sequelize.literal('"detalle->item->unidad"."descripcion"'), 'unidadMedida'],
                        [Sequelize.literal('"detalle->item"."descripcion"'), 'descripcionItem'],
                        'descripcion',
                        ['numero_imei', 'numeroImei'],
                        ['numero_serie', 'numeroSerie'],
                        ['precio_unitario', 'precioUnitario'],
                        ['monto_descuento', 'montoDescuento'],
                        ['sub_total', 'subTotal']
                    ],
                    model: models.detalle,
                    as: 'detalle',
                    include: [
                        {
                            attributes: [],
                            model: models.item,
                            as: 'item',
                            include: [
                                {
                                    attributes: [],
                                    model: models.catalogo,
                                    as: 'unidad',
                                    required: false,
                                    where: Sequelize.literal(`"detalle->item->unidad"."agrupador" = 'UNIDAD MEDIDA' AND "detalle->item->unidad"."fid_contribuyente" = "punto_venta->sucursal"."fid_contribuyente"`)
                                }
                            ]
                        }
                    ]
                }, {
                    attributes: [],
                    model: models.esquema,
                    as: 'esquema'
                }
            ],
            where: {
                numero_factura: nro,
                cafc: cafc
            },
            transaction: t
        });
        if (factura) {
            if (factura.length) {
                return factura[0].toJSON();
            } else {
                return null;
            }
        } else {
            throw new Error('No se encontró una factura solicitada.');
        }
    }

    async function getNro(nro, fecha, t) {
        const factura = await models.venta.findOne({
            attributes: ['id_venta', 'cuf', 'tipo_emision', 'datos', 'factura', 'estado'],
            where: {
                numero_factura: nro,
                _fecha_creacion: {
                    [Op.between]: [moment(fecha).toDate(), moment(fecha).add(1, 'days').toDate()]
                }
            },
            transaction: t
        });
        if (factura) {
            return factura.toJSON();
        } else {
            throw new Error('No se encontró una factura solicitada.');
        }
    }

    async function getPendiente(idPuntoVenta, t) {
        await models.venta.findOne({
            attributes: [[Sequelize.literal('count(*) = 0'), 'pendiente']],
            where: {
                fid_punto_venta: idPuntoVenta,
                estado: 'PENDIENTE'
            },
            transaction: t
        }).then(res => res.toJSON().pendiente);
    }

    async function post(datos, t) {
        const id = await app.db.sequelize.query(`SELECT venta(:datos)`, {
            type: Sequelize.QueryTypes.SELECT,
            replacements: {
                datos: JSON.stringify(datos)
            },
            transaction: t
        }).then(res => res[0].venta);
        return id;
    }

    async function getDatos(id, t) {
        const factura = await models.venta.findOne({
            attributes: [
                [Sequelize.literal('"punto_venta->sucursal->contribuyente"."nit"'), 'nitEmisor'],
                [Sequelize.literal('"punto_venta->sucursal->contribuyente"."nombre"'), 'razonSocialEmisor'],
                [Sequelize.literal('"punto_venta->sucursal->contribuyente"."codigo_modalidad"'), 'codigoModalidad'],
                [Sequelize.literal('"punto_venta->sucursal"."municipio"'), 'municipio'],
                [Sequelize.literal('"punto_venta->sucursal"."telefono"'), 'telefono'],
                ['numero_factura', 'numeroFactura'],
                [Sequelize.literal('"punto_venta->cufdt"."codigo"'), 'cufd'],
                [Sequelize.literal('"punto_venta->cufdt"."codigo_control"'), 'codigoControl'],
                [Sequelize.literal('"punto_venta->cufdt"."fecha"'), 'fechaCufd'],
                [Sequelize.literal('"punto_venta->sucursal"."codigo"'), 'codigoSucursal'],
                [Sequelize.literal('"punto_venta->sucursal"."direccion"'), 'direccion'],
                [Sequelize.literal('"punto_venta"."codigo"'), 'codigoPuntoVenta'],
                ['nombre_razon_social', 'nombreRazonSocial'],
                [Sequelize.literal('"venta"."datos"->>\'codigoTipoDocumentoIdentidad\''), 'codigoTipoDocumentoIdentidad'],
                ['numero_documento', 'numeroDocumento'],
                [Sequelize.literal('"venta"."datos"->>\'complemento\''), 'complemento'],
                ['fid_cliente', 'codigoCliente'],
                [Sequelize.literal('"venta"."datos"->>\'codigoMetodoPago\''), 'codigoMetodoPago'],
                [Sequelize.literal('"venta"."datos"->>\'numeroTarjeta\''), 'numeroTarjeta'],
                ['monto', 'montoTotal'],
                [Sequelize.literal('"venta"."datos"->>\'codigoMoneda\''), 'codigoMoneda'],
                [Sequelize.literal('"venta"."datos"->>\'tipoCambio\''), 'tipoCambio'],
                [Sequelize.literal('("venta"."monto" / ("venta"."datos"->>\'tipoCambio\')::Numeric(12, 2))::Numeric(12, 2)'), 'montoTotalMoneda'],
                [Sequelize.literal('"venta"."datos"->>\'descuentoAdicional\''), 'descuentoAdicional'],
                [Sequelize.literal('"venta"."datos"->>\'montoGiftCard\''), 'montoGiftCard'],
                [Sequelize.literal('"venta"."datos"->>\'codigoExcepcion\''), 'codigoExcepcion'],
                'fid_punto_venta',
                ['_usuario_creacion', 'usuario'],
                ['codigo_documento_sector', 'codigoDocumentoSector'],
                [Sequelize.literal('"punto_venta->cuist"."codigo"'), 'cuis'],
                [Sequelize.literal('"punto_venta->evento_significativo"."codigo"'), 'eventoSignificativo'],
                [Sequelize.literal('"punto_venta->evento_significativo"."estado"'), 'estadoEventoSignificativo'],
                [Sequelize.literal('"punto_venta->evento_significativo"."cafc"'), 'cafc'],
                [Sequelize.literal('"punto_venta->evento_significativo->cufd_evento"."codigo"'), 'cufdEventoSignificativo'],
                [Sequelize.literal('"punto_venta->evento_significativo->cufd_evento"."codigo_control"'), 'codigoControlEventoSignificativo'],
                [Sequelize.literal('"venta"."datos"->>\'tipoEmision\''), 'tipoEmision']
            ],
            include: [
                {
                    attributes: ['id_punto_venta'],
                    model: models.punto_venta,
                    as: 'punto_venta',
                    required: true,
                    include: [
                        {
                            attributes: [],
                            model: models.sucursal,
                            as: 'sucursal',
                            required: true,
                            include: [
                                {
                                    attributes: [],
                                    model: models.contribuyente,
                                    as: 'contribuyente',
                                    required: true
                                }
                            ]
                        }, {
                            attributes: [],
                            model: models.cufd,
                            as: 'cufdt',
                            required: false,
                            where: {
                                estado: 'ACTIVO'
                            }
                        }, {
                            attributes: [],
                            model: models.cuis,
                            as: 'cuist',
                            required: false,
                            where: {
                                estado: 'ACTIVO'
                            }
                        }, {
                            attributes: ['id_evento_significativo', 'fecha_inicio', 'fecha_fin'],
                            model: models.evento_significativo,
                            as: 'evento_significativo',
                            required: false,
                            include: [
                                {
                                    attributes: [],
                                    model: models.cufd,
                                    as: 'cufd_evento'
                                }
                            ],
                            where: {
                                estado: {
                                    [Op.in]: ['ACTIVO', 'CERRANDO']
                                },
                                [Op.or]: [
                                    {
                                        [Op.and]: [{
                                            cafc: null
                                        }, Sequelize.literal(`"venta"."cafc" = ''`)]
                                    }, {
                                        [Op.and]: [{
                                            cafc: {
                                                [Op.ne]: null
                                            }
                                        }, Sequelize.literal(`"venta"."cafc" <> ''`)]
                                    }
                                ]
                            }
                        }
                    ]
                }, {
                    attributes: [
                        'tipo_factura',
                        [Sequelize.literal('CASE "punto_venta->sucursal->contribuyente"."codigo_modalidad" WHEN 1 THEN archivo ELSE archivo2 END'), 'archivo'],
                        [Sequelize.literal('CASE "punto_venta->sucursal->contribuyente"."codigo_modalidad" WHEN 1 THEN objeto ELSE objeto2 END'), 'objeto']
                    ],
                    model: models.esquema,
                    as: 'esquema',
                    required: true
                }, {
                    attributes: [
                        [Sequelize.literal('"detalle->item"."actividad_economica"'), 'actividadEconomica'],
                        [Sequelize.literal('"detalle->item"."codigo_sin"'), 'codigoProductoSin'],
                        [Sequelize.literal('"detalle->item"."codigo"'), 'codigoProducto'],
                        [Sequelize.literal('"detalle->item"."descripcion" || \' (\' || "detalle"."descripcion" || \')\''), 'descripcion'],
                        ['numero_imei', 'numeroImei'],
                        ['numero_serie', 'numeroSerie'],
                        'cantidad',
                        ['unidad_medida', 'unidadMedida'],
                        ['precio_unitario', 'precioUnitario'],
                        ['monto_descuento', 'montoDescuento'],
                        ['sub_total', 'subTotal']
                    ],
                    model: models.detalle,
                    as: 'detalle',
                    required: true,
                    include: [
                        {
                            attributes: [],
                            model: models.item,
                            as: 'item',
                            required:true
                        }
                    ]
                }
            ],
            where: {
                id_venta: id
            },
            transaction: t
        });
        if (factura) {
            return factura.toJSON();
        } else {
            throw new Error('No se encontró la factura solicitada.');
        }
    }

    async function put(id, tipoEmision, archivo, facturaXML, factura, t) {
        const registroVenta = await models.venta.findByPk(id, {
            transaction: t
        });
        registroVenta.fecha_emision = facturaXML[archivo].cabecera.fechaEmision;
        registroVenta.codigo_tipo_documento = facturaXML[archivo].cabecera.codigoTipoDocumentoIdentidad;
        registroVenta.tipo_emision = tipoEmision;
        registroVenta.codigo_metodo_pago = facturaXML[archivo].cabecera.codigoMetodoPago;
        registroVenta.cafc = facturaXML[archivo].cabecera.cafc;
        registroVenta.cuf = facturaXML[archivo].cabecera.cuf;
        registroVenta.cufd = facturaXML[archivo].cabecera.cufd;
        registroVenta.datos = facturaXML;
        registroVenta.factura = factura;
        if (registroVenta.estado == 'RECHAZADO') {
            registroVenta.numero_documento = facturaXML[archivo].cabecera.numeroDocumento;
            registroVenta.nombre_razon_social = facturaXML[archivo].cabecera.nombreRazonSocial;
            registroVenta.estado = 'PENDIENTE';
        }
        return await registroVenta.save({
            transaction: t
        });
    }

    async function setCodigoAnulacion(id, codigoAnulacion, motivo, usuario, t) {
        const factura = await models.venta.update({
            codigo_anulacion: codigoAnulacion,
            motivo: motivo,
            estado: 'ANULADO',
            email_estado: 'PENDIENTE',
            notificacion: 'PENDIENTE',
            _usuario_modificacion: usuario
        }, {
            where: /^\d+$/.test(id) ? {
                id_venta: parseInt(id)
            } : {
                cuf: id
            },
            returning: true,
            transaction: t
        });
        if (factura[0] == 1) {
            return factura[1][0].toJSON();
        } else {
            throw new Error('Error inesperado.');
        }
    }

    async function getBase(id, cafc, t) {
        return await app.db.sequelize.query(`SELECT jsonb_build_object('1', coalesce(jsonb_agg(v), '[]'::JsonB)) archivos
            FROM (SELECT jsonb_build_object('nro', row_number() OVER (ORDER BY id_venta) - 1, 'id_venta', id_venta) v
                FROM evento_significativo e
                INNER JOIN cufd c ON e.fid_cufd_evento = c.id_cufd
                INNER JOIN venta v ON v.tipo_emision = 2 AND v.cafc = :cafc AND v.estado <> 'PENDIENTE' AND c.codigo = v.cufd AND (to_timestamp(v.fecha_emision, 'YYYY-MM-DD''THH24:MI:SS.MS') >= e.fecha_inicio OR to_timestamp(v.fecha_emision, 'YYYY-MM-DD''THH24:MI:SS.MS') <= e.fecha_fin)
                WHERE e.id_evento_significativo = :id) v`, {
            replacements: {
                cafc: cafc,
                id: id
            },
            transaction: t
        }).then(result => result[0][0].archivos);
    }

    async function getPendientes(estado, cufd, tipoEmision, cafc, t) {
        const where = {
            estado: estado
        };
        if (cufd) {
            where.cufd = cufd;
        }
        if (tipoEmision) {
            where.tipo_emision = tipoEmision;
        }
        if (cafc != undefined) {
            where.cafc = cafc;
        }
        return await models.venta.findAll({
            attributes: ['id_venta', 'tipo_emision', 'datos', 'factura', 'cuf', cufd ? 'cufd' : [Sequelize.literal('"punto_venta->cufdt"."codigo"'), 'cufd'], 'codigo_documento_sector', 'codigo_recepcion'],
            include: [
                {
                    attributes: [
                        ['codigo', 'codigoPuntoVenta'],
                        [Sequelize.literal('"punto_venta->sucursal"."codigo"'), 'codigoSucursal'],
                        [Sequelize.literal('"punto_venta->sucursal->contribuyente"."codigo_ambiente"'), 'codigoAmbiente'],
                        [Sequelize.literal('"punto_venta->sucursal->contribuyente"."codigo_modalidad"'), 'codigoModalidad'],
                        [Sequelize.literal(`'${config.impuestos.codigoSistema}'`), 'codigoSistema'],
                        [Sequelize.literal('"punto_venta->sucursal->contribuyente"."nit"'), 'nit'],
                        [Sequelize.literal('"punto_venta->cuist"."codigo"'), 'cuis']
                    ],
                    model: models.punto_venta,
                    as: 'punto_venta',
                    required: true,
                    include: [
                        {
                            attributes: [],
                            model: models.sucursal,
                            as: 'sucursal',
                            required: true,
                            include: [
                                {
                                    attributes: [],
                                    model: models.contribuyente,
                                    as: 'contribuyente',
                                    required: true
                                }
                            ]
                        }, {
                            attributes: [],
                            model: models.cufd,
                            as: 'cufdt',
                            required: false,
                            where: {
                                estado: 'ACTIVO'
                            }
                        }, {
                            attributes: [],
                            model: models.cuis,
                            as: 'cuist',
                            required: false,
                            where: {
                                estado: 'ACTIVO'
                            }
                        }
                    ]
                }, {
                    attributes: ['tipo_factura'],
                    model: models.esquema,
                    as: 'esquema'
                }
            ],
            where: where,
            order: tipoEmision ? [['id_venta', 'ASC']] : [[Sequelize.literal('codigo_documento_sector::Int')], ['id_venta', 'ASC']],
            transaction: t
        }).then(res => res.map(venta => venta.toJSON()));
    }

    async function getRango(estado, cufd, t) {
        return await models.venta.findOne({
            attributes: [
                [Sequelize.fn('MIN', Sequelize.col('fecha_emision')), 'min'],
                [Sequelize.fn('MAX', Sequelize.col('fecha_emision')), 'max']
            ],
            where: {
                estado: estado,
                cufd: cufd
            },
            transaction: t
        }).then(res => res ? res.toJSON() : res);
    }

    async function getCodigoRecepcion(t) {
        return await app.db.sequelize.query(`SELECT c.codigo_ambiente "codigoAmbiente",
                v.codigo_documento_sector "codigoDocumentoSector",
                v.tipo_emision "codigoEmision",
                c.codigo_modalidad "codigoModalidad",
                p.codigo "codigoPuntoVenta",
                '${app.config.impuestos.codigoSistema}' "codigoSistema",
                s.codigo "codigoSucursal",
                c2.codigo cufd,
                c1.codigo cuis,
                c.nit,
                e.tipo_factura "tipoFacturaDocumento",
                v.codigo_recepcion "codigoRecepcion"
            FROM venta v
            INNER JOIN esquema e ON(v.codigo_documento_sector = e.codigo)
            INNER JOIN punto_venta p ON(v.fid_punto_venta = p.id_punto_venta)
            INNER JOIN cuis c1 ON(c1.fid_punto_venta = p.id_punto_venta AND c1.estado = 'ACTIVO')
            INNER JOIN sucursal s ON(p.fid_sucursal = s.id_sucursal)
            INNER JOIN cufd c2 ON(c2.fid_punto_venta = p.id_punto_venta AND c2.estado = 'ACTIVO')
            INNER JOIN contribuyente c ON(c.id_contribuyente = s.fid_contribuyente)
            WHERE v.tipo_emision = 2
            AND v.estado = 'ENVIADO'
            GROUP BY c.codigo_ambiente, v.codigo_documento_sector, v.tipo_emision, c.codigo_modalidad, c2.codigo, v.codigo_recepcion, p.codigo, s.codigo, c1.codigo, c.nit, e.tipo_factura`, {
            transaction: t
        }).then(result => result[0]);
    }

    async function setCodigoRecepcion(idVenta, codigoRecepcion, t) {
        return await models.venta.update({
            codigo_recepcion: codigoRecepcion,
            estado: 'ENVIADO'
        }, {
            where: {
                id_venta: idVenta
            },
            transaction: t
        });
    }

    async function setObservacion(idVenta, observacion, t) {
        return await models.venta.update({
            observacion: observacion,
            estado: 'RECHAZADO'
        }, {
            where: {
                id_venta: idVenta
            },
            transaction: t
        });
    }

    async function setValidado(idVenta, t) {
        return await models.venta.update({
            estado: 'VALIDADO'
        }, {
            where: {
                id_venta: idVenta
            },
            transaction: t
        });
    }

    async function setValidadoPaquete(codigoRecepcion, t) {
        return await models.venta.update({
            estado: 'VALIDADO'
        }, {
            where: {
                codigo_recepcion: codigoRecepcion,
                estado: 'ENVIADO'
            },
            transaction: t
        });
    }

    async function getCorreos(t) {
        return await models.venta.findAll({
            attributes: ['id_venta', 'tipo_emision', 'cuf', 'estado', 'email'],
            where: {
                [Op.or]: [
                    {
                        estado: 'VALIDADO'
                    }, {
                        [Op.and]: [
                            {
                                estado: 'PENDIENTE'
                            }, {
                                tipo_emision: 2
                            }
                        ]
                    }, {
                        estado: 'ANULADO'
                    }
                ],
                email: {
                    [Op.ne]: null
                },
                email_estado: 'PENDIENTE'
            },
            transaction: t
        });
    }

    async function setEstadoCorreo(id, estado, t) {
        const factura = await models.venta.update({
            email_estado: estado
        }, {
            where: {
                id_venta: id
            },
            transaction: t
        });
    }

    async function getC21(t) {
        return await app.db.sequelize.query(`WITH v AS(SELECT v.id_venta,
                CASE v.estado WHEN 'VALIDADO' THEN 'Facturado' ELSE 'Anulado' END estado,
                'Electronica'::Text tipo_facturacion,
                CASE MIN(d.codigo) WHEN '010001' THEN 'Dominios' ELSE 'Certificado' END servicio,
                v.numero_factura nro_factura,
                v.nombre_razon_social nombre,
                SUBSTRING(v.fecha_emision, 1, 10) fecha_factura,
                'DEPOSITO'::Text tipo_pago,
                monto
            FROM venta v, detalle d
            WHERE v.id_venta = d.fid_venta
            AND estado IN('VALIDADO', 'ANULADO')
            AND notificacion = 'PENDIENTE'
            GROUP BY v.id_venta
            ORDER BY id_venta)
            SELECT id_venta, estado, tipo_facturacion, servicio, STRING_AGG(d.numero::Text, ',') nro_deposito, MIN(to_char(d.fecha, 'YYYY-MM-DD')) fecha_deposito, nro_factura, nombre, fecha_factura, tipo_pago, v.monto, jsonb_agg(jsonb_build_object('nro_deposito', d.numero::Text, 'fecha_deposito', to_char(d.fecha, 'YYYY-MM-DD'))) FILTER (WHERE d.numero IS NOT NULL) depositos
            FROM v
            LEFT JOIN deposito d ON v.id_venta = d.fid_venta
            GROUP BY id_venta, estado, tipo_facturacion, servicio, nro_factura, nombre, fecha_factura, tipo_pago, v.monto
            ORDER BY id_venta`, {
            type: Sequelize.QueryTypes.SELECT,
            transaction: t
        });
    }

    async function setEstadoC21(id, t) {
        const factura = await models.venta.update({
            notificacion: 'ENVIADO'
        }, {
            where: {
                id_venta: id
            },
            transaction: t
        });
    }

    async function total(buscarEstado, desde, hasta, limit, t) {
        return await app.db.sequelize.query(`SELECT fecha_emision,
            codigo_documento_sector tipo_factura,
            numero_factura,
            numero_documento,
            nombre_razon_social,
            monto,
            estado,
            SUM(CASE substring(d.codigo, 1, 2) WHEN '01' THEN d.sub_total ELSE NULL END) nic,
            SUM(CASE substring(d.codigo, 1, 2) WHEN '02' THEN d.sub_total ELSE NULL END) certificado
        FROM venta v, detalle d
        WHERE v.id_venta = d.fid_venta
        AND v.estado = :estado
        AND v.fecha_emision BETWEEN :desde AND :hasta
        GROUP BY v.id_venta
        ORDER BY id_venta
        ${limit ? 'LIMIT :limit' : ''}`, {
            type: Sequelize.QueryTypes.SELECT,
            replacements: {
                estado: buscarEstado,
                desde: desde,
                hasta: hasta,
                limit: limit
            },
            transaction: t
        });
    }

    async function mensual(desde, hasta, t) {
        return await app.db.sequelize.query(`SELECT substring(v.fecha_emision, 1, 7) mes,
            SUM(CASE substring(d.codigo, 1, 2) WHEN '01' THEN d.sub_total ELSE NULL END) nic,
            SUM(CASE substring(d.codigo, 1, 2) WHEN '02' THEN d.sub_total ELSE NULL END) certificado,
            SUM(sub_total) total
        FROM venta v, detalle d
        WHERE v.id_venta = d.fid_venta
        AND v.estado = 'VALIDADO'
        AND v.fecha_emision BETWEEN :desde AND :hasta
        GROUP BY mes`, {
            type: Sequelize.QueryTypes.SELECT,
            replacements: {
                desde: desde,
                hasta: hasta
            },
            transaction: t
        });
    }

    async function deposito(id, depositos, t) {
        for (let i = 0; i < depositos.length; i++) {
            if (!depositos[i].numero || !/^\d+$/.test(depositos[i].numero)) {
                throw new Error(`El número de depósito es inválido.`);
            }
            if (!moment(depositos[i].fecha, 'YYYY/MM/DD').isValid()) {
                throw new Error(`La fecha ${depositos[i].fecha} del depósito ${depositos[i].numero} es inválida.`);
            }
            const dep = await extracto.deposito(depositos[i].numero, depositos[i].fecha);
            if (dep.extractos.length == 0) {
                throw new Error(`No se encontró el depósito ${depositos[i].numero} - ${depositos[i].fecha}.`);
            }
            if (dep.extractos.length > 1) {
                throw new Error(`Referencia ambigua del depósito ${depositos[i].numero}.`);
            }
            depositos[i].id = dep.extractos[0].id;
            depositos[i].monto = dep.extractos[0].monto;
            depositos[i].facturado = 0;
            if (dep.extractos[0].facturas && dep.extractos[0].facturas.length) {
                for (let j = 0; j < dep.extractos[0].facturas.length; j++) {
                    if (dep.extractos[0].facturas[j].estado == 'Facturado' && new Date(dep.extractos[0].facturas[j].fecha_factura).getTime() < new Date('2021-12-01').getTime()) {
                        depositos[i].facturado += parseFloat(dep.extractos[0].facturas[j].monto);
                    }
                }
            }
            depositos[i].facturado = depositos[i].facturado.toFixed(2);
            depositos[i]._usuario_creacion = depositos.audit_usuario.usuario;
        }
        await app.db.sequelize.query(`SELECT deposito(:id, :depositos, :usuario)`, {
            type: Sequelize.QueryTypes.SELECT,
            replacements: {
                id: id,
                depositos: JSON.stringify(depositos),
                usuario: depositos.audit_usuario.usuario
            },
            transaction: t
        }).then(res => res[0].venta);
        return id;
    }

    return {
        get,
        getTotal,
        getId,
        getCuf,
        getByNro,
        getNro,
        getPendiente,
        post,
        getDatos,
        put,
        setCodigoAnulacion,
        getBase,
        getPendientes,
        getRango,
        setCodigoRecepcion,
        getCodigoRecepcion,
        setObservacion,
        setValidado,
        setValidadoPaquete,
        getCorreos,
        setEstadoCorreo,
        getC21,
        setEstadoC21,
        total,
        mensual,
        deposito
    };
};
