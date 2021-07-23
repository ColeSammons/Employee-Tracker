const db = require('../db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

class Department {
    constructor() { }

    async viewDepartments() {
        const sql = `SELECT id, dept_name AS department FROM departments;`;

        return new Promise((resolve, reject) => {
            db.query(sql, (err, results) => {
                if (err) reject('Error retrieving results');
                console.table(results);
                resolve();
            })
        })
    };

    async addDepartment() {
        const question = [{
            type: 'input',
            message: "Enter the department's name.",
            name: 'newDept',
            validate: deptInput => {
                if (deptInput) {
                    return true;
                } else {
                    console.log("Please enter a department name!");
                    return false;
                }
            }
        }];

        const sql = `INSERT INTO departments (dept_name) VALUES (?)`;
        let response = await inquirer.prompt(question);
        const param = [response.newDept];
        
        return new Promise((resolve, reject) => {
            db.query(sql, param, (err, results) => {
                if (err) reject('Error retrieving results');
                resolve();
            })
        })
    }

}

module.exports = Department;