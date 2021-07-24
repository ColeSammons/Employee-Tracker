const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

// async function test1() {
//     let array1 = [];
//     db.promise().query('SELECT * FROM roles')
//         .then(([rows, fields]) => {
//             array1 = rows.map(data => {
//                 return data.title;
//             });
//             console.log(array1)
//         });

    
// }

// async function test2() {
//     let array2 = [];
//     db.promise().query('SELECT * FROM employees e WHERE e.manager_id IS NULL')
//         .then(([rows, fields]) => {
//             array2 = rows.map(data => {
//                 return `${data.first_name} ${data.last_name}`;
//             });
//             console.log(array2)
//         });

    
// }

// test1();
// test2();

