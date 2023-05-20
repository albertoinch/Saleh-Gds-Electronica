const moment = require('moment');
const { query } = require("express");
const reporte = require('../lib/reporte');

module.exports = (app) => {
    async function lista(req, res) {
        const normalized = {
            columns: [],
            length: req.query.limit,
            start: (parseInt(req.params['page']) - 1) * req.query.limit
        };
        if (!req.query.buscarTipoEmision) {
            req.query.buscarTipoEmision = 2;
        }
        if (req.query.buscarEstado && req.query.buscarEstado != '') {
            normalized.columns.push({
                data: 'estado',
                search: {
                    value: req.query.buscarEstado
                }
            });
        }
        if (req.query.buscarTipoEmision && req.query.buscarTipoEmision != '') {
            normalized.columns.push({
                data: 'tipo_emision',
                search: {
                    value: req.query.buscarTipoEmision
                }
            });
        }
        if (req.query.buscarNroF && req.query.buscarNroF != '') {
            normalized.columns.push({
                data: 'numero_factura',
                search: {
                    value: req.query.buscarNroF
                }
            });
        }
        if (req.query.buscarCliente && req.query.buscarCliente != '') {
            normalized.columns.push({
                data: 'nombre_razon_social',
                search: {
                    value: req.query.buscarCliente
                }
            });
        }
        if (req.query.buscarNit && req.query.buscarNit != '') {
            normalized.columns.push({
                data: 'numero_documento',
                search: {
                    value: req.query.buscarNit,
                    like: true
                }
            });
        }
        if (req.query.desde && req.query.desde != '') {
            if (moment(req.query.desde, 'YYYY-MM-DD').isValid()) {
            normalized.columns.push({
                data: '_fecha_creacion',
                search: {
                    value: moment(req.query.desde, 'YYYY-MM-DD').toDate(),
                    value2: moment(req.query.hasta, 'YYYY-MM-DD').toDate()
                }
            });
            }
        }
        if (req.query.posterior && req.query.posterior != '') {
            normalized.columns.push({
                data: 'codigo_metodo_pago',
                search: {
                    value: '6'
                }
            });
            normalized.columns.push({
                data: 'estado',
                search: {
                    value: 'VALIDADO'
                }
            });
        }
        const ventas = await app.dao.venta.get(normalized, req.body.audit_usuario);
        const total = await app.dao.venta.getTotal(normalized, req.body.audit_usuario);
        total.cantidad = ventas.length;
        res.status(200).json({
            finalizado: true,
            mensaje: 'Datos obtenidos',
            datos: ventas,
            paginacion: {
                totalRegistros: total,
                paginas: Math.ceil(total / req.query.limit),
                paginaActual: req.params['page'],
                cantidad: ventas.length
            }
        });
    }

    function sumar(arr, att) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][att]) {
                sum += parseFloat(arr[i][att]);
            }
        }
        return sum;
    }

    async function total(req, res) {
        const desde = moment(req.query.desde, 'YYYY-MM-DD');
        const hasta = moment(req.query.hasta, 'YYYY-MM-DD HH:mm:ss');
        if (desde.isValid() && hasta.isValid()) {
            const ventas = await app.dao.venta.total(req.query.buscarEstado, desde.format('YYYY-MM-DD'), hasta.format('YYYY-MM-DDTHH:mm:ss'), req.query.limit);
            res.status(200).json({
                finalizado: true,
                mensaje: 'Datos obtenidos',
                datos: ventas,
                total: sumar(ventas, 'monto').toFixed(2),
                nic: sumar(ventas, 'nic').toFixed(2),
                certificado: sumar(ventas, 'certificado').toFixed(2)
            });
        } else {
            res.status(400).json({
                finalizado: false,
                mensaje: 'Verifique rango de fechas.'
            });
        }
    }

    async function pdf(req, res) {
        const desde = moment(req.query.desde, 'YYYY-MM-DD');
        const hasta = moment(req.query.hasta, 'YYYY-MM-DD HH:mm:ss');
        if (desde.isValid() && hasta.isValid()) {
            const ventas = await app.dao.venta.total(req.query.buscarEstado, desde.format('YYYY-MM-DD'), hasta.format('YYYY-MM-DDTHH:mm:ss'));
            const params = {
                desde: desde.format('DD/MM/YYYY'),
                hasta: hasta.format('DD/MM/YYYY'),
                validado: req.query.buscarEstado == 'VALIDADO',
                datos: ventas,
                total: sumar(ventas, 'monto').toFixed(2),
                nic: sumar(ventas, 'nic').toFixed(2),
                certificado: sumar(ventas, 'certificado').toFixed(2)
            };
            const factura = new reporte('total');
            res.contentType('application/pdf');
            factura.pdf(params, {
                orientation: 'Portrait'
            }).pipe(res);
        } else {
            res.status(400).json({
                finalizado: false,
                mensaje: 'Verifique rango de fechas.'
            });
        }
    }

    async function mensual(req, res) {
        const desde = moment(req.query.desde, 'YYYY-MM-DD');
        const hasta = moment(req.query.hasta, 'YYYY-MM-DD HH:mm:ss');
        if (desde.isValid() && hasta.isValid()) {
            const ventas = await app.dao.venta.mensual(desde.format('YYYY-MM-DD'), hasta.format('YYYY-MM-DDTHH:mm:ss'));
            res.status(200).json({
                finalizado: true,
                mensaje: 'Datos obtenidos',
                datos: ventas
            });
        } else {
            res.status(400).json({
                finalizado: false,
                mensaje: 'Verifique rango de fechas.'
            });
        }
    }

    async function deposito(req, res) {
        if (!app.config.c21.use) {
            throw new Error('La configuración del C21 no se encuentra habilitada.');
        }
        await app.dao.venta.deposito(req.params.id, req.body);
        res.status(200).json({
            finalizado: true,
            mensaje: 'Deposito registrado.'
        });
    }

    return {
        lista,
        total,
        pdf,
        mensual,
        deposito
    };
};
