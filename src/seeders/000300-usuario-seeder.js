// 'use strict';

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('usuario', [
      {
        //1
        usuario: 'flota',
        contrasena: '08c5ffdd6d1da0d38131e7696acebe8b7a04652e3c1f0b8261135f98a1c92170',
        fid_persona: 1,
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        //2
        usuario: 'php',
        contrasena: '08c5ffdd6d1da0d38131e7696acebe8b7a04652e3c1f0b8261135f98a1c92170',
        fid_persona: 1,
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
  }
};
