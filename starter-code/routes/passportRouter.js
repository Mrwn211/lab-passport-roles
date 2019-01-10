const express = require("express");
const passportRouter = express.Router();
// Require user model
const User = require("../models/user");
// Add bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
// Add passport
const passport = require("passport");
LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);

// Login to access private page
const ensureLogin = require("connect-ensure-login");
passportRouter.get("/private", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("passport/private", { user: req.user });
});
