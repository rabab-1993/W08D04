const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require("mongoose");
const dotenv = require("dotenv") 
dotenv.config();
// const passport = require("passport");
const User = require('./db/model/google')

const googlePass = (passport) => {
passport.use(new GoogleStrategy({
    clientID: process.env.GOOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/user/auth/google/callback"
  },
  async(accessToken, refreshToken, profile, done) => {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
))
};

module.exports = googlePass;