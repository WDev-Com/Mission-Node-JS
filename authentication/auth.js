// Passport For Authentication
const passport = require("passport");
const Person = require("../models/Person");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log("User Credentials:", username, password);
      const user = await Person.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;
