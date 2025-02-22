### **Database Notes**

---

#### **1. What is a Database (DB)?**
A database is an organized collection of data stored electronically for easy access, management, and modification. Databases are used to efficiently handle, query, and manipulate structured and unstructured data. 

- **Examples**: Employee records, customer details, product inventories, etc.
- **Key Features**:
  - Data storage and retrieval
  - Scalability
  - Security
  - Backup and recovery

---

#### **2. Types of Databases**
1. **Relational Database**: Organizes data into tables with rows and columns. 
   - Examples: MySQL, PostgreSQL, Oracle, SQL Server.
   
2. **NoSQL Database**: Stores unstructured data like JSON, documents, or key-value pairs.
   - Examples: MongoDB, CouchDB, Cassandra, Redis.



---

#### **3. Installing MySQL on Windows and Mac**
##### **Windows Installation**
1. Download MySQL Installer from [MySQL official site](https://dev.mysql.com/downloads/installer/).
2. Run the installer and choose the "Custom" or "Developer Default" installation.
3. Configure server settings:
   - Set root password.
   - Configure port (default: 3306).
4. Complete the installation and verify by running `mysql` in the terminal or command prompt.

##### **Mac Installation**
1. Install MySQL using **Homebrew**:
   ```bash
   brew install mysql
   ```
2. Start the MySQL server:
   ```bash
   brew services start mysql
   ```
3. Secure installation:
   ```bash
   mysql_secure_installation
   ```
4. Verify installation:
   ```bash
   mysql --version
   ```

---

#### **4. Database Structures**
- **Schemas**: Defines the logical structure of the database (e.g., tables, columns, data types, relationships).
- **Tables**: Organizes data into rows and columns.
- **Indexes**: Improves query performance by indexing specific columns.
- **Views**: Virtual tables derived from queries.
- **Relationships**:
  - One-to-One
  - One-to-Many
  - Many-to-Many

---

#### **5. What is a Table?**
A table is a collection of data in a database, structured into rows (records) and columns (fields). Each column represents an attribute, and each row represents a data record.

- **Example**:
  | ID | Name  | Age | Email            |
  |----|-------|-----|------------------|
  | 1  | John  | 25  | john@example.com |
  | 2  | Sarah | 30  | sarah@example.com |

---

#### **6. Commands to Create and Delete a Database**
- **Create a Database**:
  ```sql
  CREATE DATABASE database_name;
  ```
- **Delete a Database**:
  ```sql
  DROP DATABASE database_name;
  ```

---

#### **7. Command to Create a Table**
```sql
CREATE TABLE table_name (
    column1_name datatype constraints,
    column2_name datatype constraints,
    ...
);
```
- **Example**:
  ```sql
  CREATE TABLE students (
      student_id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      age INT CHECK(age > 0),
      email VARCHAR(100) UNIQUE
  );
  ```

---

#### **8. SQL Data Types**
- **Numeric Types**:
  - `INT`: Integer values.
  - `DECIMAL(p, s)`: Fixed-point numbers.
  - `FLOAT`, `DOUBLE`: Approximate floating-point numbers.

- **String Types**:
  - `CHAR(n)`: Fixed-length string.
  - `VARCHAR(n)`: Variable-length string.
  - `TEXT`: Large text data.

- **Date and Time Types**:
  - `DATE`: Stores only the date (e.g., `YYYY-MM-DD`).
  - `TIME`: Stores only the time (e.g., `HH:MM:SS`).
  - `DATETIME`: Stores both date and time.

- **Boolean Types**:
  - `BOOLEAN` or `BOOL`: Stores `TRUE` or `FALSE` values.

- **Binary Types**:
  - `BLOB`: Binary large objects for storing images, files, etc.

---
