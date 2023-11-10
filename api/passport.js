const Keys = require("../privateKeys/privateKeys");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebooStrategy = require("passport-facebook").Strategy;
const SpotifyStrategy = require("passport-spotify").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("user");

// CREATING A UNIQUE IDENTIFIER
passport.serializeUser((user, done) => {
  done(null, user.id);
});
// FINDIND THAT ONE USER WITH THIS ID
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// telling passport to handle google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: Keys.GOOGLE_ID,
      clientSecret: Keys.GOOGLE_SECRET,
      callbackURL: "/api/auth/google/callback",
      scope: ["profile", "email"],
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ clientID: profile.id });
      if (user) {
        done(null, user);
      } else {
        const newUser = await new User({
          clientID: profile.id,
          profilePicture: profile.photos ? profile.photos[0].value : null,
          name: profile.displayName,
          email: profile.emails ? profile.emails[0].value : null,
          gender: profile.gender,
        }).save();
        done(null, newUser);
      }
    }
  )
);
// telling passport to handle facebook strategy
passport.use(
  new FacebooStrategy(
    {
      clientID: Keys.FACEBOOK_APP_ID,
      clientSecret: Keys.FACEBOOK_APP_SECRET,
      callbackURL: "/api/auth/facebook/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ clientID: profile.id });

      if (user) {
        done(null, user);
      } else {
        const newUser = await new User({
          clientID: profile.id,
          profilePicture: profile.photos ? profile.photos[0].value : null,
          name: profile.displayName,
          email: profile.emails ? profile.emails[0].value : null,
          gender: profile.gender,
        }).save();
        done(null, newUser);
      }
    }
  )
);
// telling passport to handle spotify strategy
passport.use(
  new SpotifyStrategy(
    {
      clientID: Keys.SPOTIFY_APP_ID,
      clientSecret: Keys.SPOTIFY_APP_SECRET,
      callbackURL: "/api/auth/spotify/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ clientID: profile.id });

      if (user) {
        done(null, user);
      } else {
        const newUser = await new User({
          clientID: profile.id,
          profilePicture: profile.photos ? profile.photos[0].value : null,
          name: profile.displayName,
          email: profile.emails ? profile.emails[0].value : null,
          gender: profile.gender,
        }).save();
        done(null, newUser);
      }
    }
  )
);
