const mysql = require("mysql");

    const dbConnection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "shopStore",
        port: 3306,
        multipleStatements: true,
      });
    


module.exports = {dbConnection}