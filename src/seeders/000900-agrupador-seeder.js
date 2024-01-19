// 'use strict';

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('agrupador', [
      {
        codigo: 'ACTIVIDAD',
        descripcion: 'Actividad',
        metodo: 'sincronizarActividades'
      }, {
        codigo: 'SECTOR',
        descripcion: 'Sector',
        metodo: 'sincronizarListaActividadesDocumentoSector'
      }, {
        codigo: 'LEYENDA',
        descripcion: 'Leyenda',
        metodo: 'sincronizarListaLeyendasFactura'
      }, {
        codigo: 'TIPO EMISION',
        descripcion: 'Tipo de emisión',
        metodo: 'sincronizarParametricaTipoEmision'
      }, {
        codigo: 'METODO PAGO',
        descripcion: 'Método de pago',
        metodo: 'sincronizarParametricaTipoMetodoPago'
      }, {
        codigo: 'MOTIVO EVENTO',
        descripcion: 'Eventos significativos',
        metodo: 'sincronizarParametricaEventosSignificativos'
      }, {
        codigo: 'TIPO DOCUMENTO IDENTIDAD',
        descripcion: 'Tipo de documento de identidad',
        metodo: 'sincronizarParametricaTipoDocumentoIdentidad'
      }, {
        codigo: 'TIPO DOCUMENTO SECTOR',
        descripcion: 'Tipo de documento por sector',
        metodo: 'sincronizarParametricaTipoDocumentoSector'
      }, {
        codigo: 'TIPO MONEDA',
        descripcion: 'Tipo de moneda',
        metodo: 'sincronizarParametricaTipoMoneda'
      }, {
        codigo: 'CODIGO PAIS',
        descripcion: 'Código de país',
        metodo: 'sincronizarParametricaPaisOrigen'
      }, {
        codigo: 'MOTIVO ANULACION',
        descripcion: 'Motivo de anulación',
        metodo: 'sincronizarParametricaMotivoAnulacion'
      }, {
        codigo: 'MENSAJE SOAP',
        descripcion: 'Mensaje de error SOAP',
        metodo: 'sincronizarListaMensajesServicios'
      }, {
        codigo: 'ITEM',
        descripcion: 'Productos y Servicios',
        metodo: 'sincronizarListaProductosServicios'
      }, {
        codigo: 'UNIDAD MEDIDA',
        descripcion: 'Unidades de medida',
        metodo: 'sincronizarParametricaUnidadMedida'
      }, {
        codigo: 'TIPO FACTURA',
        descripcion: 'Tipo Factura',
        metodo: 'sincronizarParametricaTiposFactura'
      }, {
        codigo: 'PUNTO VENTA',
        descripcion: 'Punto de venta',
        metodo: 'sincronizarParametricaTipoPuntoVenta'
      }, {
        codigo: 'TIPO HABITACION',
        descripcion: 'Tipo Habitación',
        metodo: 'sincronizarParametricaTipoHabitacion'
      }
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
