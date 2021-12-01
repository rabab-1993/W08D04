const mongoose = require("mongoose");

const user = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  avatar: { type: String },
});

module.exports = mongoose.model("User", user);
