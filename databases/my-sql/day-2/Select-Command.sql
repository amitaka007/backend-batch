CREATE DATABASE amityuniversity;

USE amityuniversity;

CREATE TABLE student(
rollno INT PRIMARY KEY,
name VARCHAR(50),
marks INT NOT NULL,
grade VARCHAR(1),
city VARCHAR(20)
);

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


SELECT DISTINCT city FROM student;

SELECT * FROM student WHERE MARKS > 80 AND CITY = "Delhi"; 
