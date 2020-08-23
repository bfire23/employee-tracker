const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table")




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


  .then(function(response) {
    console.log(response);

    switch(response.beginQ) {
      case "view all departments":
        viewAllDepartments();
        break;

      case "view all employees":
        viewAllEmployees();
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
          
    };
  })
 

}
  






