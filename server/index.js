const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const { Pool } = require("pg");
const redis = require("redis");

const keys = require("./keys");

// Express App Setup
const app = express();
app.use(cors());
app.use(bodyParser.json());

// PG Client Setup
const pgClient = new Pool({
  database: keys.pgDb,
  host: keys.pgHost,
  password: keys.pgPass,
  port: keys.pgPort,
  user: keys.pgUser
});

pgClient.on("error", () => console.log("Lost PG Connection"));

pgClient
  .query("CREATE TABLE IF NOT EXISTS values (number INT)")
  .catch(err => console.log(err));

// REDIS Client Setup
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();

// Express Route Handlers
app.get("/ping", (req, res) => {
  res.send("PONG");
});

app.get("/values/all", async (req, res) => {
  const values = await pgClient.query("SELECT * FROM values");

  res.send(values.rows);
});

app.get("/values/current", async (req, res) => {
  redisClient.hgetall("values", (err, values) => {
    res.send(values);
  });
});

app.post("/values", async (req, res) => {
  const index = req.body.index;

  if (parseInt(index) > 40) {
    res.status(422).send("Index too high!");
  }

  redisClient.hset("values", index, "Nothing Yet!");
  redisPublisher.publish("insert", index);
  pgClient.query("INSERT INTO values(number) VALUES($1)", [index]);

  res.send({ working: true });
});

app.listen(5000, err => {
  console.log("Listening");
});
