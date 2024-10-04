
var mysql = require('mysql');
var migration = require('mysql-migrations');
const mysqlPromise = require('mysql2/promise');


var connection = mysql.createPool({
  connectionLimit : 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database : 'great_brand'
});


// await mysqlPromise.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database : process.env.DB_NAME
// })


// var connection =  mysqlPromise.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database : 'great_brand'
//   });

migration.init(connection, __dirname + '/migrations', function() {
  console.log("finished running migrations");
});