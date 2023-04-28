import "./models/User.js";
import express from "express";
import mongoose from "mongoose";
import privateKeys from "./privateKeys/privateKeys.js";
import cookieSession from "cookie-session";
import passport from "passport";
import route from "./routes/authRoutes.js";
const app = express();

mongoose.connect(privateKeys.MONGODB_URI);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    maxAge: 20 * 60 * 60 * 1000, // 60 minutes
    keys: [privateKeys.SESSION_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(route);
app.listen(privateKeys.PORT);
