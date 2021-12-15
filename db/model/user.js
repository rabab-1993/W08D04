const mongoose = require("mongoose");

const validPass = (password) => {
  const re = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/
  return re.test(password)
}
const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true, lowercase: true, min: 6  },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, validate: [validPass, "Please enter a valid passowrd"], match:[/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/, "Please enter a valid passowrd"] },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  avatar: { type: String, default: "" },
  restToken: {type: String, default: ""}
});



module.exports = mongoose.model("User", userSchema);

// ?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,} passord
// validate: {
//   validator: (value) => {
//     return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
//   },
//   message: ((props) => `${props.value} is not a valid Email!`)
// }


