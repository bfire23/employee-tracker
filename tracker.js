const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
// const { response } = require("express");




const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employee_trackerDB"
});


connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  runQuestions();
});



function runQuestions() {
  inquirer.prompt(
    {
      type: "list",
      name: "beginQ",
      message: "What would you like to do",
      choices: [
        "view all departments",
        "view all employees",
        "view all roles",
        "add department",
        "add employee",
        "add roles",
        "update employee roles"
      ]
    }
  )


    .then(function (response) {
      console.log(response);

      switch (response.beginQ) {
        case "view all departments":
          viewAllDepartments();
          break;

        case "view all employees":
          viewAllEmployee();
          break;

        case "view all roles":
          viewAllRoles();
          break;

        case "add department":
          addDepartment();
          break;

        case "add employee":
          addEmployee();
          break;

        case "add roles":
          addRoles();
          break;

        case "update employee roles":
          updateEmployeeRoles();
          break;

      }
    });

}

function viewAllDepartments() {
  const query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    console.table(res);
    runQuestions();
  });

}



function viewAllEmployee() {
  const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, + department.name, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;";
  connection.query(query, function (err, res) {
    console.log("employees Retrieved from Database");
    console.table(res);
    runQuestions();

  });
}



function viewAllRoles() {
  const query = "SELECT  * FROM role";
  connection.query(query, function (err, res) {
    console.log("Roles Retrieved from Database");
    console.table(res);
    runQuestions();
  });

}


function addDepartment() {
  inquirer.prompt(
    {
      type: "input",
      name: "departName",
      message: "Please add new department"
    }
  )

    .then(function (response) {
      const query = "INSERT INTO department SET ?";
      connection.query(query, { name: response.departName }, function (err, res) {
        if (err) throw err;
        console.log("Department Added");
        console.table(response);
        runQuestions();
      });
    })
}


function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter employee first name",
        name: "first_name"
      },
      {
        type: "input",
        message: "Enter employee last name",
        name: "last_name"
      },
      {
        type: "input",
        message: "Enter the employee's role id",
        name: "role_id"
      },
      {
        type: "input",
        message: "Enter employee's manager_id",
        name: "manager_id"
      }
    ])

    .then(function (response) {
      const query = "INSERT INTO employee SET ?";
      connection.query(query, { first_name: response.first_name, last_name: response.last_name, role_id: response.role_id, manager_id: response.manager_id }, function (err, res) {
        if (err) {
          throw err;
        }
        console.log("Added Employee");
        console.table(response);
        runQuestions();
      });
    })
}



function addRoles() {
  inquirer.prompt([
    {
      type: "input",
      name: "addTitle",
      message: "enter employee title"
    },
    {
      type: "input",
      name: "addSalary",
      message: "enter employee salary"
    },
    {
      type: "input",
      name: "addDepartmentId",
      message: "enter employee department id"
    }
  ]
  )


    .then(function (response) {
      const query = "INSERT INTO role SET ?";
      connection.query(query, { title: response.addTitle, salary: response.addSalary, department_id: response.addDepartmentId }, function (err, res) {
        if (err) {
          throw err;
        }
        console.log("Added Role");
        console.table(response);
        runQuestions();
      })
    })

}


function updateEmployeeRoles() {
  connection.query("SELECT first_name, last_name, id FROM employees",
    function (err, res) {
      for (let i=0; i <res.length; i++){
        employees.push(res[i].first_name + " " + res[i].last_name);
      }
      let employees = res.map(employee => ({ name: employee.first_name + " " + employee.last_name, value: employee.role_id }))

      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeName",
            message: "Which employee's role would you like to update?",
            choices: employee
          },
          {
            type: "input",
            name: "role",
            message: "What is your new role?"
          }
        ])
        .then(function (res) {
          connection.query("UPDATE employee SET role_id = ${res.role} WHERE id = ${res.employeeName}",
            function (err, res) {
              console.log(res);

              runQuestions();
            }
          );
        })
    }
  )
}












