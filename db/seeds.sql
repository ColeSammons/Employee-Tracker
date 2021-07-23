INSERT INTO departments (dept_name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Sales Lead', '100,000', 1),
    ('Salesperson', '75,000', 1),
    ('Lead Engineer', '150,000', 2),
    ('Software Engineer', '90,000', 2),
    ('Lead Accountant', '120,000', 3),
    ('Accountant', '85,000', 3),
    ('Lead Lawyer', '140,000', 1),
    ('Lawyer', '100,000', 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Benny', 'Hana', 1, NULL),
    ('Mick', 'McAllister', 3, NULL),
    ('Linda', 'Grant', 5, NULL),
    ('Billy', 'Bob', 7, NULL),
    ('Jane', 'Doe', 2, 1),
    ('Jerry', 'Wong', 2, 1),
    ('Faye', 'Valentine', 4, 3),
    ('Amber', 'Dorfin', 4, 3),
    ('Spike', 'Speigel', 6, 5),
    ('Jamal', 'Smith', 6, 5),
    ('Carol', 'Grey', 8, 7),
    ('Jet', 'Black', 8, 7);
