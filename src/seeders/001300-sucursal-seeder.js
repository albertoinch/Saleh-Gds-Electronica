// 'use strict';
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}
const config = require('../config/config')();

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('sucursal', [
      {
        // 1
        nombre: 'Casa Matriz',
        municipio: 'Mun',
        direccion: 'Dir',
        telefono: '(591)2-2222222',
        descripcion: 'Casa Matriz',
        codigo: '0',
        estado: 'ACTIVO',
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_contribuyente: 1
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
  }
};
