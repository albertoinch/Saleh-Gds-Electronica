// 'use strict';

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('persona', [
      {
        //1
        tipo_documento: 'TD_CI',
        complemento_visible: false,
        numero_documento: '0000001',
        complemento: '00',
        fecha_nacimiento: '1980/01/01',
        nombres: 'FLOTA',
        primer_apellido: 'POR ASIGNAR',
        segundo_apellido: '',
        sexo: 'F',
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
