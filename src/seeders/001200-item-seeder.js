// 'use strict';

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('item', [
      {
        actividad_economica: '492211',
        codigo: '10010',
        codigo_sin: '99100',
        descripcion: 'TRANSPORTE ',
        codigo_unidad: '58',
        codigo_documento_sector: '1',
        fid_contribuyente: 1,
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        actividad_economica: '492322',
        codigo: '10020',
        codigo_sin: '65116',
        descripcion: 'ENCOMIENDAS ',
        codigo_unidad: '58',
        codigo_documento_sector: '1',
        fid_contribuyente: 1,
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        actividad_economica: '492322',
        codigo: '10030',
        codigo_sin: '651199',
        descripcion: 'GIROS Y REMESAS ',
        codigo_unidad: '58',
        codigo_documento_sector: '1',
        fid_contribuyente: 1,
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
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
