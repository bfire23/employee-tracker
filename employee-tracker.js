const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table")







const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    password: "root",
  database: "employee_trackerDB"
});


connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
  });