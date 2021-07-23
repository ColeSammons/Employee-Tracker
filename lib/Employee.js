const db = require('../db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

class Employee {
    constructor() {}

    async viewEmployees() {
        const sql = `SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.dept_name AS department, CONCAT(m.first_name, ' ', m.last_name) AS manager
                    FROM employees e
                    LEFT JOIN roles r
                    ON e.role_id = r.id
                    LEFT JOIN departments d
                    ON r.department_id = d.id
                    LEFT JOIN employees m
                    ON e.manager_id = m.id`;
        db.promise().query(sql)
            .then(([rows, fields]) => {
                console.table(rows);
            })
            .catch(console.log);
    };
}

module.exports = Employee;