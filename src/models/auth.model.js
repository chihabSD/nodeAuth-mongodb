const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String },
  password: { type: String},
 
});

module.exports = mongoose.model("Auth", authSchema);
