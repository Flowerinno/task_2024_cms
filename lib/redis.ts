import { createClient, RedisClusterType } from "redis";

declare global {
	var redis: RedisClusterType;
}

export const redis = await createClient({ url: process.env.REDIS_URL })
	.on("error", (err) => console.log("Redis Client Error", err))
	.on("connect", () => console.log("Redis Connected"))
	.on("end", () => console.log("Redis Ready"))
	.connect();
