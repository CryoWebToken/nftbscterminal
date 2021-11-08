const mysql = require("mysql2");

// Create a connection to the database
const pool = mysql.createPool({
    host: process.env.DB_HOST, // i use "localhost"
    user: process.env.DB_USER, //mysql username
    password: process.env.DB_PASS, //mysql password
    database: process.env.DB_DATABASE, //your database name
    multipleStatements: true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//async function to connect to DB with given sql query
async function connect(sql, vals) {

    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) { // if error in connection
                throw err;
            }
            // Use the connection
            connection.query(sql, vals, function (err, results, fields) {
                pool.releaseConnection(connection);
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    });
};

module.exports = { connect };
