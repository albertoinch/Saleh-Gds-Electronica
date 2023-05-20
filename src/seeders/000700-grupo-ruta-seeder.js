// 'use strict';

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('grupo_ruta', [
      {
        fid_ruta: 1,
        fid_grupo: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        fid_ruta: 2,
        fid_grupo: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        fid_ruta: 3,
        fid_grupo: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        fid_ruta: 4,
        fid_grupo: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        fid_ruta: 5,
        fid_grupo: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        fid_ruta: 6,
        fid_grupo: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        fid_ruta: 7,
        fid_grupo: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        fid_ruta: 8,
        fid_grupo: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        fid_ruta: 9,
        fid_grupo: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        fid_ruta: 10,
        fid_grupo: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        fid_ruta: 11,
        fid_grupo: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        fid_ruta: 12,
        fid_grupo: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        fid_ruta: 1,
        fid_grupo: 3,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        fid_ruta: 2,
        fid_grupo: 3,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        fid_ruta: 3,
        fid_grupo: 3,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        fid_ruta: 4,
        fid_grupo: 3,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        fid_ruta: 5,
        fid_grupo: 3,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        fid_ruta: 6,
        fid_grupo: 3,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        fid_ruta: 7,
        fid_grupo: 3,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        fid_ruta: 8,
        fid_grupo: 3,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        fid_ruta: 12,
        fid_grupo: 3,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        fid_ruta: 2,
        fid_grupo: 4,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        fid_ruta: 7,
        fid_grupo: 4,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        fid_ruta: 10,
        fid_grupo: 4,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        fid_ruta: 11,
        fid_grupo: 4,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        fid_ruta: 12,
        fid_grupo: 4,
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
