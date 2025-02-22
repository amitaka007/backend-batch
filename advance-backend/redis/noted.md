

## **Redis Notes**

Redis (Remote Dictionary Server) is an open-source, in-memory data structure store used as a database, cache, and message broker. It supports various data structures such as strings, hashes, lists, sets, sorted sets, bitmaps, hyperloglogs, and geospatial indexes.

---

### **1. Installation Using Docker**
To install Redis using Docker, follow these steps:

#### Pull the Redis Image
Run the following command to pull the official Redis image from Docker Hub:
```bash
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
docker ps
docker exec -it docker_id bash
redis-cli ping
```

---

### **2. Redis Data Structures**
Redis supports several data structures, including:
1. **Strings**
2. **Lists**
3. **Sets**
4. **Sorted Sets**
5. **Hashes**
6. **Bitmaps**
7. **HyperLogLogs**
8. **Geospatial Indexes**
9. **Streams**

Below, we will cover all data types in detail with CLI and Node.js examples.

---

### **3. Strings**
(Already covered in previous notes)

---

### **4. Lists**
(Already covered in previous notes)

---

### **5. Sets**
Sets are unordered collections of unique strings.

#### **Basic Commands for Sets**
##### **CLI Examples**
- **SADD**: Add one or more members to a set.
  ```bash
  SADD fruits "apple"
  SADD fruits "banana" "cherry"
  ```
- **SMEMBERS**: Retrieve all members of a set.
  ```bash
  SMEMBERS fruits
  ```
- **SREM**: Remove a member from a set.
  ```bash
  SREM fruits "banana"
  ```
- **SISMEMBER**: Check if a member exists in a set.
  ```bash
  SISMEMBER fruits "apple"
  ```
- **SINTER**: Find the intersection of multiple sets.
  ```bash
  SADD set1 "a" "b" "c"
  SADD set2 "b" "c" "d"
  SINTER set1 set2
  ```
- **SUNION**: Find the union of multiple sets.
  ```bash
  SUNION set1 set2
  ```
- **SDIFF**: Find the difference between sets.
  ```bash
  SDIFF set1 set2
  ```

##### **Node.js Example**
```javascript
const Redis = require("ioredis");
const redis = new Redis();

async function runSetExamples() {
  try {
    // SADD: Add elements to a set
    await redis.sadd("fruits", "apple");
    await redis.sadd("fruits", "banana", "cherry");
    console.log('SADD fruits: ["apple", "banana", "cherry"]');

    // SMEMBERS: Retrieve all members of a set
    const fruits = await redis.smembers("fruits");
    console.log(`SMEMBERS fruits: ${fruits}`);

    // SREM: Remove a member from a set
    await redis.srem("fruits", "banana");
    console.log('SREM fruits: Removed "banana"');

    // SISMEMBER: Check if a member exists in a set
    const hasApple = await redis.sismember("fruits", "apple");
    console.log(`SISMEMBER fruits apple: ${hasApple ? "Yes" : "No"}`);

    // SINTER: Find the intersection of multiple sets
    await redis.sadd("set1", "a", "b", "c");
    await redis.sadd("set2", "b", "c", "d");
    const intersection = await redis.sinter("set1", "set2");
    console.log(`SINTER set1 set2: ${intersection}`);

    // SUNION: Find the union of multiple sets
    const union = await redis.sunion("set1", "set2");
    console.log(`SUNION set1 set2: ${union}`);

    // SDIFF: Find the difference between sets
    const difference = await redis.sdiff("set1", "set2");
    console.log(`SDIFF set1 set2: ${difference}`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    redis.disconnect();
  }
}

runSetExamples();
```

---

### **6. Sorted Sets**
Sorted Sets are similar to sets but with scores associated with each member.

#### **Basic Commands for Sorted Sets**
##### **CLI Examples**
- **ZADD**: Add members with scores to a sorted set.
  ```bash
  ZADD leaderboard 100 "Alice"
  ZADD leaderboard 200 "Bob" 150 "Charlie"
  ```
