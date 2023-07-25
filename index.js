require("./webSockets/requestWebSockerServer");
require("./models/User");
require("./models/Helper");
require("./models/Requests");
require("./models/HelperEquipment");
const express = require("express");
const mongoose = require("mongoose");
const keys = require("./privateKeys/privateKeys");
const passport = require("passport");
const cookieSession = require("cookie-session");
const authRoutes = require("./routes/authRoutes");
const requestRoutes = require("./routes/requestRouter");
const getDBRoutes = require("./routes/getDBRoutes");
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
app.use(authRoutes);
app.use(requestRoutes);
app.use(getDBRoutes);
app.listen(keys.PORT);
