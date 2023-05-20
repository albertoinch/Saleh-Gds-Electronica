const CronJob = require('cron').CronJob;

module.exports = (app) => {
    new CronJob('0 0,10,20,30,40,50 4 * * *', async function() {
        const lista = await app.dao.punto_venta.getPuntosVenta();
        for (let i = 0; i < lista.length; i++) {
            try {
                await app.dao.cufd.get(lista[i].id_punto_venta, 'cron');
            } catch(err) {
                console.log(err.body);
            }
        }
    }, null, true);
    new CronJob('0 0 3 * * *', function() {
        app.dao.catalogo.sincronizar(1);
    }, null, true);
};
