module.exports = {
    post: {
        type: 'object',
        properties: {
            codigoSucursal: {
                type: 'numeric',
                required: true
            },
            codigoTipoDocumentoIdentidad: {
                type: 'numeric',
                required: true
            },
            numeroDocumento: {
                type: 'string',
                required: true
            },
            nombreRazonSocial: {
                type: 'string',
                required: true
            },
            codigoCliente: {
                type: 'string',
                required: false
            },
            tipoCambio: {
                type: 'string',
                required: true
            },
            codigoMetodoPago: {
                type: 'numeric',
                required: true
            },
            numeroTarjeta: {
                type: 'string',
                required: false
            },
            tipoEmision: {
                type: 'numeric',
                required: true
            },
            detalle: {
                type: 'array',
                required: true,
                items: {
                    type: 'object',
                    properties: {
                        codigoProducto: {
                            type: 'string',
                            required: true
                        },
                        descripcion: {
                            type: 'string',
                            required: true
                        },
                        cantidad: {
                            type: 'string',
                            required: true
                        },
                        unidadMedida: {
                            type: 'string',
                            required: true
                        },
                        precioUnitario: {
                            type: 'string',
                            required: true
                        },
                        montoDescuento: {
                            type: 'string',
                            required: false
                        },
                        numeroSerie: {
                            type: 'string',
                            required: false
                        },
                        numeroImei: {
                            type: 'string',
                            required: false
                        }
                    }
                }
            },
            depositos: {
                type: 'array',
                required: false,
                items: {
                    type: 'object',
                    properties: {
                        numero: {
                            type: 'string',
                            required: true
                        },
                        fecha: {
                            type: 'string',
                            required: false
                        }
                    }
                }
            }
        }
    },
    put: {
        type: 'object',
        properties: {
            codigoTipoDocumentoIdentidad: {
                type: 'numeric',
                required: false
            },
            numeroDocumento: {
                type: 'string',
                required: false
            },
            complemento: {
                type: 'string',
                required: false
            },
            nombreRazonSocial: {
                type: 'string',
                required: false
            }
        }
    },
    get: {
        type: 'object',
        properties: {
            id: {
                type: 'numeric',
                required: true
            }
        }
    },
    getCuf: {
        type: 'object',
        properties: {
            cuf: {
                type: 'string',
                required: true
            }
        }
    },
    getNro: {
        type: 'object',
        properties: {
            nro: {
                type: 'numeric',
                required: true
            },
            fecha: {
                type: 'string',
                required: true
            }
        }
    },
    delete: {
        type: 'object',
        properties: {
            codigo: {
                type: 'numeric',
                required: true
            },
            motivo: {
                type: 'string',
                required: true
            }
        }
    },
    verificar: {
        type: 'object',
        properties: {
            nit: {
                type: 'numeric',
                required: true
            }
        }
    }
};
