import privateKeys from "../privateKeys/privateKeys.js";
import passport from "passport";
import passportSpotify from "passport-spotify";
import passportGoogle from "passport-google-oauth20";
const SpotifyStrategy = passportSpotify.Strategy;
const GoogleStrategy = passportGoogle.Strategy;
import mongoose from "mongoose";
const User = mongoose.model("user");
import jwt from "jsonwebtoken";

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
      clientID: privateKeys.GOOGLE_KEY,
      clientSecret: privateKeys.GOOGLE_SECRET,
      callbackURL: "/api/v1/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne(profile.id);

      if (user) {
        done(null, user);
      } else {
        const token = jwt.sign({ userId: profile.id}, privateKeys.MY_SECRET, {
          expiresIn: "24",
        });
        const newUser = new User({
          clientID: token,
          profilePicture: profile.photos ? profile.photos[0].value : null,
          name: profile.displayName,
          email: profile.emails ? profile.emails[0].value : null,
        }).save();
        done(null, newUser);
      }
    }
  )
);

passport.use(
  new SpotifyStrategy(
    {
      clientID: privateKeys.SPOTIFT_CLIENTID,
      clientSecret: privateKeys.SPOTIFY_SECRET,
      callbackURL: "/api/v1/auth/spotify/callback",
    },
    async (accessToken, refreshToken, expirire_in, profile, done) => {
      const user = await User.findOne(profile.id);
      if (user) {
        done(null, user);
      } else {
        const token = jwt.sign({ userId: profile.id}, privateKeys.MY_SECRET, {
          expiresIn: "24",
        });
        const newUser = new User({
          clientID: token,
          profilePicture: profile.photos ? profile.photos[0].value : null,
          name: profile.displayName,
          email: profile.emails ? profile.emails[0].value : null,
        }).save();
        done(null, newUser);
      }
    }
  )
);
