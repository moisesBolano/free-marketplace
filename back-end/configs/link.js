var mysql = require('mysql');
const configs = require('./configs');

var connection = mysql.createConnection(configs.db_params);


connection.connect();

module.exports = connection;