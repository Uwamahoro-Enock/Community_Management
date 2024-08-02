import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Lavitate1123#',
  database: 'login_list',
});

const communityPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Lavitate1123#',
  database: 'community_list',
});

export { pool, communityPool };
