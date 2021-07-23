const db = require('./db/connection');
const inquirer = require('inquirer');
const Role = require('./lib/Role');
const Department = require('./lib/Department');
const Employee = require('./lib/Employee');

const dept = new Department();
const emp = new Employee();
const role = new Role();

db.connect(err => {
    if (err) throw err;
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
}

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
                    dept.viewDepartments()
                        .then(() => {
                            promptQuestions();
                        })
                    break;
                case 'View all roles':
                    this.viewRoles();
                    break;
                case 'View all employees':
                    this.viewEmployees();
                    break;
                case 'Add a department':
                    dept.addDepartment()
                        .then(() => {
                            promptQuestions();
                        })
                    break;
                case 'Add a role':
                    break;
                case 'Add an employee':
                    break;
                case 'Update an employee role':
                    break;
            }
        })
};

start();