### **TRUNCATE Command in SQL**

The `TRUNCATE` command is used to remove all rows from a table, effectively resetting it to an empty state. It is faster than the `DELETE` command for this purpose because it doesn't log individual row deletions.

---

### **Syntax:**
```sql
TRUNCATE TABLE table_name;
```

#### Example:
```sql
TRUNCATE TABLE student;
```

**Explanation:**
- **`TRUNCATE`**: This command removes all rows from the table.
- **`TABLE student`**: Specifies the table (`student`) to truncate.

---

### **Key Differences: `TRUNCATE` vs `DELETE`**

| Feature               | `TRUNCATE`                                    | `DELETE`                                   |
|-----------------------|-----------------------------------------------|-------------------------------------------|
| **Operation**          | Removes all rows quickly.                    | Can remove specific rows or all rows.     |
| **Condition Support**  | Does not support `WHERE` conditions.          | Supports `WHERE` to delete specific rows. |
| **Logging**            | Minimal logging (DDL operation).             | Fully logs each deleted row (DML operation). |
| **Speed**              | Faster because it doesn't log row deletions. | Slower for large datasets.                |
| **Reset Auto-Increment** | Resets the auto-increment counter to 1 (in MySQL). | Does not reset the auto-increment value.  |
| **Rollback**           | Cannot be rolled back (irreversible).         | Can be rolled back if within a transaction. |
| **Triggers**           | Does not activate `ON DELETE` triggers.       | Activates `ON DELETE` triggers.           |

---

### **When to Use TRUNCATE?**

- When you need to quickly remove all data from a table.
- When you do not need to track row deletions for recovery.
- When you want to reset the auto-increment counter in MySQL.

---

### **Scenarios and Examples**

#### **1. Reset a Table:**
```sql
TRUNCATE TABLE student;
```
Removes all rows from the `student` table and resets the auto-increment ID.

#### **2. Before Reloading Data:**
```sql
-- Clean the table before importing new data
TRUNCATE TABLE orders;
```
Use `TRUNCATE` to clear the table for fresh data loading.

---

### **Limitations and Cautions:**
1. **Irreversible:** Once executed, `TRUNCATE` cannot be undone, even within a transaction.
2. **No Conditions:** You cannot specify a `WHERE` clause, so use `DELETE` if you need selective deletion.
3. **Foreign Keys:** If the table has foreign key constraints, truncating it may fail unless you disable or drop the constraints temporarily.

---

### **Key Points:**
- `TRUNCATE` is a **DDL (Data Definition Language)** command.
- Faster than `DELETE` for removing all rows in large tables.
- Cannot be used on tables with active foreign key constraints (without disabling them).

### **Final Note:**
Use `TRUNCATE` for performance-critical operations when clearing all data from a table is required, but be cautious as it does not offer flexibility like `DELETE`.

### **Practice Questions Explanation**

#### **1. Rename the column `name` to `full_name`:**
You can use the `CHANGE` clause in the `ALTER TABLE` statement to rename a column and optionally change its data type or constraints.

#### SQL Query:
```sql
ALTER TABLE student 
CHANGE name full_name VARCHAR(50);
```

**Explanation:**
- `name`: The current column name.
- `full_name`: The new column name.
- `VARCHAR(50)`: Defines the data type and size of the column after renaming. This is necessary when using the `CHANGE` clause.

---

#### **2. Delete all students who scored marks less than 80:**
To delete rows based on a condition, use the `DELETE FROM` statement with a `WHERE` clause.

#### SQL Query:
```sql
DELETE FROM student 
WHERE marks < 80;
```

**Explanation:**
- `DELETE FROM student`: Deletes rows from the `student` table.
- `WHERE marks < 80`: Ensures only rows where the `marks` column is less than 80 are removed.

---

#### **3. Delete the `grade` column from the table:**
To remove a column from a table, use the `DROP COLUMN` clause in the `ALTER TABLE` statement.

#### SQL Query:
```sql
ALTER TABLE student 
DROP COLUMN grade;
```

**Explanation:**
- `DROP COLUMN grade`: Removes the column named `grade` from the table `student`.

---

### **Final SQL Script**

Combining all the tasks into a single script:
```sql
-- Rename the column 'name' to 'full_name'
ALTER TABLE student 
CHANGE name full_name VARCHAR(50);

-- Delete all students who scored marks less than 80
DELETE FROM student 
WHERE marks < 80;

-- Drop the column 'grade'
ALTER TABLE student 
DROP COLUMN grade;
```

---

### **Additional Notes**

1. **Renaming Columns:**
   - In some RDBMS (like PostgreSQL), use `ALTER TABLE table_name RENAME COLUMN old_name TO new_name;`.

2. **Deleting Rows:**
   - The `DELETE` command removes rows selectively based on a condition.
   - If you want to delete all rows, use `TRUNCATE TABLE student;` for faster operation.

3. **Dropping Columns:**
   - Be cautious when dropping columns, as this action is irreversible.
