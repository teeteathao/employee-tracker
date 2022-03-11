// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'abc123',
      //   database
      database: 'employee_db'
    },
    console.log(`Connected to the employees_db database.`)
  );

//   Start prompts and choices 
  menuSelection = () => {
    inquirer.prompt([
        {
          name: 'menuSelection',
          type: 'list',
          message: 'What would you like to do?',
          choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update employee role',
          ],
        },
      ])
      .then((res) => {
        switch (res.menuSelection) {
          case 'View all departments':
            viewAllDepartments();
            break;
          case 'View all roles':
            viewAllRoles();
            break;
          case 'View all employees':
            viewAllEmployees();
            break;
          case 'Add a department':
            addDepartment();
            break;
          case 'Add a role':
            addRole();
            break;
          case 'Add an employee':
            addEmployee();
            break;
          case 'Update employee role':
            updateEmployeeRole();
            break;
        }
      });
  };

//  table of all departments
viewAllDepartments = () => {
    db.query(`SELECT * FROM department`, (err, result) => {
      if (err) throw err;
      console.table(result);
      menuSelection();
    });
  };
  
  // table of employee roles
  viewAllRoles = () => {
    db.query(`SELECT * FROM role`, (err, result) => {
      if (err) throw err;
      console.table(result);
      menuSelection();
    });
  };
  
  // table that includes the department and role of each of the employees
  viewAllEmployees = () => {
    db.query(
      `SELECT employee.id AS EMPLOYEE from employee, (employee.first_name, employee.last_name) AS EMPLOYEE from employee, department.name AS department`,
    //  role.title AS role, department.name AS department, role.salary, 
    // CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee;`,
      (err, result) => {
        if (err) throw err;
        console.table(result);
        menuSelection();
      }
    );
  };

  // add role and salary
addRole = () => {
    inquirer
      .prompt([
        {
          name: 'name',
          type: 'input',
          message: 'What is the name of the role?',
        },
        {
            // add salary value
          name: 'salary',
          type: 'number',
          message: 'What is the salary for the role?',
          validate: (salary) => {
            if (salary) {
              return true;
            } else {
              console.log('Enter numeric value');
              return false;
            }
          },
        },
        {
            // role  belongs to which department
          name: 'department_id',
          type: 'list',
          message: 'Which department does the role belong to?',
          // option: getDepartment(),
        },
      ])
      .then((res) => {
        db.query(
          `INSERT INTO role SET ?`,
          {
            title: res.role,
            salary: res.salary,
            department_id: res.department,
          },
          (err, res) => {
            if (err) throw err;
            console.log('Role added to the database');
            menuSelection();
          }
        );
      });
  };

  // add new department
addDepartment = () => {
    inquirer.prompt([
        {
          name: 'name',
          type: 'input',
          message: 'What is the name of the department?',
        },
      ])
      .then((res) => {
        db.query(
          `INSERT INTO department (department_name) VALUES (?)`,
          [res.name],
          (err, result) => {
            if (err) throw err;
            console.log('Add new department in the database');
          }
        );
        menuSelection();
      });
  };
  
  // add new employee, role, and manager
addEmployee = () => {
    inquirer.prompt([
        {
          name: 'firstName',
          type: 'input',
          message: "What is the employee's first name?",
        },
        {
          name: 'lastName',
          type: 'input',
          message: "What is the employee's last name?",
        },
        {
          name: 'role',
          type: 'list',
          message: "What is the employee's role?",
          choices: getRoles(),
        },
        {
          name: 'manager',
          type: 'list',
          message: "Who is the employee's manager?",
          choices: getManagers(),
        },
      ])
      .then((res) => {
        db.query(
          `INSERT INTO employee SET ?`,
          {
            first_name: res.firstName,
            last_name: res.lastName,
            role_id: res.role,
            manager_id: res.manager,
          },
          (err, res) => {
            if (err) throw err;
            console.log('Add new employee in the database');
            menuSelection();
          }
        );
      });
  };

  // update existing employee's role
updateRole = () => {
    inquirer
      .prompt([
        {
          name: 'employee',
          type: 'number',
          message: 'What is the employee ID',
        },
        {
          name: 'role',
          type: 'number',
          message: 'What is the role ID',
        },
      ])
      .then((res) => {
        db.query(
          `UPDATE employee SET role_id = ? WHERE id =?`,
          [res.role, res.employee],
          (err, result) => {
            if (err) throw err;
            console.log(result);
            viewAllEmployees();
          }
        );
      });
  };
  
  menuSelection();