- **ZRANGE**: Retrieve members in a range by index.
  ```bash
  ZRANGE leaderboard 0 -1 WITHSCORES
  ```
- **ZREM**: Remove a member from a sorted set.
  ```bash
  ZREM leaderboard "Alice"
  ```
- **ZSCORE**: Get the score of a member.
  ```bash
  ZSCORE leaderboard "Bob"
  ```
- **ZRANK**: Get the rank of a member.
  ```bash
  ZRANK leaderboard "Charlie"
  ```

##### **Node.js Example**
```javascript
const Redis = require("ioredis");
const redis = new Redis();

async function runSortedSetExamples() {
  try {
    // ZADD: Add members with scores to a sorted set
    await redis.zadd("leaderboard", 100, "Alice");
    await redis.zadd("leaderboard", 200, "Bob", 150, "Charlie");
    console.log('ZADD leaderboard: Alice=100, Bob=200, Charlie=150');

    // ZRANGE: Retrieve members in a range by index
    const leaderboard = await redis.zrange("leaderboard", 0, -1, "WITHSCORES");
    console.log(`ZRANGE leaderboard: ${leaderboard}`);

    // ZREM: Remove a member from a sorted set
    await redis.zrem("leaderboard", "Alice");
    console.log('ZREM leaderboard: Removed "Alice"');

    // ZSCORE: Get the score of a member
    const bobScore = await redis.zscore("leaderboard", "Bob");
    console.log(`ZSCORE leaderboard Bob: ${bobScore}`);

    // ZRANK: Get the rank of a member
    const charlieRank = await redis.zrank("leaderboard", "Charlie");
    console.log(`ZRANK leaderboard Charlie: ${charlieRank}`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    redis.disconnect();
  }
}

runSortedSetExamples();
```

---

### **7. Hashes**
Hashes are maps between string fields and string values.

#### **Basic Commands for Hashes**
##### **CLI Examples**
- **HSET**: Set field-value pairs in a hash.
  ```bash
  HSET user:1 name "Alice" age 30
  ```
- **HGET**: Get the value of a field.
  ```bash
  HGET user:1 name
  ```
- **HGETALL**: Get all field-value pairs.
  ```bash
  HGETALL user:1
  ```
- **HDEL**: Delete a field.
  ```bash
  HDEL user:1 age
  ```

##### **Node.js Example**
```javascript
const Redis = require("ioredis");
const redis = new Redis();

async function runHashExamples() {
  try {
    // HSET: Set field-value pairs in a hash
    await redis.hset("user:1", "name", "Alice", "age", 30);
    console.log('HSET user:1: name="Alice", age=30');

    // HGET: Get the value of a field
    const name = await redis.hget("user:1", "name");
    console.log(`HGET user:1 name: ${name}`);

    // HGETALL: Get all field-value pairs
    const user = await redis.hgetall("user:1");
    console.log(`HGETALL user:1: ${JSON.stringify(user)}`);

    // HDEL: Delete a field
    await redis.hdel("user:1", "age");
    console.log('HDEL user:1: Removed "age"');
  } catch (error) {
    console.error("Error:", error);
  } finally {
    redis.disconnect();
  }
}

runHashExamples();
```

---

### **8. Bitmaps**
Bitmaps allow bit-level operations on strings.

#### **Basic Commands for Bitmaps**
##### **CLI Examples**
- **SETBIT**: Set a bit at a specific offset.
  ```bash
  SETBIT bitmap 0 1
  ```
- **GETBIT**: Get the value of a bit at a specific offset.
  ```bash
  GETBIT bitmap 0
  ```
- **BITCOUNT**: Count the number of set bits.
  ```bash
  BITCOUNT bitmap
  ```

