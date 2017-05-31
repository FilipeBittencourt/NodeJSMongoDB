const mysql = require('mysql');

const connMySQL = function () {
    //console.log('DB Connection');
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'portal_noticias'
    });
};

module.exports = function () {
    //console.log('No DB Connection');
    return connMySQL;
};
