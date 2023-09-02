const express = require("express");
const cors = require("cors");
// const mongoDB = require("./db");

let app = express();
app.listen(5000);

app.use(cors());
app.use(express.json());

const userRouter = require("./Routers/CreateUser");
app.use("/api", userRouter);
app.use("/api", require("./Routers/Display"));

app.get("/", (req, res) => {
  res.send("Hello World");
});
