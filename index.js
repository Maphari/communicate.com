import "./models/User.js";
import express from "express";
import mongoose from "mongoose";
import privateKeys from "./privateKeys/privateKeys.js";
import cookieSession from "cookie-session";
import passport from "passport";
const app = express();

mongoose.connect(privateKeys.MONGODB_URI);
app.use(
  cookieSession({
    name: "session",
    maxAge: 20 * 60 * 60 * 1000, // 60 minutes
    keys: [privateKeys.SESSION_KEY],
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.listen(privateKeys.PORT);
