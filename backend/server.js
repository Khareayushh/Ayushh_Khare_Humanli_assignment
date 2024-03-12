const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

app.get("/", (req, res) => {
  // console.log(req.body);
  res.send("hi from route");
});

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api", require("./routes/chatRoutes"));

app.listen(8000, () => {
  console.log("running at localhost:8000");
});