##### **Node.js Example**
```javascript
const Redis = require("ioredis");
const redis = new Redis();

async function runBitmapExamples() {
  try {
    // SETBIT: Set a bit at a specific offset
    await redis.setbit("bitmap", 0, 1);
    console.log('SETBIT bitmap: Set bit at offset 0');

    // GETBIT: Get the value of a bit at a specific offset
    const bit = await redis.getbit("bitmap", 0);
    console.log(`GETBIT bitmap 0: ${bit}`);

    // BITCOUNT: Count the number of set bits
    const count = await redis.bitcount("bitmap");
    console.log(`BITCOUNT bitmap: ${count}`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    redis.disconnect();
  }
}

runBitmapExamples();
```

---

### **9. HyperLogLogs**
HyperLogLogs estimate the cardinality of a set.

#### **Basic Commands for HyperLogLogs**
##### **CLI Examples**
- **PFADD**: Add elements to a HyperLogLog.
  ```bash
  PFADD hll "item1" "item2"
  ```
- **PFCOUNT**: Estimate the cardinality.
  ```bash
  PFCOUNT hll
  ```
- **PFMERGE**: Merge multiple HyperLogLogs.
  ```bash
  PFMERGE merged hll1 hll2
  ```

##### **Node.js Example**
```javascript
const Redis = require("ioredis");
const redis = new Redis();

async function runHyperLogLogExamples() {
  try {
    // PFADD: Add elements to a HyperLogLog
    await redis.pfadd("hll", "item1", "item2");
    console.log('PFADD hll: Added items');

    // PFCOUNT: Estimate the cardinality
    const count = await redis.pfcount("hll");
    console.log(`PFCOUNT hll: ${count}`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    redis.disconnect();
  }
}

runHyperLogLogExamples();
```

---

### **10. Geospatial Indexes**
Geospatial Indexes store and query location-based data.

#### **Basic Commands for Geospatial Indexes**
##### **CLI Examples**
- **GEOADD**: Add locations.
  ```bash
  GEOADD cities -122.4235 37.7763 "San Francisco"
  ```
- **GEODIST**: Calculate the distance between two locations.
  ```bash
  GEODIST cities "San Francisco" "New York" km
  ```
- **GEORADIUS**: Find locations within a radius.
  ```bash
  GEORADIUS cities -122.4235 37.7763 100 km
  ```

##### **Node.js Example**
```javascript
const Redis = require("ioredis");
const redis = new Redis();

async function runGeoExamples() {
  try {
    // GEOADD: Add locations
    await redis.geoadd("cities", -122.4235, 37.7763, "San Francisco");
    console.log('GEOADD cities: Added San Francisco');

    // GEODIST: Calculate the distance between two locations
    const distance = await redis.geodist("cities", "San Francisco", "New York", "km");
    console.log(`GEODIST cities: ${distance} km`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    redis.disconnect();
  }
}

runGeoExamples();
```

---

### **11. Streams**
Streams are append-only logs for messaging and event sourcing.

#### **Basic Commands for Streams**
##### **CLI Examples**
- **XADD**: Add an entry to a stream.
  ```bash
  XADD mystream * sensor-id 1234 temperature 25
  ```
- **XRANGE**: Retrieve entries in a range.
  ```bash
  XRANGE mystream - +
  ```
- **XREAD**: Read from multiple streams.
  ```bash
  XREAD COUNT 2 STREAMS mystream 0
  ```

##### **Node.js Example**
```javascript
const Redis = require("ioredis");
const redis = new Redis();

async function runStreamExamples() {
  try {
    // XADD: Add an entry to a stream
    await redis.xadd("mystream", "*", "sensor-id", 1234, "temperature", 25);
    console.log('XADD mystream: Added entry');

    // XRANGE: Retrieve entries in a range
    const entries = await redis.xrange("mystream", "-", "+");
    console.log(`XRANGE mystream: ${entries}`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    redis.disconnect();
  }
}

runStreamExamples();
```

---

### **Conclusion**
This guide now includes examples for all Redis data types, covering both CLI and Node.js (`ioredis`) usage. You can use these examples to experiment with Redis and build applications leveraging its rich set of features.

How we can scale websockets servers using pub-sub model ( 

)