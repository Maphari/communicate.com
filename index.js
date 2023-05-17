require("./webSockets/requestWebSockerServer");
require("./models/User.js");
require("./models/Helper.js");
require("./models/Requests.js");
const express = require("express");
const mongoose = require("mongoose");
const keys = require("./privateKeys/privateKeys");
const passport = require("passport");
const cookieSession = require("cookie-session");
const route = require("./routes/authRoutes");
const router = require("./routes/router");
const cors = require("cors");

const app = express();

mongoose.connect(keys.MONGODB_URI);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    keys: [keys.SESSION_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(route);
app.use(router);
app.listen(keys.PORT);
