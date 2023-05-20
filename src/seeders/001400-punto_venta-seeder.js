// 'use strict';

module.exports = {
  up(queryInterface) {
    const datos = [
      {
        // 1
        nombre: 'Punto Uno',
        descripcion: 'Punto Uno',
        codigo: '0',
        tipo: undefined,
        estado: 'ACTIVO',
        fid_sucursal: 1,
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }
    ];
    if (process.env.NODE_ENV == 'test') {
      datos.push({
        // 2
        nombre: 'PRUEBA',
        descripcion: 'PUNTO DE VENTA CAJEROS',
        codigo: '1',
        tipo: 5,
        estado: 'ACTIVO',
        fid_sucursal: 1,
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      });
    }
    return queryInterface.bulkInsert('punto_venta', datos, {});
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
