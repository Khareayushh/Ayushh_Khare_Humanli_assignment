const express = require("express");
const app = express();
require('dotenv').config();


app.get("/", (req, res) => {
  res.send(`hi I am running, go on ${process.env.USER}`);
});

app.listen(8000, () => {
  console.log("running at localhost:8000");
});
