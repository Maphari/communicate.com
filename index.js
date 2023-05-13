import "./models/User.js";
import "./models/Helper.js";
import "./models/Requests.js";
import express from "express";
import mongoose from "mongoose";
import privateKeys from "./privateKeys/privateKeys.js";
import cookieSession from "cookie-session";
import passport from "passport";
import route from "./routes/authRoutes.js";
import router from "./routes/router.js";
const app = express();

mongoose.connect(privateKeys.MONGODB_URI);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    keys: [privateKeys.SESSION_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(route);
app.use(router);
app.listen(privateKeys.PORT);
