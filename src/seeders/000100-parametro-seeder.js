// 'use strict';

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('parametro', [
      // Tipos de Documentos de identidad
      {
        codigo: 'TD_CI',
        grupo: 'TIPO_DOCUMENTO',
        nombre: 'CI',
        descripcion: 'Cédula de Identidad',
        orden: 1,
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        codigo: 'TD_CE',
        grupo: 'TIPO_DOCUMENTO',
        nombre: 'CE',
        descripcion: 'Cédula de Identidad de Extranjero',
        orden: 2,
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        codigo: 'TD_PAS',
        grupo: 'TIPO_DOCUMENTO',
        nombre: 'PAS',
        descripcion: 'Pasaporte',
        orden: 3,
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        codigo: 'TD_OD',
        grupo: 'TIPO_DOCUMENTO',
        nombre: 'OD',
        descripcion: 'Otro Documento de Identidad',
        orden: 4,
        _usuario_creacion: 'admin',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      }, {
        codigo: 'TD_NIT',
        grupo: 'TIPO_DOCUMENTO',
        nombre: 'NIT',
        descripcion: 'Número de Identificación Tributaria',
        orden: 5,
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
