const mariadb = require('mariadb');
const mariadbConnection = mariadb.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'company'
});

module.exports = mariadbConnection;