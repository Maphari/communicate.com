const Keys = require("../privateKeys/privateKeys");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("user");


passport.serializeUser((user, done) => {
  done(null, user.id);
});
// FINDIND THAT ONE USER WITH THIS ID
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: Keys.GOOGLE_ID,
      clientSecret: Keys.GOOGLE_SECRET,
      callbackURL: "/api/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne(profile.id);

      if (user) {
        done(null, user);
      } else {
        const newUser = new User({
          clientID: profile.id,
          profilePicture: profile.photos ? profile.photos[0].value : null,
          name: profile.displayName,
          email: profile.emails ? profile.emails[0].value : null,
        }).save();
        done(null, newUser);
      }
    }
  )
);

