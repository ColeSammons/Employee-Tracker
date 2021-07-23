const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'employeetracker'
    },
    console.log('Connected to the employeetracker database.')
);



module.exports = db;