
### **Practice Questions for `$expr`, `$exists`, and `$type`**

---

### **1. Using `$expr`**

#### **Question:**
Find documents where the `stock` field is at least double the value of the `price` field.

#### **Answer:**
```javascript
db.products.find({
  $expr: { $gte: ["$stock", { $multiply: ["$price", 2] }] }
});
```

---

### **2. Examples to Explain `$expr`**

#### **Example 1:** Match documents where `stock` is exactly 3 times the `price`.

```javascript
db.products.find({
  $expr: { $eq: ["$stock", { $multiply: ["$price", 3] }] }
});
```

**Explanation:**
- `$eq`: Matches documents where the left and right expressions are equal.
- `{ $multiply: ["$price", 3] }`: Multiplies the `price` value by 3.
- `$stock`: Compares the result of multiplication with the value in the `stock` field.

---

#### **Example 2:** Match documents where the `price` field is greater than half the value of the `stock` field.

```javascript
db.products.find({
  $expr: { $gt: ["$price", { $divide: ["$stock", 2] }] }
});
```

**Explanation:**
- `$gt`: Checks if `price` is greater than the value of `stock` divided by 2.
- `{ $divide: ["$stock", 2] }`: Divides the `stock` value by 2.

---

#### **Example 3:** Match documents where the `stock` minus `price` is greater than 50.

```javascript
db.products.find({
  $expr: { $gt: [{ $subtract: ["$stock", "$price"] }, 50] }
});
```

**Explanation:**
- `$subtract`: Subtracts the `price` from `stock`.
- `$gt`: Checks if the result of subtraction is greater than 50.

---

### **3. Using `$exists`**

#### **Question:**
Find documents where the `description` field exists.

#### **Answer:**
```javascript
db.products.find({
  description: { $exists: true }
});
```

**Explanation:**
- `$exists: true`: Matches documents where the `description` field exists, even if it contains `null`.

---

#### **Question:**
Find documents where the `rating` field does not exist.

#### **Answer:**
```javascript
db.products.find({
  rating: { $exists: false }
});
```

**Explanation:**
- `$exists: false`: Matches documents where the `rating` field is completely absent.

---

### **4. Using `$type`**

#### **Question:**
Find documents where the `price` field is of type `double`.

#### **Answer:**
```javascript
db.products.find({
  price: { $type: "double" }
});
```

---

#### **Question:**
Find documents where the `stock` field is either a `double` or an `int`.

#### **Answer:**
```javascript
db.products.find({
  stock: { $type: ["double", "int"] }
});
```

**Explanation:**
- `$type`: Matches documents based on the BSON type of the field.

---

### **5. Bonus Question (Combination)**

#### **Question:**
Find documents where:
1. The `discount` field exists.
2. The `discount` field is of type `double`.
3. The value of the `discount` is less than the `price`.

#### **Answer:**
```javascript
db.products.find({
  discount: { $exists: true, $type: "double" },
  $expr: { $lt: ["$discount", "$price"] }
});
```

**Explanation:**
- `$exists: true`: Ensures the `discount` field exists.
- `$type: "double"`: Ensures the `discount` field is of type `double`.
- `$lt`: Compares `discount` and `price` to ensure `discount` is less than `price`.

