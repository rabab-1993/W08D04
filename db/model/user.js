const mongoose = require("mongoose");

const validPass = (password) => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
  return re.test(password);
};
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    min: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    validate: [validPass, "Please enter a valid passowrd"],
    match: [
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
      "Please enter a valid passowrd",
    ],
  },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  avatar: {
    type: String,
    default:
      "https://i.pinimg.com/564x/e7/c3/f4/e7c3f4a076b8472e0b1bd9c00a847f7f.jpg",
  },
  restToken: { type: String, default: "" },
  isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
