# SQL Notes with Coding Examples

## WHERE Clause
The `WHERE` clause is used to filter records based on specific conditions. Operators like arithmetic, comparison, logical, and bitwise operators can be used.

### Using Operators in WHERE

1. **Arithmetic Operator**
   ```sql
   SELECT * FROM students
   WHERE marks + 10 > 90;
   ```

2. **Comparison Operator**
   ```sql
   SELECT * FROM students
   WHERE marks >= 90;
   ```

3. **Logical Operator**
   ```sql
   SELECT * FROM students
   WHERE marks > 90 AND city = 'Boston';
   ```


---

## ORDER BY Clause
The `ORDER BY` clause is used to sort the result set in ascending (`ASC`) or descending (`DESC`) order.

### Example:
```sql
SELECT * FROM students
ORDER BY marks DESC;
```

---

## Aggregate Functions
Aggregate functions perform calculations on a set of values and return a single value.

### Common Aggregate Functions:
1. `COUNT()`: Counts the number of rows.
   ```sql
   SELECT COUNT(*) AS student_count
   FROM students;
   ```

2. `MAX()`: Finds the maximum value.
   ```sql
   SELECT MAX(marks) AS highest_marks
   FROM students;
   ```

3. `MIN()`: Finds the minimum value.
   ```sql
   SELECT MIN(marks) AS lowest_marks
   FROM students;
   ```

4. `SUM()`: Calculates the total sum.
   ```sql
   SELECT SUM(marks) AS total_marks
   FROM students;
   ```

5. `AVG()`: Calculates the average value.
   ```sql
   SELECT AVG(marks) AS average_marks
   FROM students;
   ```

---

## GROUP BY Clause
The `GROUP BY` clause groups rows that have the same values into summary rows. Often used with aggregate functions.

### Example:
```sql
SELECT city, AVG(marks) AS avg_marks
FROM students
GROUP BY city;
```

---

## Practice Questions

1. **Find the average marks in each city in ascending order:**
   ```sql
   SELECT city, AVG(marks) AS avg_marks
   FROM students
   GROUP BY city
   ORDER BY avg_marks ASC;
   ```

2. **Count the number of students in each city where the maximum marks cross 90:**
   ```sql
   SELECT city, COUNT(*) AS student_count
   FROM students
   GROUP BY city
   HAVING MAX(marks) > 90;
   ```

---

## HAVING Clause
The `HAVING` clause applies conditions after grouping the data, unlike `WHERE`, which applies to rows before grouping.

### Example:
```sql
SELECT city, AVG(marks) AS avg_marks
FROM students
GROUP BY city
HAVING AVG(marks) > 80;
```

---

## General SQL Query Execution Order
1. `SELECT column(s)`
2. `FROM table_name`
3. `WHERE condition`
4. `GROUP BY column(s)`
5. `HAVING condition`
6. `ORDER BY column(s)`

---

## Foreign Keys and Cascading
Foreign keys link two tables and enforce referential integrity. Cascading ensures changes in one table propagate to related tables.

### Example:
#### Create Tables:
```sql
CREATE TABLE departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(100)
);

CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(100),
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
```

#### Insert Data:
```sql
INSERT INTO departments (dept_id, dept_name) VALUES
(1, 'HR'),
(2, 'IT'),
(3, 'Finance');

INSERT INTO employees (emp_id, emp_name, dept_id) VALUES
(101, 'Alice', 1),
(102, 'Bob', 2),
(103, 'Charlie', 3);
```

#### Cascade Effect:
- If a department is deleted, all employees in that department are also deleted.
- If a department ID is updated, it updates the `dept_id` in the employees table.

---


