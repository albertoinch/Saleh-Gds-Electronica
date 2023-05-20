'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('grupo_menu', [
      {
        fid_grupo: 1,
        fid_menu: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      {
        fid_grupo: 1,
        fid_menu: 2,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      {
        fid_grupo: 1,
        fid_menu: 3,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      {
        fid_grupo: 1,
        fid_menu: 4,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      {
        fid_grupo: 1,
        fid_menu: 5,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      {
        fid_grupo: 1,
        fid_menu: 6,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      {
        fid_grupo: 1,
        fid_menu: 7,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      {
        fid_grupo: 1,
        fid_menu: 8,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      {
        fid_grupo: 3,
        fid_menu: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      {
        fid_grupo: 3,
        fid_menu: 2,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      {
        fid_grupo: 3,
        fid_menu: 3,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      {
        fid_grupo: 3,
        fid_menu: 4,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      {
        fid_grupo: 3,
        fid_menu: 5,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        fid_grupo: 4,
        fid_menu: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      {
        fid_grupo: 4,
        fid_menu: 2,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
