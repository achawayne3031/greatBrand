
var mysql = require('mysql');
var migration = require('mysql-migrations');
const env = require('dotenv').config({ debug: process.env.DEBUG });


var connection = mysql.createPool({
  connectionLimit : 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database : process.env.DB_NAME
});


migration.init(connection, __dirname + '/migrations', function() {
  console.log("finished running migrations");
});