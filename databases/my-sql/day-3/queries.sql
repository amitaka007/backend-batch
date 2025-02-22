-- Active: 1736351091953@@127.0.0.1@3306@amityuniversity
USE amityuniversity;

SET SQL_SAFE_UPDATES = 0;

CREATE TABLE student(
rollno INT PRIMARY KEY,
name VARCHAR(50),
marks INT NOT NULL,
grade VARCHAR(1),
city VARCHAR(20)
);

CREATE TABLE payment (
    customer_id INT PRIMARY KEY,
    customer VARCHAR(255),
    mode VARCHAR(50),
    city VARCHAR(100)
);

INSERT INTO payment (customer_id, customer, mode, city) VALUES
(101, 'Olivia Barrett', 'Netbanking', 'Portland'),
(102, 'Ethan Sinclair', 'Credit Card', 'Miami'),
(103, 'Maya Hernandez', 'Credit Card', 'Seattle'),
(104, 'Liam Donovan', 'Netbanking', 'Denver'),
(105, 'Sophia Nguyen', 'Credit Card', 'New Orleans'),
(106, 'Caleb Foster', 'Debit Card', 'Minneapolis'),
(107, 'Ava Patel', 'Debit Card', 'Phoenix'),
(108, 'Lucas Carter', 'Netbanking', 'Boston'),
(109, 'Isabella Martinez', 'Netbanking', 'Nashville'),
(110, 'Jackson Brooks', 'Credit Card', 'Boston');



INSERT INTO student (rollno, name, marks, grade, city) VALUES
(1, 'Aman Sharma', 85, 'A', 'Delhi'),
(2, 'Priya Verma', 92, 'A', 'Mumbai'),
(3, 'Rahul Mehta', 76, 'B', 'Chennai'),
(4, 'Anjali Gupta', 88, 'A', 'Kolkata'),
(5, 'Rohit Singh', 63, 'C', 'Jaipur'),
(6, 'Neha Kapoor', 95, 'A', 'Pune'),
(7, 'Arjun Reddy', 70, 'B', 'Hyderabad'),
(8, 'Kriti Jain', 81, 'A', 'Ahmedabad'),
(9, 'Vikram Malhotra', 55, 'D', 'Bangalore'),
(10, 'Sneha Roy', 89, 'A', 'Lucknow');

SELECT grade , COUNT(grade)
FROM student GROUP BY grade;

SELECT * FROM student;

SELECT DISTINCT grade FROM student;

-- 
SELECT * FROM student WHERE marks >= 80;
SELECT * FROM student WHERE marks > 90 OR city = "Mumbai";

SELECT * FROM student WHERE marks BETWEEN 80 AND 90;


SELECT * FROM student WHERE city  IN ("Delhi" , "Mumbai");


SELECT * FROM student ORDER BY marks DESC LIMIT 3;


SELECT AVG(marks) FROM student;


SELECT city , COUNT(name) FROM student GROUP BY city;

SELECT city , AVG(marks) FROM student GROUP BY city ORDER BY city ASC

SELECT mode , COUNT(mode) FROM payment GROUP BY mode 


SELECT city , COUNT(rollno) FROM student GROUP BY city HAVING MAX(marks) > 90;


-- update query

UPDATE student SET grade = "F" WHERE grade = 'A';

UPDATE student SET marks = marks +1;

-- Delete

DELETE from student WHERE marks < 70