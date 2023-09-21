const dbConnection = require('../../config/dbConnection');

const insertUser = (user, callback) => {
    dbConnection.query(`INSERT INTO users (email, password) VALUES ("${user.email}", "${user.senha}");`, callback);
}

const getUser = (user, callback) => {
    dbConnection.query(`SELECT * FROM users WHERE email = "${user.email}" AND password = "${user.senha}";`, callback);
}

module.exports = {getUser, insertUser};