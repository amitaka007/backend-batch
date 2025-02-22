-- Active: 1736351091953@@127.0.0.1@3306@amityuniversity
SELECT * FROM student;

-- *ADD COLUMN

ALTER TABLE student ADD COLUMN age INT;


-- *DROP COLUMN

ALTER TABLE student  DROP COLUMN age;


-- *rename table
ALTER TABLE surajtable RENAME to student;


-- *change column(rename)
--*alter table table_name change column old_name new_name new_datatype new_constraint;

-- *MODIFY COLUMNS (MODIFY DATA TYPE/ CONSTRAINTS)

-- *ALTER TABLE table_name MODIFY col_name new_datatype new_constraint;


--- **ADD COLUMN
ALTER TABLE student 
ADD COLUMN age INT NOT NULL  DEFAULT 19;

--- ** MODIFY COLUMN
ALTER TABLE student 
MODIFY COLUMN age VARCHAR(2)


--- ** CHANGE COLUMN (RENAME)
ALTER Table student
CHANGE age stu_age INT

--- ** DROP COLUMN

ALTER dTable student
DROP COLUMN stu_age;

--- ** RENAME TABLE
ALTER TABLE student RENAME to stu;
