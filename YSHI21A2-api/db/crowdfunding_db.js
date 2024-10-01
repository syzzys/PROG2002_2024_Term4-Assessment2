const mysql = require('mysql2');

// create the connection to database
function getMysqlConnection() {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yshi3024975',
    database: 'crowdfunding_db',
  });

  return connection
}

module.exports = {
  getMysqlConnection
}
