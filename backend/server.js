const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();
app.use(cors());

app.get("/", (req, res) => {
  res.send("chat api");
});

app.get("/api/chats", (req, res) => {
  res.send("all chats here");
});

const port = process.env.PORT || 5000;

app.listen(port, console.log(`server is running at ${port}`));
