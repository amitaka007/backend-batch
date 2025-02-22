### **SQL Subqueries: Notes with Examples**

A **subquery** is a query nested within another query. Subqueries are useful for solving complex problems by breaking them into smaller, manageable parts. They are enclosed in parentheses `()` and can be used in different clauses like `WHERE`, `FROM`, and `SELECT`.

---

### **Types of Subqueries**

1. **Single-row Subqueries**: Return a single value (e.g., MAX, AVG, or COUNT).
2. **Multi-row Subqueries**: Return multiple values (e.g., a list of values).
3. **Correlated Subqueries**: Refer to columns in the outer query and execute once for every row in the outer query.

---

### **1. Subquery in `WHERE` Clause**

Subqueries in the `WHERE` clause are used to filter rows based on a condition calculated in the subquery.

#### **Example 1: Find the marks of students above the average.**
```sql
SELECT full_name, marks 
FROM student 
WHERE marks > (SELECT AVG(marks) FROM student);
```
- **Inner Query:** `(SELECT AVG(marks) FROM student)` calculates the average marks.
- **Outer Query:** Filters students with marks greater than the average.

---

#### **Example 2: Find the names of all students with even roll numbers.**
```sql
SELECT full_name, rollno 
FROM student 
WHERE rollno IN (SELECT rollno FROM student WHERE rollno % 2 = 0);
```
- **Inner Query:** `(SELECT rollno FROM student WHERE rollno % 2 = 0)` retrieves all even roll numbers.
- **Outer Query:** Returns student names matching these roll numbers.

---

### **2. Subquery in `FROM` Clause**

Subqueries in the `FROM` clause create a temporary table (a derived table) that can be queried by the outer query.

#### **Example: Find the maximum marks of students from Delhi.**
```sql
SELECT MAX(marks) 
FROM (SELECT * FROM student WHERE city = 'Delhi') AS temp;
```
- **Step 1 (Inner Query):** `SELECT * FROM student WHERE city = 'Delhi'` filters students from Delhi.
- **Step 2 (Outer Query):** `SELECT MAX(marks)` finds the maximum marks among these students.
- **Alias (`AS temp`):** Used to reference the subquery as a table.

---

### **3. Subquery in `SELECT` Clause**

Subqueries in the `SELECT` clause return a calculated value for each row in the result set.

#### **Example: Add a column to show the average marks of all students.**
```sql
SELECT full_name, marks, (SELECT AVG(marks) FROM student) AS average_marks 
FROM student;
```
- The subquery calculates the overall average marks.
- The result is displayed alongside each student's marks.

---

### **4. Correlated Subqueries**

A **correlated subquery** references columns from the outer query and is executed once for every row in the outer query.

#### **Example: Find students with marks above the average of their class.**
```sql
SELECT full_name, marks, class 
FROM student AS s1 
WHERE marks > (SELECT AVG(marks) FROM student AS s2 WHERE s1.class = s2.class);
```
- The subquery calculates the average marks for the current student's class (`s1.class = s2.class`).

---

### **Subquery vs. Joins**

- **When to use Subqueries:** 
  - When you need a temporary calculation.
  - For readability in simple scenarios.
- **When to use Joins:** 
  - For combining data from multiple tables efficiently.

---

### **Best Practices for Subqueries**

1. **Optimize Performance:**
   - Avoid unnecessary subqueries if the same result can be achieved with joins.
   - Use indexed columns in subqueries to enhance performance.

2. **Use Aliases:** 
   - Name the derived table for clarity and usability (e.g., `AS temp`).

3. **Avoid Correlated Subqueries for Large Datasets:**
   - Correlated subqueries can be slow for large tables as they execute repeatedly.

---

### **Summary Table of Subquery Usage**

| Clause      | Description                                                     | Example Query                          |
|-------------|-----------------------------------------------------------------|----------------------------------------|
| `WHERE`     | Filters rows based on a subquery result.                        | `WHERE marks > (SELECT AVG(marks))`    |
| `FROM`      | Treats the subquery as a temporary table.                       | `FROM (SELECT * FROM student)`         |
| `SELECT`    | Adds calculated data as a column in the result set.             | `(SELECT AVG(marks)) AS average_marks` |
| Correlated  | Executes the subquery for each row in the outer query.          | `WHERE marks > (SELECT AVG(...))`      |

