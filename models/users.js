var mongoose = require("mongoose");

var Schema = mongoose.Schema
var users = new Schema({
  name: String,
  address: String,
  college: String,
  age: Number
})

mongoose.model("users", users);
