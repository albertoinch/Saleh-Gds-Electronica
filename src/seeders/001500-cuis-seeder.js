// 'use strict';

module.exports = {
  up(queryInterface) {
    const datos = [
      {
        // 1
        codigo: 'FFCF82A2',
        vigencia: new Date('2024-06-26T10:41:07.176-04:00'),
        fid_punto_venta: 1,
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }
    ];
    if (process.env.NODE_ENV == 'test') {
      datos.push({
        // 2
        codigo: '',
        vigencia: new Date('2024-02-03T15:22:34.785-04:00'),
        fid_punto_venta: 2,
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      });
    }
    return queryInterface.bulkInsert('cuis', datos, {});
  },

  down() {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
