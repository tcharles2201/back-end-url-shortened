var mysql = require("mysql");
var connection = mysql.createConnection({
  host     : process.env.HOST, 
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_DATABASE
});
connection.connect();
module.exports = connection;