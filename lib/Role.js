const db = require('../db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

class Role {
    constructor() { }

    async viewRoles() {
        const sql = `SELECT r.id, r.title, r.salary, d.dept_name AS department
                    FROM roles r
                    LEFT JOIN departments d
                    ON r.department_id = d.id;`;
        return new Promise((resolve, reject) => {
            db.query(sql, (err, results) => {
                if (err) reject('Error retrieving results');
                console.table(results);
                resolve();
            })
        })
    };

    async addRole() {
        let response = await inquirer.prompt(questions.roleQ);
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
        const param = [response, response, response]
        db.query(sql, param, () => {
            console.log('success');
        });
    };
}

module.exports = Role;