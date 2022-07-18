const mariadb = require("mariadb");

const host = process.env.HOST;
const username = process.env.DBUSERNAME;
const password = process.env.DBPASSWORD;
const database = process.env.DATABASE;

const connectionPool = mariadb.createPool({
  host: host,
  user: username,
  password: password,
  database: database,
  connectionLimit: 5,
  // debug: false,
  // waitForConnections: true,
  // queueLimit: 0,
  // port: 25060,
});

// Connect and check for errors
connectionPool.getConnection((err, connection) => {
  if(err){
      if (err.code === 'PROTOCOL_CONNECTION_LOST'){
          console.error('Database connection lost');
      }
      if (err.code === 'ER_CON_COUNT_ERROR'){
          console.error('Database has too many connection');
      }
      if (err.code === 'ECONNREFUSED'){
          console.error('Database connection was refused');
      }
  }
  if(connection) connection.release();

  return;
});

module.exports = connectionPool;
