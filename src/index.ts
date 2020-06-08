import express from "express";
import {
  config
} from "dotenv";
config();

const {
  PORT,
} = process.env;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});