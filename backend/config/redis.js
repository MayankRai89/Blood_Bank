import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

let redisClient = null;

const host = process.env.REDIS_HOST;
const port = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379;
const password = process.env.REDIS_PASSWORD ? process.env.REDIS_PASSWORD.replace(/"/g, "") : undefined;

if (host) {
  try {
    redisClient = new Redis({
      host,
      port,
      password,
      connectTimeout: 5000,
      maxRetriesPerRequest: 2,
      retryStrategy(times) {
        if (times > 5) {
          console.warn("⚠️ Redis retry limit reached. Falling back to direct database queries.");
          return null; // Stop retrying after 5 attempts
        }
        return Math.min(times * 200, 2000);
      },
    });

    redisClient.on("connect", () => {
      console.log(`✅ Redis Client Connected: ${host}:${port}`);
    });

    redisClient.on("error", (err) => {
      console.warn("⚠️ Redis Client Warning:", err.message || err);
    });
  } catch (err) {
    console.error("❌ Redis Client Initialization Error:", err.message);
    redisClient = null;
  }
} else {
  console.log("ℹ️ REDIS_HOST not defined. Running without Redis caching.");
}

/**
 * Get cached data by key
 */
export const getCache = async (key) => {
  if (!redisClient || redisClient.status !== "ready") return null;
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.warn(`Redis getCache error for key [${key}]:`, err.message);
    return null;
  }
};

/**
 * Set cache key with expiration (in seconds, default 300s = 5m)
 */
export const setCache = async (key, value, ttlSeconds = 300) => {
  if (!redisClient || redisClient.status !== "ready") return;
  try {
    const serialized = JSON.stringify(value);
    if (ttlSeconds > 0) {
      await redisClient.set(key, serialized, "EX", ttlSeconds);
    } else {
      await redisClient.set(key, serialized);
    }
  } catch (err) {
    console.warn(`Redis setCache error for key [${key}]:`, err.message);
  }
};

/**
 * Delete a specific key from cache
 */
export const delCache = async (key) => {
  if (!redisClient || redisClient.status !== "ready") return;
  try {
    await redisClient.del(key);
  } catch (err) {
    console.warn(`Redis delCache error for key [${key}]:`, err.message);
  }
};

/**
 * Invalidate all keys matching a pattern (e.g., 'donors:*')
 */
export const delCachePattern = async (pattern) => {
  if (!redisClient || redisClient.status !== "ready") return;
  try {
    const keys = await redisClient.keys(pattern);
    if (keys && keys.length > 0) {
      await redisClient.del(...keys);
    }
  } catch (err) {
    console.warn(`Redis delCachePattern error for pattern [${pattern}]:`, err.message);
  }
};

export default redisClient;
