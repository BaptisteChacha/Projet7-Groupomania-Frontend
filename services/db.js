const mysql = require('mysql2');

class Db {
    constructor() {
        Db.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'lbt480',
            database: "groupomania"
        });

        Db.connection.connect();

    }
    static get() {
        if (!Db.connection) {
            new Db();
        }
        return Db.connection;
    }
}

module.exports = Db;