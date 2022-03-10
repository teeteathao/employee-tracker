-- department
INSERT INTO department (department_name)
VALUES ("Administration"),
       ("Technical"),
       ("Sales"),
       ("Marketing");

-- role
INSERT INTO role (title, salary, department_id)
VALUES (Administrative Assistant, 60000, 1),
       (IT Support, 80000, 2),
       (Sales Associate, 50000, 3),
       (Marketing Director, 70000, 4),
       (Accountant, 80000, 1),
       (Engineer, 90000, 2),
       (Researcher, 90000, 4);

-- employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Gerald", "Gin", 2, NULL),
        ("Alanna", "Apple", 4, NULL),
        ("Don", "Donut", 1, NULL),
        ("Steven", "Soup", 5, NULL),
        ("Nina", "Nine", 4, NULL),
        ("Beatrice", "Brownie", 6, NULL),
        ("Patty", "Pancake", 3, NULL),
        ("Tanya", "Tangerine", 7, NULL),

