const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, lowercase: true, min: 6  },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  avatar: { type: String },
});

module.exports = mongoose.model("User", userSchema);
