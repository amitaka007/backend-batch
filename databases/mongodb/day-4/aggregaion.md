

### MongoDB Aggregation Overview
- **Aggregation** in MongoDB is a way to process data records and return computed results.
- It involves a **pipeline** of operations where the output of one stage is the input to the next.
- Common operations include filtering, grouping, and transforming data.

### Key Concepts
1. **Pipeline**: A sequence of stages where each stage transforms the data.
2. **Stages**: Each stage in the pipeline performs a specific operation on the data.
3. **Operators**: MongoDB provides various operators like `$match`, `$group`, `$sort`, `$project`, etc.

### Common Aggregation Stages
- **$match**: Filters documents to pass only those that match the specified condition.
- **$group**: Groups documents by a specified field and can perform operations like sum, average, etc.
- **$sort**: Sorts the documents based on a specified field.
- **$project**: Reshapes each document in the stream, such as by adding or removing fields.

### Coding Examples

#### Example 1: Basic Aggregation with $match and $group
```javascript
db.collection.aggregate([
  { $match: { gender: "male" } }, // Filters documents where gender is male
  { $group: { _id: "$age", count: { $sum: 1 } } } // Groups by age and counts documents
])
```

#### Example 2: Using $sort
```javascript
db.collection.aggregate([[]
  { $match: { gender: "male" } },
  { $group: { _id: "$age", count: { $sum: 1 } } },
  { $sort: { count: -1 } } // Sorts the groups by count in descending order
])
```

#### Example 3: Calculating Average
```javascript
db.collection.aggregate([
  { $group: { _id: null, averageAge: { $avg: "$age" } } } // Calculates average age
])
```

#### Example 4: Using $unwind and $push
```javascript
db.collection.aggregate([
  { $unwind: "$hobbies" }, // Deconstructs the array field hobbies
  { $group: { _id: "$age", hobbies: { $push: "$hobbies" } } } // Groups by age and collects hobbies
])
```

#### Example 5: Using $filter
```javascript
db.collection.aggregate([
  {
    $project: {
      scores: {
        $filter: {
          input: "$scores",
          as: "score",
          cond: { $gt: ["$$score", 20] } // Filters scores greater than 20
        }
      }
    }
  }
])
```

