const datos = require('./datos.json');

before(done => {
  console.log('------------------------- START TEST INDIVIDUAL -------------------------');
  done();
});
after(done => {
  console.log('-------------------------  END TEST INDIVIDUAL  -------------------------');
  done();
});

const app = require('../app.js');
describe('Test - INDIVIDUAL', () => {
  let cufd;
  it('1.- Obteniendo CUFD.', async function() {
    cufd = await app.dao.cufd.get(1, 'admin');
  });
  it('2.- Registrar Factura.', async function() {
    const t = await app.db.sequelize.transaction();
    try {
      for (let i = 0; i < 125; i++) {
        const factura = await app.dao.factura.crear({
          codigoSucursal: '0',
          codigoPuntoVenta: '0',
          codigoTipoDocumentoIdentidad: datos[i].codigoTipoDocumentoIdentidad,
          numeroDocumento: datos[i].numeroDocumento,
          nombreRazonSocial: datos[i].nombreRazonSocial,
          tipoCambio: '1',
          codigoMetodoPago: 6,
          tipoEmision: 1,
          detalle: [
            {
              codigoProducto: '020001',
              descripcion: 'Impresora',
              cantidad: '1',
              unidadMedida: '58',
              precioUnitario: (Math.random() * 400 + 100).toFixed(2)
            }
          ],
          audit_usuario: {
            id_contribuyente: 1,
            usuario: 'admin'
          }
        }, t);
      }
      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  });
  it('3.- Espera para el registro.', async function() {
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 30000);
    });
  });
}).timeout(2000);
