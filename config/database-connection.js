const mysql = require('mysql');
const config = require('../helpers/config');

class DatabaseConnection{
    constructor() {
        this.connection = mysql.createPool(config.MYSQL_DB_CONFIG.LOCAL);

        setTimeout( () => {
            this.connection.getConnection((err, connection) =>{
                if (!err){
                    console.log("Connected to MySQL");
                }
                else{
                    console.log("Failed to connect MySQL");
                    console.log(err);
                }

            });
        },100)
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    };

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    };
}

module.exports = new DatabaseConnection();
