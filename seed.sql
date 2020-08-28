USE employee_trackerDB;

INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Human Resource");


INSERT INTO role (title, salary, department_id)
VALUES ("Sales Executive", 150000, 1),
       ("Salesman", 75000, 1),
       ("Lead Engineer", 150000, 2),
       ("Engineer", 120000, 2),
       ("Accountant", 100000, 3),
       ("HR Manager", 100000, 4),
       ("HR Rep", 80000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jane", "Doe", 1, 1),
       ("John", "Smith", 3, null),
       ("Geralt", "Rivia", 2, 2),
       ("Yennever", "Vengerberg",3, null);

       UPDATE employee SET role_id = 6 WHERE id = 3;


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

       
