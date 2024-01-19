// 'use strict';

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('grupo', [
      {
        // 1
        grupo: 'ADMIN',
        descripcion: 'Administrador',
        peso: 0,
        estado: 'ACTIVO',
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      {
        // 2
        grupo: 'TEMPORAL',
        descripcion: 'Rol temporal para usuarios que incien sesion con ldap',
        peso: 0,
        estado: 'ACTIVO',
        _usuario_creacion: '1',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      {
        // 3
        grupo: 'FACTURA',
        descripcion: 'Rol para facturar',
        peso: 0,
        estado: 'ACTIVO',
        _usuario_creacion: '1',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      {
        // 4
        grupo: 'REVISOR',
        descripcion: 'Rol para usuarios que registran codigos especiales, y visualizan reportes',
        peso: 0,
        estado: 'ACTIVO',
        _usuario_creacion: '1',
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
