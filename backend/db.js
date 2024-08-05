import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'sql3.freemysqlhosting.net',
  user: 'sql3724178',
  password: 'EGJM2wX2XV',
  database: 'sql3724178',
});
export default pool;
