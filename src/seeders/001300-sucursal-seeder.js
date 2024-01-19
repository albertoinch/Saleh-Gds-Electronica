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
        municipio: 'Cochabamba',
        direccion: 'Cochabamba',
        telefono: '(591)',
        descripcion: 'Casa Matriz',
        codigo: '0',
        estado: 'ACTIVO',
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_contribuyente: 1
      }, {
        // 2
        nombre: 'Sucursal 1',
        municipio: 'Sucursal 1',
        direccion: 'Sucursal 1',
        telefono: '(591)',
        descripcion: 'Sucursal 1',
        codigo: '1',
        estado: 'ACTIVO',
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_contribuyente: 1
      }, {
        // 3
        nombre: 'Sucursal 2',
        municipio: 'Sucursal 2',
        direccion: 'Sucursal 2',
        telefono: '(591)',
        descripcion: 'Sucursql 2',
        codigo: '2',
        estado: 'ACTIVO',
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_contribuyente: 1
      }, {
        // 4
        nombre: 'Sucursal 3',
        municipio: 'Sucursal 3',
        direccion: 'Sucursal 3',
        telefono: '(591)',
        descripcion: 'Sucursal 3',
        codigo: '3',
        estado: 'ACTIVO',
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_contribuyente: 1
      }, {
        // 5
        nombre: 'Sucursal 4',
        municipio: 'Sucursal 4',
        direccion: 'Sucursal 4',
        telefono: '(591)',
        descripcion: 'Sucursal 4',
        codigo: '4',
        estado: 'ACTIVO',
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_contribuyente: 1
      }, {
        // 6
        nombre: 'Sucursal 5',
        municipio: 'Sucursal 5',
        direccion: 'Sucursal 5',
        telefono: '(591)',
        descripcion: 'Sucursal 5',
        codigo: '5',
        estado: 'ACTIVO',
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_contribuyente: 1
      }, {
        // 7
        nombre: 'Sucursal 6',
        municipio: 'Sucursal 6',
        direccion: 'Sucursal 6',
        telefono: '(591)',
        descripcion: 'Sucursal 6',
        codigo: '6',
        estado: 'ACTIVO',
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_contribuyente: 1
      }, {
        // 8
        nombre: 'Sucursal 7',
        municipio: 'Sucursal 7',
        direccion: 'Sucursal 7',
        telefono: '(591)',
        descripcion: 'Sucursal 7',
        codigo: '7',
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
