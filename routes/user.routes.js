const { userModel } = require("../models/userModel");
const jwt = require("jsonwebtoken");

const userRouter = require("express").Router();

userRouter.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new userModel({
      username,
      email,
      password,
    });
    await user.save();
    res.send("user registered");
  } catch (err) {
    res.send("something went wrong");
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.find({ email, password });
    if (user.length > 0) {
      const token = jwt.sign({ foo: "bar" }, "shhhhh");
      res.status(200).send({ msg: "user logged in", token });
    } else {
      res.status(401).send({ msg: "invalid credentials" });
    }
  } catch (err) {
    res.send({ msg: "something went wrong", err });
  }
});

userRouter.post("/getprofile", async (req, res) => {
  try {
    const { email } = req.body;
    const profile = await userModel.find({ email });
    res.send({ profile });
  } catch (error) {
    res.send({ msg: "something went wrong", err });
  }
});

userRouter.post("/calculate", async (req, res) => {
  try {
    const { amount, rate, years } = req.body;
    if (amount && rate && years) {
      const P = amount;
      const i = rate / 100;
      const n = years;
      const F = Math.round(P * (((1 + i) ** n - 1) / i));
      const invAmt = Math.round(P * n);
      const intGai = Math.round(F - invAmt);
      res.send({ matValue: F, invAmt, intGai });
    } else {
      res.send({ msg: "provide all inputs" });
    }
  } catch (error) {
    res.send({ msg: "something went wrong", err });
  }
});

module.exports = {
  userRouter,
};
