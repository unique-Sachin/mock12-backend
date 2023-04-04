const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://sachin:sachin@cluster0.urwi6.mongodb.net/mock12"
);

module.exports = {
  connection,
};
