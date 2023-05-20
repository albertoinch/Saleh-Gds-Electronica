// 'use strict';
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}
const config = require('../config/config')();

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('contribuyente', [
      {
        // 1
        nombre: 'San Francisco',
        nit: 1234567010,
        codigo_ambiente: 2,
        codigo_modalidad: config.impuestos.codigoModalidad,
        estado: 'ACTIVO',
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }
    ], { returning: true }).then(result => {
      return queryInterface.bulkUpdate('usuario', {
        fid_contribuyente: result[0].id_contribuyente
      });
    });
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
