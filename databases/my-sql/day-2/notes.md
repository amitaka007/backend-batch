

### 1. Types of Commands in SQL✅

SQL commands are classified into five main categories based on their functionality:

#### **a. Data Definition Language (DDL)**
These commands are used to define or modify the structure of database objects, such as tables, views, and indexes.
- **CREATE**: Used to create a new database object (table, index, etc.).
- **ALTER**: Used to modify the structure of an existing database object.
- **DROP**: Used to delete database objects.
- **TRUNCATE**: Used to remove all records from a table but keeps the structure.
- **RENAME**: Used to rename a database object.

#### **b. Data Manipulation Language (DML)**
These commands are used to manipulate data in the database.
- **INSERT**: Used to insert new records into a table.
- **UPDATE**: Used to modify existing records.
- **DELETE**: Used to remove records from a table.



#### **c. Data Control Language (DCL)** (accounts , marks)
These commands are used to control access to data.
- **GRANT**: Used to give users access privileges.
- **REVOKE**: Used to remove access privileges from a user.

#### **d. Transaction Control Language (TCL)**
These commands manage transactions in the database.
- **COMMIT**: Used to save changes made by the transaction.
- **ROLLBACK**: Used to undo changes made by the transaction.
- **SAVEPOINT**: Sets a savepoint within a transaction.
- **SET TRANSACTION**: Used to set the properties of a transaction.


#### **e. Data Query Language ( DQL)**
   - **SELECT**
---

### 2. Practice Question✅

Write an SQL query to:
1. Create a table called `Employees` with the following columns:
   - `EmployeeID` (integer, primary key)
   - `FirstName` (varchar, 50)
   - `LastName` (varchar, 50)
   - `Age` (integer)
   - `Salary` (decimal)
2. Insert a new record into the `Employees` table:
   - `EmployeeID = 1`, `FirstName = 'John'`, `LastName = 'Doe'`, `Age = 30`, `Salary = 60000`

**Answer:**

```sql
CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Age INT,
    Salary DECIMAL
);

INSERT INTO Employees (EmployeeID, FirstName, LastName, Age, Salary)
VALUES (1, 'John', 'Doe', 30, 60000);
```

---

### 3. Keys (Primary and Foreign Keys)✅

#### **Primary Key**
- A primary key is a field or a combination of fields that uniquely identify a record in a table.
- A table can only have one primary key.
- It ensures that the values in the primary key columns are unique and not NULL.

#### **Foreign Key**
- A foreign key is a field in one table that uniquely identifies a row of another table.
- It creates a relationship between two tables.
- Foreign keys can contain duplicate values, but they must reference valid primary keys from another table.

**Example:**
- Table `Orders` has a foreign key `CustomerID` which references `CustomerID` in the `Customers` table.

```sql
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    CustomerID INT,
    OrderDate DATE,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);
```

---

### 4. Constraints

SQL constraints are used to specify rules for data in a table. The common constraints are:
Here are examples of each constraint you mentioned, showing how they are used in SQL:

### 1. **NOT NULL**
   Ensures that a column cannot have NULL values.
   ```sql
   CREATE TABLE Employees (
       EmployeeID INT NOT NULL,
       Name VARCHAR(100),
       Age INT
   );
   ```

### 2. **UNIQUE**
   Ensures that all values in a column are different.
   ```sql
   CREATE TABLE Employees (
       EmployeeID INT NOT NULL,
       Email VARCHAR(100) UNIQUE,
       Name VARCHAR(100)
   );
   ```

### 3. **PRIMARY KEY**
   A combination of NOT NULL and UNIQUE that uniquely identifies each record.
   ```sql
   CREATE TABLE Employees (
       EmployeeID INT PRIMARY KEY,
       Name VARCHAR(100),
       Age INT
   );
   ```

### 4. **FOREIGN KEY**
   Ensures that the values in one column correspond to valid values in another table.
   ```sql
   CREATE TABLE Departments (
       DepartmentID INT PRIMARY KEY,
       DepartmentName VARCHAR(100)
   );
   
   CREATE TABLE Employees (
       EmployeeID INT PRIMARY KEY,
       Name VARCHAR(100),
       DepartmentID INT,
       FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
   );
   ```

### 5. **CHECK**
   Ensures that values in a column meet a specific condition.
   ```sql
   CREATE TABLE Employees (
       EmployeeID INT PRIMARY KEY,
       Name VARCHAR(100),
       Age INT,
       CHECK (Age >= 18) -- Ensures that age is 18 or older
   );
   ```

### 6. **DEFAULT**
   Provides a default value for a column when no value is specified.
   ```sql
   CREATE TABLE Employees (
       EmployeeID INT PRIMARY KEY,
       Name VARCHAR(100),
       Age INT DEFAULT 30 -- Default age is 30 if no value is provided
   );
   ```



These are common SQL constraints used to ensure data integrity, improve performance, and define relationships between tables.
Example of applying constraints in table creation:

```sql
CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Age INT CHECK (Age > 18),
    Salary DECIMAL DEFAULT 50000
);
```

---

### 5. `SELECT` Statement

The `SELECT` statement is used to query data from a database. You can use various clauses with `SELECT` to filter and organize the results.

#### Basic Syntax:

```sql
SELECT column1, column2, ...
FROM table_name;
```

#### Example:

```sql
SELECT FirstName, LastName FROM Employees;
```

#### Select All Columns:

```sql
SELECT * FROM Employees;
```

#### Using `DISTINCT` to eliminate duplicates:

```sql
SELECT DISTINCT Salary FROM Employees;
```

---

### 6. Clauses in SQL

SQL clauses help filter and organize the data retrieved by the `SELECT` statement.

- **WHERE**: Filters records based on a condition.
- **ORDER BY**: Sorts the results in ascending or descending order.
- **GROUP BY**: Groups records that have the same values in specified columns.
- **HAVING**: Filters records after `GROUP BY`.
- **LIMIT**: Restricts the number of records returned.

#### Example:

```sql
SELECT FirstName, LastName 
FROM Employees 
WHERE Age > 25
ORDER BY Salary DESC 
LIMIT 5;
```

---

### 7. Operators (AND, IN, LIMIT)

#### **AND** Operator:
The `AND` operator is used to combine multiple conditions in a `WHERE` clause. All conditions must be true for the record to be included.

Example:

```sql
SELECT * FROM Employees 
WHERE Age > 30 AND Salary > 50000;
```

#### **IN** Operator:
The `IN` operator is used to specify multiple values in a `WHERE` clause. It is a shorthand for multiple `OR` conditions.

Example:

```sql
SELECT * FROM Employees 
WHERE Age IN (25, 30, 35);
```

#### **LIMIT**:
The `LIMIT` clause is used to specify the number of records to return from a query. This is useful for pagination.

Example:

```sql
SELECT * FROM Employees
LIMIT 10;
```

You can also combine `LIMIT` with `OFFSET` for pagination:

```sql
SELECT * FROM Employees
LIMIT 10 OFFSET 20;
```
ding of SQL basics. Let me know if you need more examples or further clarification on any topic!