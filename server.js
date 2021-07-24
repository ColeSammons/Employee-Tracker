const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

db.connect(err => {
    if (err) throw err;
    start();
});

async function start() {
    console.log(`
        -----------------------------------------------------
        |  ______                 _                         |
        | |  ____|               | |                        |
        | | |__   _ __ ___  _ __ | | ___  _   _  ___  ___   |
        | |  __| | '_ \` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\  |
        | | |____| | | | | | |_) | | (_) | |_| |  __/  __/  |
        | |______|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|  |
        |                  | |             __/ |            |
        |   _____          |_|            |___/             |
        |  / ____|                         | |              |
        | | |  __  ___ _ __   ___ _ __ __ _| |_ ___  _ __   |
        | | | |_ |/ _ \\ '_ \\ / _ \\ '__/ _\` | __/ _ \\| '__|  |
        | | |__| |  __/ | | |  __/ | | (_| | || (_) | |     | 
        |  \\_____|\\___|_| |_|\\___|_|  \\__,_|\\__\\___/|_|     |
        -----------------------------------------------------
        
        `
    );

    promptQuestions();
};

const promptQuestions = () => {
    const question = [
        {
            type: 'list',
            name: 'choose',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        }
    ]
    inquirer.prompt(question)
        .then((response) => {
            switch (response.choose) {
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all employees':
                    viewEmployees()
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    break;
                case 'Update an employee role':
                    break;
            }
        })
};

function viewDepartments() {
    const sql = `SELECT id, dept_name AS department FROM departments;`;

    db.query(sql, (err, results) => {
        if (err) throw err;
        console.table(results);
        promptQuestions();
    })
};

async function viewRoles() {
    const sql = `SELECT r.id, r.title, r.salary, d.dept_name AS department
                FROM roles r
                LEFT JOIN departments d
                ON r.department_id = d.id;`;

    db.query(sql, (err, results) => {
        if (err) throw err;
        console.table(results);
        promptQuestions();
    })
};

function viewEmployees() {
    const sql = `SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.dept_name AS department, CONCAT(m.first_name, ' ', m.last_name) AS manager
                FROM employees e
                LEFT JOIN roles r
                ON e.role_id = r.id
                LEFT JOIN departments d
                ON r.department_id = d.id
                LEFT JOIN employees m
                ON e.manager_id = m.id`;

    db.query(sql, (err, results) => {
        if (err) throw err
        console.table(results);
        promptQuestions();
    })
};

async function addDepartment() {
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

    db.query(sql, param, (err, results) => {
        if (err) throw err;
        console.log(`\n ${response.newDept} successfully added to the database.\n`);
        promptQuestions();
    });
};

function addRole() {
    let deptArray = [];
    db.promise().query('SELECT * FROM departments')
        .then(([rows, fields]) => {
            deptArray = rows;
        });

    inquirer.prompt([{
        type: 'input',
        message: "Enter the name of the role.",
        name: 'roleName',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log("Please enter the role's name!");
                return false;
            }
        }
    },
    {
        type: 'input',
        message: "Enter the salary of the role.",
        name: 'roleSalary',
        validate: salaryInput => {
            if (salaryInput) {
                return true;
            } else {
                console.log("Please enter the role's salary!");
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'chooseDept',
        message: 'What would you like to do?',
        choices: function () {
            let array = deptArray.map(data => data.dept_name);
            return array;
        }
    }
    ])
        .then((response) => {
            const deptChosen = deptArray.filter(chosen => chosen.dept_name === response.chooseDept);
            const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ? , ?)`;
            const params = [response.roleName, response.roleSalary, deptChosen[0].id];

            db.query(sql, params, (err, result) => {
                if (err) reject('Error inserting results');
                console.log(`\n${response.roleName} successfully added to database.\n`)
                promptQuestions();
            });
        })
};

