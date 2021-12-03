const userModel = require("../../db/model/user");
const roleModel = require("../../db/model/role");

const dotenv = require("dotenv");
dotenv.config();

const jwt = require("jsonwebtoken");
const SECRETKEY = process.env.SECRET_KEY;

//bcrypt > library to hash passwords.
const bcrypt = require("bcrypt");
const SALT = Number(process.env.SALT);

// get all role function
const allUser = async (req, res) => {
  userModel
    .find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// Register function
const register = async (req, res) => {
  const { userName, email, password, role } = req.body;
  const savePass = await bcrypt.hash(password, SALT);
  const creatUser = new userModel({
    userName,
    email,
    password: savePass,
    role,
  });

  creatUser
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// LogIn function

const logIn = (req, res) => {
  const { userName, email, password } = req.body;

  userModel
    .findOne({ $or: [{ email }, { userName }] })

    .then(async (result) => {
      if (result) {
        const savePass = await bcrypt.compare(password, result.password);
        if (savePass) {
          const payload = {
            role: result.role,
            id: result._id,
          };
          const token = jwt.sign(payload, SECRETKEY);
          res.status(200).json({ result, token });
        } else {
          res.status(400).json("invalid email or password");
        }
      } else {
        res.status(404).json("not found");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// delete user function

const deleteUser = async (req, res) => {
  const { _id } = req.body;

  userModel
    .findById({ _id })
    .then((result) => {
      console.log(result);
      if (result) {
        userModel.deleteOne({ _id }, (err) => {
          if (err) return handleError(err);
        });

        res.status(200).json({ massege: "user deleted successfully" });
      } else {
        return res.status(404).json("user not found");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { register, logIn, allUser, deleteUser };
