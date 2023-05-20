// 'use strict';

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('ruta', [
      {
        // 1
        ruta: '/api/v1/factura',
        descripcion: 'Ruta para la administración de facturas',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: true,
        estado: 'ACTIVO',
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        // 2
        ruta: '/api/v1/venta',
        descripcion: 'Ruta para enviar todas las facturas',
        method_get: true,
        method_post: true,
        method_put: false,
        method_delete: true,
        estado: 'ACTIVO',
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        // 3
        ruta: '/api/v1/evento',
        descripcion: 'Ruta iniciar o cerrar un evento significativo',
        method_get: true,
        method_post: true,
        method_put: false,
        method_delete: true,
        estado: 'ACTIVO',
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        // 4
        ruta: '/api/v1/puntoVenta',
        descripcion: 'Ruta para el registro de nuevos puntos de venta',
        method_get: true,
        method_post: true,
        method_put: false,
        method_delete: true,
        estado: 'ACTIVO',
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        // 5
        ruta: '/api/v1/contingencia',
        descripcion: 'Ruta para la administracion de facturas de contingencia',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        // 6
        ruta: '/api/v1/item',
        descripcion: 'Ruta para la administracion de items',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        // 7
        ruta: '/api/v1/catalogo',
        descripcion: 'Ruta para la administracion de catalogos',
        method_get: true,
        method_post: false,
        method_put: false,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        // 8
        ruta: '/api/v1/cliente',
        descripcion: 'Ruta para la gestión de clientes',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        // 9
        ruta: '/api/v1/sucursal',
        descripcion: 'Ruta para la administración de sucursales',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        // 10
        ruta: '/api/v1/contribuyente',
        descripcion: 'Ruta para la administración de contribuyentes',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        // 11
        ruta: '/api/v1/usuario',
        descripcion: 'Ruta para la administración de usuarios',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        // 12
        ruta: '/api/v1/estado',
        descripcion: 'Ruta para verificar el estado.',
        method_get: true,
        method_post: false,
        method_put: false,
        method_delete: false,
        estado: 'ACTIVO',
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
