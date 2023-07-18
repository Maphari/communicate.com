const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Keys = require("../privateKeys/privateKeys");
const authRoutes = express.Router();
const User = mongoose.model("user");
const Helper = mongoose.model("Helper");
const checkSession = require("../middleware/authMiddleware");

// GOOGLE AUTHENTICATION ROUTES
authRoutes.get(
  "/api/v1/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRoutes.get(
  "/api/v1/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: `${Keys.CLIENT_ROUTE}/home`,
    failureRedirect: `${Keys.CLIENT_ROUTE}/account/login`,
  })
);

// ROUTES FOR USER TO CREATE ACCOUNT AND LOGIN USING FORMS
authRoutes.post("/api/v1/auth/signup_user", async function (req, res) {
  try {
    const { username, email, mobile, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      const newUser = new User({
        clientID: null,
        username: username,
        email: email,
        mobile: mobile,
        password: password,
      });

      const token = jwt.sign({ userId: newUser._id }, Keys.MY_SECRET, {
        expiresIn: "24",
      });
      newUser.clientID = token;
      req.session.user = {
        clientID: newUser.clientID,
        username: newUser.username,
        email: newUser.email,
        mobile: newUser.mobile,
        password: newUser.password,
      };
      await newUser.save();

      res.status(200).json({
        exist: false,
        message: "Account created successfully",
        session: token,
        user: newUser,
      });
    } else {
      const token = jwt.sign({ userId: user._id }, Keys.MY_SECRET, {
        expiresIn: "24h",
      });
      user.clientID = token;

      req.session.user = {
        clientID: user.clientID,
        username: user.username,
        email: user.email,
        mobile: user.mobile,
        password: user.password,
      };

      await user.save();
      res.status(200).json({
        exist: true,
        message: "Account updated successfully",
        session: token,
        user: user,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

authRoutes.post("/api/v1/auth/signin_user", async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        exist: false,
        errorMessage: "user not found",
      });
    }

    // CHECKING IF PASSWORD PROVIDED IS THE SAME PASSWORD AS HASHED
    const passwordHashMatch = await bcrypt.compare(password, user.password);
    if (!passwordHashMatch) {
      return res
        .status(401)
        .json({ errorMessage: "Invalid username or password" });
    } else {
      req.session.user = {
        user: user,
        session: user?.clientID,
      };

      return res.status(200).json({
        message: "Login successfully",
        session: user?.clientID,
        user: user,
      });
    }
  } catch (error) {
    return res.status(401).json({ errorMessage: error.message });
  }
});
// HELPER ROUTES
authRoutes.post("/api/v1/auth/helper/register_user", async (req, res) => {
  try {
    const { username, email, mobile, password } = req.body;
    const helper = await Helper.findOne({ email });

    if (!helper) {
      const newHelper = new Helper({
        clientID: null,
        username: username,
        email: email,
        mobile: mobile,
        password: password,
      });
      const token = jwt.sign({ userId: newHelper._id }, Keys.MY_SECRET, {
        expiresIn: "24h",
      });
      newHelper.clientID = token;

      req.session.user = {
        clientID: newHelper.clientID,
        username: newHelper.username,
        email: newHelper.email,
        mobile: newHelper.mobile,
        password: newHelper.password,
      };

      await newHelper.save();
      res.status(200).json({
        exist: false,
        session: token,
        message: "Account created successfully",
        helper: newHelper,
      });
    } else {
      const token = jwt.sign({ userId: helper._id }, Keys.MY_SECRET, {
        expiresIn: "24h",
      });
      helper.clientID = token;

      req.session.user = {
        clientID: helper.clientID,
        username: helper.username,
        email: helper.email,
        mobile: helper.mobile,
        password: helper.password,
      };
      await helper.save();

      res.status(200).json({
        exist: true,
        message: "Account updated successfully",
        session: token,
        helper: helper,
      });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

authRoutes.post("/api/v1/auth/helper/login_user", async (req, res) => {
  try {
    const { email, password } = req.body;
    const helper = await Helper.findOne({ email });
    // IF THE USER DOESNT EXIST RETURN EARLY
    if (!helper) {
      return res
        .status(401)
        .json({ errorMessage: "User not found", exist: false });
    }
    // CHECKING HEPER PASSWORD
    const isPasswordMatch = await bcrypt.compare(password, helper.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ errorMessage: "Invalid username or password" });
    } else {
      req.session.user = {
        session: helper.clientID,
        helper: helper,
      };
      return res.status(200).json({
        message: "Login successful",
        session: helper?.clientID,
        helper: helper,
      });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

// ROUTER AFTER USER SUCCESS ON AUTHENTICATION
authRoutes.get("/api/auth/passport_success", checkSession, (req, res) => {
  if (req.isAuthenticated())
    res.json({
      user: req.user,
      message: "user is authenticated",
      session: req.user?.clientID,
    });
  else res.json({ message: "User not authenticated" });
});

authRoutes.get("/api/auth/account_success", checkSession, function (req, res) {
  const user = req.session.user;
  if (user)
    res.json({
      user: user,
      session: user.clientID,
      message: "user authenticated",
    });
  else res.json({ message: "User not authenticated" });
});

authRoutes.get("/api/auth/helper_success", checkSession, function (req, res) {
  const helper = req.session.user;

  if (helper)
    res.json({
      helper: helper,
      session: helper?.clientID,
      message: "Account is verified",
    });
  else res.json({ message: "Account is not authenticated" });
});

authRoutes.get("/api/authentication", checkSession, (req, res, next) => {
  if ((req.session.user && req.session) || req.isAuthenticated()) next();
  else
    res
      .status(401)
      .send({ errorMessage: "Session has expired or is not authenticated" });
});

module.exports = authRoutes;
