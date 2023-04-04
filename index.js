const { json } = require("express");
const connection = require("./configs/db.js");
const cors = require("cors");
require("dotenv").config();
const { userRouter } = require("./routes/user.routes.js");

const app = require("express")();
app.use(json());
app.use(cors());
app.use("/", userRouter);

app.listen(process.env.port, async () => {
  try {
    connection;
    console.log("server connected");
  } catch (err) {
    console.log("connection failed");
  }
});
