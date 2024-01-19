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
describe('Test - PAQUETE', () => {
  let cufd;
  it('1.- Obteniendo CUFD.', async function() {
    cufd = await app.dao.cufd.get(2, 'admin');
  });
  it('2.- Registrar Evento Significativo codigo 2.', async function() {
    const evento = await app.dao.evento_significativo.crear({
      codigoEvento: 2,
      descripcion: 'Inaccesibilidad al servicio web de la administración tributaria',
      idPuntoVenta: 2,
      audit_usuario: {
        id_punto_venta: 2,
        usuario: 'admin'
      }
    });
  });
  it('3.- Registrar Factura.', async function() {
    const t = await app.db.sequelize.transaction();
    try {
      for (let i = 0; i < 500; i++) {
        const factura = await app.dao.factura.crear({
          codigoSucursal: '0',
          codigoPuntoVenta: '1',
          codigoTipoDocumentoIdentidad: datos[i].codigoTipoDocumentoIdentidad,
          numeroDocumento: datos[i].numeroDocumento,
          nombreRazonSocial: datos[i].nombreRazonSocial,
          tipoCambio: '1',
          codigoMetodoPago: 6,
          tipoEmision: 2,
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
  it('4.- Cierre del Evento Significativo.', async function() {
    await await app.dao.evento_significativo.cerrar(2, {
      id_punto_venta: 2,
      audit_usuario: {
        usuario: 'admin'
      }
    });
  });
  it('5.- Espera para el registro.', async function() {
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 30000);
    });
  });
}).timeout(2000);
