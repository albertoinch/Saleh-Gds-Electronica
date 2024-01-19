// 'use strict';

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('esquema', [
      {codigo:'1',tipo_factura:1,archivo:'facturaElectronicaCompraVenta',objeto:'{"facturaElectronicaCompraVenta":{"_attributes":{"xmlns:xsi":"http://www.w3.org/2001/XMLSchema-instance","xsi:noNamespaceSchemaLocation":"facturaElectronicaCompraVenta.xsd"},"cabecera":{"nitEmisor":"","razonSocialEmisor":"","municipio":"","telefono":"","numeroFactura":"","cuf":"","cufd":"","codigoSucursal":"","direccion":"","codigoPuntoVenta":"","fechaEmision":"","nombreRazonSocial":"","codigoTipoDocumentoIdentidad":"","numeroDocumento":"","complemento":"","codigoCliente":"","codigoMetodoPago":"","numeroTarjeta":"","montoTotal":"","montoTotalSujetoIva":"","codigoMoneda":"","tipoCambio":"","montoTotalMoneda":"","montoGiftCard":"","descuentoAdicional":"","codigoExcepcion":"","cafc":"","leyenda":"Ley N° 453: Tienes derecho a recibir información sobre las características y contenidos de los servicios que utilices.","usuario":"","codigoDocumentoSector":""},"detalle":[{"actividadEconomica":"","codigoProductoSin":"","codigoProducto":"","descripcion":"","cantidad":"","unidadMedida":"","precioUnitario":"","montoDescuento":"","subTotal":"","numeroSerie":"","numeroImei":""}]}}',archivo2:'facturaComputarizadaCompraVenta',objeto2:'{"facturaComputarizadaCompraVenta":{"_attributes":{"xmlns:xsi":"http://www.w3.org/2001/XMLSchema-instance","xsi:noNamespaceSchemaLocation":"facturaComputarizadaCompraVenta.xsd"},"cabecera":{"nitEmisor":"","razonSocialEmisor":"","municipio":"","telefono":"","numeroFactura":"","cuf":"","cufd":"","codigoSucursal":"","direccion":"","codigoPuntoVenta":"","fechaEmision":"","nombreRazonSocial":"","codigoTipoDocumentoIdentidad":"","numeroDocumento":"","complemento":"","codigoCliente":"","codigoMetodoPago":"","numeroTarjeta":"","montoTotal":"","montoTotalSujetoIva":"","codigoMoneda":"","tipoCambio":"","montoTotalMoneda":"","montoGiftCard":"","descuentoAdicional":"","codigoExcepcion":"","cafc":"","leyenda":"Ley N° 453: Tienes derecho a recibir información sobre las características y contenidos de los servicios que utilices.","usuario":"","codigoDocumentoSector":""},"detalle":[{"actividadEconomica":"","codigoProductoSin":"","codigoProducto":"","descripcion":"","cantidad":"","unidadMedida":"","precioUnitario":"","montoDescuento":"","subTotal":"","numeroSerie":"","numeroImei":""}]}}'},
      {codigo:'2',tipo_factura:1,archivo:'facturaElectronicaAlquilerBienInmueble',archivo2:'facturaComputarizadaAlquilerBienInmueble'},
      {codigo:'3',tipo_factura:1,archivo:'facturaElectronicaComercialExportacion',archivo2:'facturaComputarizadaComercialExportacion'},
      {codigo:'4',tipo_factura:1,archivo:'facturaElectronicaLibreConsignacion',archivo2:'facturaComputarizadaLibreConsignacion'},
      {codigo:'5',tipo_factura:1,archivo:'facturaElectronicaZonaFranca',archivo2:'facturaComputarizadaZonaFranca'},
      {codigo:'6',tipo_factura:1,archivo:'facturaElectronicaServicioTuristicoHospedaje',archivo2:'facturaComputarizadaServicioTuristicoHospedaje'},
      {codigo:'7',tipo_factura:1,archivo:'facturaElectronicaSeguridadAlimentaria',archivo2:'facturaComputarizadaSeguridadAlimentaria'},
      {codigo:'8',tipo_factura:2,archivo:'facturaElectronicaTasaCero',objeto:'{"facturaElectronicaTasaCero":{"_attributes":{"xmlns:xsi":"http://www.w3.org/2001/XMLSchema-instance","xsi:noNamespaceSchemaLocation":"facturaElectronicaTasaCero.xsd"},"cabecera":{"nitEmisor":"","razonSocialEmisor":"","municipio":"","telefono":"","numeroFactura":"","cuf":"","cufd":"","codigoSucursal":"","direccion":"","codigoPuntoVenta":"","fechaEmision":"","nombreRazonSocial":"","codigoTipoDocumentoIdentidad":"","numeroDocumento":"","complemento":"","codigoCliente":"","codigoMetodoPago":"","numeroTarjeta":"","montoTotal":"","montoTotalSujetoIva":"","codigoMoneda":"","tipoCambio":"","montoTotalMoneda":"","montoGiftCard":"","descuentoAdicional":"","codigoExcepcion":"","cafc":"","leyenda":"Ley N° 453: Tienes derecho a recibir información sobre las características y contenidos de los servicios que utilices.","usuario":"","codigoDocumentoSector":""},"detalle":[{"actividadEconomica":"","codigoProductoSin":"","codigoProducto":"","descripcion":"","cantidad":"","unidadMedida":"","precioUnitario":"","montoDescuento":"","subTotal":""}]}}',archivo2:'facturaComputarizadaTasaCero',objeto2:'{"facturaComputarizadaTasaCero":{"_attributes":{"xmlns:xsi":"http://www.w3.org/2001/XMLSchema-instance","xsi:noNamespaceSchemaLocation":"facturaComputarizadaTasaCero.xsd"},"cabecera":{"nitEmisor":"","razonSocialEmisor":"","municipio":"","telefono":"","numeroFactura":"","cuf":"","cufd":"","codigoSucursal":"","direccion":"","codigoPuntoVenta":"","fechaEmision":"","nombreRazonSocial":"","codigoTipoDocumentoIdentidad":"","numeroDocumento":"","complemento":"","codigoCliente":"","codigoMetodoPago":"","numeroTarjeta":"","montoTotal":"","montoTotalSujetoIva":"","codigoMoneda":"","tipoCambio":"","montoTotalMoneda":"","montoGiftCard":"","descuentoAdicional":"","codigoExcepcion":"","cafc":"","leyenda":"Ley N° 453: Tienes derecho a recibir información sobre las características y contenidos de los servicios que utilices.","usuario":"","codigoDocumentoSector":""},"detalle":[{"actividadEconomica":"","codigoProductoSin":"","codigoProducto":"","descripcion":"","cantidad":"","unidadMedida":"","precioUnitario":"","montoDescuento":"","subTotal":""}]}}'},
      {codigo:'9',tipo_factura:1,archivo:'facturaElectronicaMonedaExtranjera',archivo2:'facturaComputarizadaMonedaExtranjera'},
      {codigo:'10',tipo_factura:1,archivo:'facturaElectronicaDuttyFree',archivo2:'facturaComputarizadaDuttyFree'},
      {codigo:'11',tipo_factura:1,archivo:'facturaElectronicaSectorEducativo',archivo2:'facturaComputarizadaSectorEducativo'},
      {codigo:'12',tipo_factura:1,archivo:'facturaElectronicaComercializacionHidrocarburo',archivo2:'facturaComputarizadaComercializacionHidrocarburo'},
      {codigo:'13',tipo_factura:1,archivo:'facturaElectronicaServicioBasico',archivo2:'facturaComputarizadaServicioBasico'},
      {codigo:'14',tipo_factura:1,archivo:'facturaElectronicaAlcanzadaIce',archivo2:'facturaComputarizadaAlcanzadaIce'},
      {codigo:'15',tipo_factura:1,archivo:'facturaElectronicaEntidadFinanciera',archivo2:'facturaComputarizadaEntidadFinanciera'},
      {codigo:'16',tipo_factura:1,archivo:'facturaElectronicaHotel',archivo2:'facturaComputarizadaHotel'},
      {codigo:'17',tipo_factura:1,archivo:'facturaElectronicaHospitalClinica',archivo2:'facturaComputarizadaHospitalClinica'},
      {codigo:'18',tipo_factura:1,archivo:'facturaElectronicaJuegoAzar',archivo2:'facturaComputarizadaJuegoAzar'},
      {codigo:'19',tipo_factura:1,archivo:'facturaElectronicaHidrocarburo',archivo2:'facturaComputarizadaHidrocarburo'},
      {codigo:'20',tipo_factura:1,archivo:'facturaElectronicaComercialExportacionMinera',archivo2:'facturaComputarizadaComercialExportacionMinera'},
      {codigo:'21',tipo_factura:1,archivo:'facturaElectronicaVentaMineral',archivo2:'facturaComputarizadaVentaMineral'},
      {codigo:'22',tipo_factura:1,archivo:'facturaElectronicaTelecomunicacion',archivo2:'facturaComputarizadaTelecomunicacion'},
      {codigo:'23',tipo_factura:1,archivo:'facturaElectronicaPrevalorada',archivo2:'facturaComputarizadaPrevalorada'},
      {codigo:'24',tipo_factura:1,archivo:'notaElectronicaCreditoDebito',archivo2:'notaElectronicaCreditoDebito'},
      {codigo:'25',tipo_factura:1,archivo:'',archivo2:''}
    ], {});
  },

  down() {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  },
};
