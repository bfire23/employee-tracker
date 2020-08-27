const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const { response } = require("express");




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
      type: "rawlist",
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
  const query = "SELECT  * FROM departments";
  connection.query(query, function (err, res) {
    console.log("Departments Retrieved from Database");
    console.table(response);
  });

  runQuestions();
}



function viewAllEmployee() {
  const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;";
  connection.query(query, function (err, res) {
    console.log("employees Retrieved from Database");
    console.table(response);

  });
  runQuestions();
}



function viewAllRoles() {
  const query = "SELECT  * FROM role";
  connection.query(query, function (err, res) {
    console.log("Roles Retrieved from Database");
    console.table(response);
  });

  runQuestions();
}


function addDepartment() {
  inquirer.prompt(
    {
      type: "input",
      name: "departName",
      message: "Please add new department"
    }
  )

    .then(function(response) {
      const query = "INSERT INTO department (name) VALUES";
      connection.query(query, [response.departName], function(err, res) {
        if (err) { 
        throw err;
        }
        console.log("Department Added");
        console.table(response);
      });
      runQuestions();
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
      }
    ])

  .then(function(response) {
    const query = "INSERT INTO employee SET";
    connection.query(query, [response.first_name, response.last_name], function(err,res) {
      if (err) {
        throw err;
      }
      console.log("Added Employee");
      console.table(response);
    });
    runQuestions();
  })
}



function addRoles() {
  inquirer.prompt(
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
  )

  .then(function(response) {
    const query = "INSERT INTO role SET ?";
    connection.query(query, [response.addTitle, response.addSalary, response.addDepartmentId], function(err,res) {
      if (err) {
        throw err;
      }
      console.log("Added Role");
      console.table(response);
    })
    runQuestions();
  })
      
}








