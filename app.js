const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { router } = require("./routers");
const cors = require("cors");

mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log("Connected!"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS is enabled for all origins
app.use(cors());

app.use("/", router);

app.get("/", (req, res) => {
  res.send("Hello world");
});

server.listen(5000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("server started at 5000");
});
