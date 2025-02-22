### **SQL Joins with Explanations and Venn Diagrams**

Joins are used to combine rows from two or more tables based on a related column between them. Below are the different types of joins with examples and Venn diagrams to illustrate their behavior.

---

### **1. INNER JOIN**

An `INNER JOIN` returns only the rows that have matching values in both tables.

#### **Query:**
```sql
SELECT * 
FROM students 
INNER JOIN course 
ON students.id = course.id;
```

#### **Result:**
| id  | name   | id  | course        |
|-----|--------|-----|---------------|
| 102 | Bob    | 102 | English       |
| 103 | Casey  | 103 | Science       |

**Explanation:**
- Only rows with matching `id` in both `students` and `course` tables are included.

#### **Venn Diagram:**
```
       +-----+
   A   |     |   B
       +-----+
  (Intersection is the result)
```

---

### **2. LEFT JOIN**

A `LEFT JOIN` returns all rows from the left table (`students`), and the matching rows from the right table (`course`). If there’s no match, NULL values are returned for the right table.

#### **Query:**
```sql
SELECT * 
FROM students 
LEFT JOIN course 
ON students.id = course.id;
```

#### **Result:**
| id  | name   | id  | course        |
|-----|--------|-----|---------------|
| 101 | Adam   | NULL | NULL          |
| 102 | Bob    | 102  | English       |
| 103 | Casey  | 103  | Science       |

**Explanation:**
- Rows from `students` are fully included, even if there’s no match in `course`.

#### **Venn Diagram:**
```
       +-----+
   A   |     |
       +-----+
       (All of A + matches from B)
```

---

### **3. RIGHT JOIN**

A `RIGHT JOIN` returns all rows from the right table (`course`), and the matching rows from the left table (`students`). If there’s no match, NULL values are returned for the left table.

#### **Query:**
```sql
SELECT * 
FROM students 
RIGHT JOIN course 
ON students.id = course.id;
```

#### **Result:**
| id  | name   | id  | course        |
|-----|--------|-----|---------------|
| 102 | Bob    | 102  | English       |
| 103 | Casey  | 103  | Science       |
| NULL| NULL   | 105  | Maths         |
| NULL| NULL   | 107  | Computer Science |

**Explanation:**
- Rows from `course` are fully included, even if there’s no match in `students`.

#### **Venn Diagram:**
```
       +-----+
         |     |   B
         +-----+
       (All of B + matches from A)
```

---

### **4. FULL OUTER JOIN**

A `FULL OUTER JOIN` combines the results of both `LEFT JOIN` and `RIGHT JOIN`. It includes all rows from both tables, with NULLs in places where no match is found.

#### **Query:**
```sql
SELECT * 
FROM students 
LEFT JOIN course 
ON students.id = course.id
UNION 
SELECT * 
FROM students 
RIGHT JOIN course 
ON students.id = course.id;
```

#### **Result:**
| id  | name   | id  | course        |
|-----|--------|-----|---------------|
| 101 | Adam   | NULL | NULL          |
| 102 | Bob    | 102  | English       |
| 103 | Casey  | 103  | Science       |
| NULL| NULL   | 105  | Maths         |
| NULL| NULL   | 107  | Computer Science |

**Explanation:**
- All rows from both `students` and `course` tables are included.

#### **Venn Diagram:**
```
       +-----+
   A   |     |   B
       +-----+
  (All of A and B with NULLs for non-matching rows)
```

---

### **5. LEFT EXCLUSIVE JOIN**

A `LEFT EXCLUSIVE JOIN` returns rows that are in the left table (`students`) but not in the right table (`course`).

#### **Query:**
```sql
SELECT * 
FROM students 
LEFT JOIN course 
ON students.id = course.id
WHERE course.id IS NULL;
```

#### **Result:**
| id  | name   | id   | course |
|-----|--------|------|--------|
| 101 | Adam   | NULL | NULL   |

**Explanation:**
- Only rows from `students` that don’t have a match in `course` are included.

#### **Venn Diagram:**
```
       +     
   A   |     
       +     
  (Only A minus B intersection)
```

---

### **6. RIGHT EXCLUSIVE JOIN**

A `RIGHT EXCLUSIVE JOIN` returns rows that are in the right table (`course`) but not in the left table (`students`).

#### **Query:**
```sql
SELECT * 
FROM students 
RIGHT JOIN course 
ON students.id = course.id
WHERE students.id IS NULL;
```

#### **Result:**
| id   | name  | id   | course          |
|------|-------|------|-----------------|
| NULL | NULL  | 105  | Maths           |
| NULL | NULL  | 107  | Computer Science|

**Explanation:**
- Only rows from `course` that don’t have a match in `students` are included.

#### **Venn Diagram:**
```
       +     
         |   B
         +     
  (Only B minus A intersection)
```

---

### **7. SELF JOIN**

A `SELF JOIN` is used to join a table to itself. This is useful for hierarchical or comparative data.

#### Example Query:
```sql
SELECT a.id AS student1_id, a.name AS student1_name, 
       b.id AS student2_id, b.name AS student2_name 
FROM students a, students b 
WHERE a.id <> b.id;
```

**Explanation:**
- In this query, we join `students` table with itself to compare each student with every other student.

#### **Venn Diagram:**
Self joins don't have a typical Venn diagram since they involve the same table.

---

### **Summary Table of Joins**

| Join Type            | Includes Rows From | Matching Rows | Non-Matching Rows |
|----------------------|--------------------|---------------|--------------------|
| INNER JOIN           | Both Tables       | Yes           | No                 |
| LEFT JOIN            | Left Table        | Yes           | Yes (NULL for right)|
| RIGHT JOIN           | Right Table       | Yes           | Yes (NULL for left)|
| FULL OUTER JOIN      | Both Tables       | Yes           | Yes (NULL for both)|
| LEFT EXCLUSIVE JOIN  | Left Table        | No            | Yes (left-only)    |
| RIGHT EXCLUSIVE JOIN | Right Table       | No            | Yes (right-only)   |
| SELF JOIN            | Same Table        | Yes           | Depends on logic   |

