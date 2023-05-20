// 'use strict';

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('usuario_grupo', [
      {
        fid_usuario: 1,
        fid_grupo: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        fid_usuario: 2,
        fid_grupo: 3,
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
