'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('menu', [
      {
        // 1
        label: 'Ventas',
        descripcion: 'Lista de ventas',
        orden: 1,
        ruta: '/ventas',
        icono: 'fa fa-dashboard',
        estado: 'ACTIVO',
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      {
        // 2
        label: 'Factura manual de contingencia',
        descripcion: 'Lista de ventas transcritas',
        orden: 1,
        ruta: '/ventas/contingencias',
        icono: 'fa fa-sticky-note',
        estado: 'ACTIVO',
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      {
        // 3
        label: 'Eventos',
        descripcion: 'Lista de eventos significativos',
        orden: 1,
        ruta: '/ventas/eventos',
        icono: 'fa fa-exclamation',
        estado: 'ACTIVO',
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      {
        // 4
        label: 'Clientes',
        descripcion: 'Lista de clientes',
        orden: 1,
        ruta: '/ventas/clientes',
        icono: 'fa fa-users',
        estado: 'ACTIVO',
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      {
        // 5
        label: 'Productos/Servicios',
        descripcion: 'Lista de productos/servicios',
        orden: 1,
        ruta: '/ventas/items',
        icono: 'fa fa-shopping-cart',
        estado: 'ACTIVO',
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      {
        // 6
        label: 'Sucursales',
        descripcion: 'Lista de sucursales - Puntos de venta',
        orden: 1,
        ruta: '/ventas/sucursales',
        icono: 'fa fa-building-o',
        estado: 'ACTIVO',
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      {
        // 7
        label: 'Contribuyentes',
        descripcion: 'Lista de contribuyentes',
        orden: 1,
        ruta: '/ventas/contribuyentes',
        icono: 'fa fa-building-o',
        estado: 'ACTIVO',
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      {
        // 8
        label: 'Usuarios',
        descripcion: 'Lista de Usuarios',
        orden: 1,
        ruta: '/ventas/usuarios',
        icono: 'fa fa-users',
        estado: 'ACTIVO',
        _usuario_creacion: 'admin',
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
