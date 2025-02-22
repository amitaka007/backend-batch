-- Active: 1736351091953@@127.0.0.1@3306@amityuniversity
-- truncate delte the data of the table

TRUNCATE TABLE student;

-- Practice questions

-- os: in the student TABLE
--     change the name of the column "name" to "full_name"
--     delete all the students who scored marks less than 80.
--     delete the column for grade

ALTER Table student 
CHANGE name full_name VARCHAR(50)  


DELETE FROM student WHERE marks < 80

ALTER TABLE student
DROP COLUMN grade

