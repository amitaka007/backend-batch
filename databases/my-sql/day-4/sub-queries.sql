-- Active: 1736351091953@@127.0.0.1@3306@amityuniversity
-- sqL SUB qUERIES


-- *Used in where

-- Find the marks of student which is above average
SELECT full_name , marks FROM student WHERE marks > (SELECT AVG(marks) FROM student);

-- Find the names of all students with even roll numbers;



SELECT full_name ,rollno FROM student WHERE rollno IN (SELECT rollno from student WHERE rollno % 2 = 0)


-- *Use in from

-- Find the max marks from the students of delhi
-- step-1 find the students of delhi
-- step-2 find their max marks using the sublist in step1

    SELECT MAX(marks) FROM ( SELECT * from student WHERE city = 'Delhi') as temp