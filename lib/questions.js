const questions = {
    initQ: [
        {
            type: 'list',
            name: 'choose',
            message: 'What would you,like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        }
    ],
    departmentQ: [
        {
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
        }
    ]
}

module.exports = questions;