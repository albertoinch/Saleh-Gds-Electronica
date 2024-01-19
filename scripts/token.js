const jwt = require('jwt-simple');
const { Pool } = require('pg');
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}
const config = require('../src/config/config.js')();
const pool = new Pool({
  host: config.database.options.host,
  port: config.database.options.port,
  user: config.database.username,
  password: config.database.password,
  database: config.database.database
});
(async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const res = await client.query(`SELECT id_usuario, fid_persona id_persona, usuario, fid_grupo id_grupo, fid_contribuyente id_contribuyente, EXTRACT(EPOCH FROM now() + '365 day'::Interval)::Int exp
      FROM usuario u, usuario_grupo g WHERE u.id_usuario = g.fid_usuario AND u.usuario = $1;`, [process.argv[process.argv.length - 1]]);
    if (res.rowCount === 1) {
      const token = jwt.encode(res.rows[0], config.secret);
      await client.query(`UPDATE usuario SET token = $1 WHERE id_usuario = $2;`, [res.rows[0].exp, res.rows[0].id_usuario]);
      await client.query('COMMIT'); console.log(`\nJWT ${token}\n`);
    } else {
      console.log('Usuario no encontrado.');
    }
  } catch (e) {
    await client.query('ROLLBACK'); console.error(e.stack);
  } finally {
    client.release();
  }
  process.exit();
})().catch(e => console.error(e.stack));
