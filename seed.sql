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
VALUES ("Jane", "Doe", 10, 5),
       ("John", "Smith", 12, null),
       ("Geralt", "Rivia", 15, 8),
       ("Yennever", "Vengerberg",13, null);
       
