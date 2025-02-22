const Redis = require("ioredis");
const redis = new Redis();

async function runSetExamples() {
  try {
    // SADD: Add elements to a set
    await redis.sadd("fruits", "apple");
    await redis.sadd("fruits", "banana");
    await redis.sadd("fruits", "cherry");
    console.log('SADD fruits: ["apple", "banana", "cherry"]');

    // SMEMBERS: Retrieve all members of a set
    const fruits = await redis.smembers("fruits");
    console.log(`SMEMBERS fruits: ${fruits}`);

    // SISMEMBER: Check if a member exists in the set
    const hasApple = await redis.sismember("fruits", "apple");
    console.log(`SISMEMBER fruits apple: ${hasApple ? "Yes" : "No"}`);

    // SREM: Remove a member from the set
    await redis.srem("fruits", "banana");
    console.log('SREM fruits banana');

    // SMEMBERS after removal
    const updatedFruits = await redis.smembers("fruits");
    console.log(`SMEMBERS fruits after removal: ${updatedFruits}`);

    // SINTER: Find the intersection of multiple sets
    await redis.sadd("citrus", "orange");
    await redis.sadd("citrus", "lemon");
    await redis.sadd("citrus", "apple"); // Common element
    const intersection = await redis.sinter("fruits", "citrus");
    console.log(`SINTER fruits and citrus: ${intersection}`);

    // SUNION: Find the union of multiple sets
    const union = await redis.sunion("fruits", "citrus");
    console.log(`SUNION fruits and citrus: ${union}`);

    // SDIFF: Find the difference between sets
    const difference = await redis.sdiff("fruits", "citrus");
    console.log(`SDIFF fruits and citrus: ${difference}`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Disconnect from Redis
    redis.disconnect();
  }
}

runSetExamples();