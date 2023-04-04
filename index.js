const { json } = require("express");
const connection = require("./configs/db.js");
const cors = require("cors");
const { userRouter } = require("./routes/user.routes.js");

const app = require("express")();
app.use(json());
app.use(cors());
app.use("/", userRouter);

app.listen(8000, async () => {
  try {
    connection;
    console.log("server connected");
  } catch (err) {
    console.log("connection failed");
  }
});
