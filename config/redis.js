const Redis = require("ioredis");

const redis = new Redis(
  "rediss://default:74719503b12444e68331bea98307b3df@apn1-subtle-werewolf-34322.upstash.io:34322"
);

redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("error", (err) => {
  console.error("Error connecting to Redis:", err);
});

module.exports = redis;
