-- Active: 1736351091953@@127.0.0.1@3306@amityuniversity

CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(50)
)

INSERT INTO students (id ,  name)
VALUES 
(101 , "Adam"),
(102 , "Bob"),
(103 , "Casey")

CREATE TABLE course(
    id INT PRIMARY KEY,
    course VARCHAR(50)
)

INSERT INTO course (id , course)
    VALUES 
    (102 , "English"),
    (105 , "Maths"),
    (103 , "Science"),
    (107 , "Computer Science")


    -- Inner Joins

    SELECT * FROM students INNER JOIN course ON students.id = course.id

    -- Left Joins

    SELECT * FROM students LEFT JOIN course ON students.id = course.id


-- -right joins

 SELECT * FROM students RIGHT JOIN course ON students.id = course.id

--  -- full Join

    SELECT * FROM students LEFT JOIN course ON students.id = course.id
    UNION  SELECT * FROM students RIGHT JOIN course ON students.id = course.id

    -- left exclusive and right exclusive join ND SELF JOIN s ( assignment
    