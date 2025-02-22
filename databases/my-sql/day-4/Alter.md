

## **SQL `ALTER` Command**✅

The `ALTER` command is used to modify the structure of an existing table. It allows you to add, delete, or modify columns in a table, as well as rename columns or the table itself.

---

### **1. Adding a New Column**

To add a new column to an existing table, use the `ADD COLUMN` clause.

#### Syntax:
```sql
ALTER TABLE table_name 
ADD COLUMN column_name datatype [constraints];
```

#### Example:
```sql
-- Adding a new column 'age' with data type INT and default value 19.
ALTER TABLE student 
ADD COLUMN age INT NOT NULL DEFAULT 19;
```

**Explanation:**
- `NOT NULL` ensures the column cannot store `NULL` values.
- `DEFAULT 19` sets the default value of the `age` column to 19.

---

### **2. Dropping a Column**

To remove a column from a table, use the `DROP COLUMN` clause.

#### Syntax:
```sql
ALTER TABLE table_name 
DROP COLUMN column_name;
```

#### Example:
```sql
-- Dropping the 'age' column from the 'student' table.
ALTER TABLE student 
DROP COLUMN age;
```

**Note:** Dropping a column permanently deletes its data, so use it carefully.

---

### **3. Renaming a Table**

To rename an existing table, use the `RENAME` clause.

#### Syntax:
```sql
ALTER TABLE old_table_name 
RENAME TO new_table_name;
```

#### Example:
```sql
-- Renaming table 'student' to 'stu'.
ALTER TABLE student 
RENAME TO stu;
```

---

### **4. Renaming a Column**

To rename a column, use the `CHANGE` clause. This also allows you to modify its data type and constraints.

#### Syntax:
```sql
ALTER TABLE table_name 
CHANGE old_column_name new_column_name new_datatype [new_constraints];
```

#### Example:
```sql
-- Renaming column 'age' to 'stu_age' and changing its datatype to INT.
ALTER TABLE student 
CHANGE age stu_age INT;
```

---

### **5. Modifying a Column**

To change a column's data type or constraints without renaming it, use the `MODIFY` clause.

#### Syntax:
```sql
ALTER TABLE table_name 
MODIFY column_name new_datatype [new_constraints];
```

#### Example:
```sql
-- Modifying the data type of 'stu_age' to VARCHAR(2).
ALTER TABLE student 
MODIFY COLUMN stu_age VARCHAR(2);
```

**Key Points:**
- Use `MODIFY` when the column name remains the same.
- Ensure the new data type is compatible with existing data.

---

### **6. Adding Multiple Columns**

You can add multiple columns in a single statement by separating them with commas.

#### Example:
```sql
ALTER TABLE student 
ADD COLUMN address VARCHAR(255),
ADD COLUMN phone_number VARCHAR(15);
```

---

### **7. Dropping Multiple Columns**

Some databases (like MySQL 8.0+) support dropping multiple columns in a single statement.

#### Example:
```sql
ALTER TABLE student 
DROP COLUMN address,
DROP COLUMN phone_number;
```

---

### **8. Renaming Multiple Columns**

In databases like MySQL, renaming multiple columns requires separate `ALTER` statements for each column.

#### Example:
```sql
-- Renaming multiple columns.
ALTER TABLE student CHANGE stu_age age INT;
ALTER TABLE student CHANGE phone_number contact_number VARCHAR(15);
```

---

### **9. Best Practices for Using `ALTER`**

1. **Backup Data:** Always back up the database before making structural changes.
2. **Test Changes:** Apply changes in a staging environment before production.
3. **Check Compatibility:** Ensure the new data type or constraints are compatible with existing data.

---

### **Comprehensive Example:**

```sql
-- Initial Table
CREATE TABLE student (
    id INT PRIMARY KEY,
    name VARCHAR(50)
);

-- Add a new column 'age'
ALTER TABLE student 
ADD COLUMN age INT DEFAULT 20;

-- Rename 'age' to 'student_age'
ALTER TABLE student 
CHANGE age student_age INT;

-- Modify 'student_age' data type to VARCHAR(3)
ALTER TABLE student 
MODIFY COLUMN student_age VARCHAR(3);

-- Add multiple columns
ALTER TABLE student 
ADD COLUMN address VARCHAR(255),
ADD COLUMN phone_number VARCHAR(15);

-- Drop a column
ALTER TABLE student 
DROP COLUMN address;

-- Rename the table
ALTER TABLE student 
RENAME TO student_details;
```

---

### **Error Handling Tips**

1. **`Column doesn't exist`:** Ensure the column name matches the table schema.
2. **`Data type mismatch`:** Verify the new data type is valid for the column.
3. **`Invalid table name`:** Ensure the table exists in the database.

---
