// 'use strict';

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('sync', [
      {
        fid_contribuyente: 1,
        codigo: 'ACTIVIDAD',
        _fecha_modificacion: new Date()
      }, {
        fid_contribuyente: 1,
        codigo: 'SECTOR',
        _fecha_modificacion: new Date()
      }, {
        fid_contribuyente: 1,
        codigo: 'LEYENDA',
        _fecha_modificacion: new Date()
      }, {
        fid_contribuyente: 1,
        codigo: 'TIPO EMISION',
        _fecha_modificacion: new Date()
      }, {
        fid_contribuyente: 1,
        codigo: 'METODO PAGO',
        _fecha_modificacion: new Date()
      }, {
        fid_contribuyente: 1,
        codigo: 'MOTIVO EVENTO',
        _fecha_modificacion: new Date()
      }, {
        fid_contribuyente: 1,
        codigo: 'TIPO DOCUMENTO IDENTIDAD',
        _fecha_modificacion: new Date()
      }, {
        fid_contribuyente: 1,
        codigo: 'TIPO DOCUMENTO SECTOR',
        _fecha_modificacion: new Date()
      }, {
        fid_contribuyente: 1,
        codigo: 'TIPO MONEDA',
        _fecha_modificacion: new Date()
      }, {
        fid_contribuyente: 1,
        codigo: 'CODIGO PAIS',
        _fecha_modificacion: new Date()
      }, {
        fid_contribuyente: 1,
        codigo: 'MOTIVO ANULACION',
        _fecha_modificacion: new Date()
      }, {
        fid_contribuyente: 1,
        codigo: 'MENSAJE SOAP',
        _fecha_modificacion: new Date()
      }, {
        fid_contribuyente: 1,
        codigo: 'ITEM',
        _fecha_modificacion: new Date()
      }, {
        fid_contribuyente: 1,
        codigo: 'UNIDAD MEDIDA',
        _fecha_modificacion: new Date()
      }, {
        fid_contribuyente: 1,
        codigo: 'TIPO FACTURA',
        _fecha_modificacion: new Date()
      }, {
        fid_contribuyente: 1,
        codigo: 'PUNTO VENTA',
        _fecha_modificacion: new Date()
      }, {
        fid_contribuyente: 1,
        codigo: 'TIPO HABITACION',
        _fecha_modificacion: new Date()
      }
    ], {});
  },

  down() {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('sync', null, {});
    */
  },
};
