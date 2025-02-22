### MongoDB Coding Examples with Embedded Documents

Here are examples to explain the usage of **embedded documents** and operators like **`$all`** and **`$elemMatch`** based on the provided data:

---

#### **1. Query to Find Documents with a Specific Comment User**
Find all comments where the comments contain a user named `"user1"`.

```javascript
db.comments.find({
  "comments.user": "user1"
});
```

**Explanation:**  
This query searches for any document where the `comments` array contains an object with a `user` field equal to `"user1"`.

---

#### **2. Using `$elemMatch` to Match Multiple Conditions in Comments**
Find comments where a comment exists with the `user` `"user5"` and the `text` contains `"aggregations"`.

```javascript
db.comments.find({
  comments: {
    $elemMatch: {
      user: "user5",
      text: { $regex: "aggregations", $options: "i" }
    }
  }
});
```

**Explanation:**  
- `$elemMatch` ensures a single element in the `comments` array matches both conditions.  
- `$regex` performs a case-insensitive match on the `text` field.

---

#### **3. Using `$all` for Arrays**
Find comments where the `metadata.likes` field contains at least **85** and **90** (array-like query).

```javascript
db.comments.find({
  "metadata.likes": { $all: [85, 90] }
});
```

**Explanation:**  
- `$all` checks if the `likes` field matches all the specified values.

---

#### **4. Query comments with Minimum Likes**
Find comments with `metadata.likes` greater than or equal to **100**.

```javascript
db.comments.find({
  "metadata.likes": { $gte: 100 }
});
```

---

#### **5. Access Nested Fields in Projection**
Return only the article `title` and the `user` fields of comments.

```javascript
db.comments.find(
  {},
  { title: 1, "comments.user": 1, _id: 0 }
);
```

**Output Example:**
```json
[
  {
    "title": "Understanding JavaScript Closures",
    "comments": [{ "user": "user1" }, { "user": "user2" }]
  },
  {
    "title": "A Guide to Async/Await in Node.js",
    "comments": [{ "user": "user3" }, { "user": "user4" }]
  }
]
```

---

#### **6. Find comments with Multiple Comments Matching Conditions**
Find comments where `comments` include both `"user7"` and `"user8"`.

```javascript
db.comments.find({
  "comments.user": { $all: ["user7", "user8"] }
});
```

---

#### **7. Count comments with High Views**
Count comments where `metadata.views` is greater than **2000**.

```javascript
db.comments.count({
  "metadata.views": { $gt: 2000 }
});
```

---

#### **8. Query with Both Embedded and Top-Level Fields**
Find comments authored by `"Sarah Adams"` that also have at least one comment from `"user17"`.

```javascript
db.comments.find({
  author: "Sarah Adams",
  "comments.user": "user17"
});
```

---

#### **9. Using Projection to Return Specific Metadata**
Fetch only the `title` and `metadata.views` for comments with more than 3000 views.

```javascript
db.comments.find(
  { "metadata.views": { $gt: 3000 } },
  { title: 1, "metadata.views": 1, _id: 0 }
);
```

---

#### **10. Using `$regex` to Search for Keywords in Content**
Find comments where the `content` mentions `"React"`.

```javascript
db.comments.find({
  content: { $regex: "React", $options: "i" }
});
```

