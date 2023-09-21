const mysql = require('mysql');

const host = 'localhost';
const database = 'museu';
const user = 'root';
const password = '';

const dbConn = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});

console.log('[dbConnection State]', dbConn.state);

dbConn.connect((error) => {
    if(error)
        console.log('[dbConnection Error]', error);
    console.log('[dbConnection State]', dbConn.state);
});


module.exports = dbConn;