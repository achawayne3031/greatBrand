const mysql = require('mysql');
const mysqlPromise = require('mysql2/promise');


class MySqlDatabase{

    constructor() {  
        this.databaseCreateConnection();
    }

    async databaseCreateConnection(){
        this.connection = await mysqlPromise.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database : process.env.DB_NAME
          });
    }

    async query(sql, params){
        const [rows, fields] = await this.connection.execute(sql, params);
        return rows;
    }


 }


 


const mysqlDatabase = new MySqlDatabase();
module.exports = mysqlDatabase;
