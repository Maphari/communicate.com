import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import privateKeys from "../privateKeys/privateKeys";
const route = express.Router();
const User = mongoose.model("User");

// GOOGLE AUTHENTICATION ROUTES
route.get(
  "/api/v1/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
route.get(
  "/api/v1/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: `${privateKeys.CLIENT_ROUTE}/home`,
    failureRedirect: `${privateKeys.CLIENT_ROUTE}/account/login`,
  })
);
// SPOTIFY AUTHENTICATION ROUTES
route.get("/api/v1/spotify", passport.authenticate("spotify", {}));
route.get(
  "/api/v1/spotify/callback",
  passport.authenticate("spotify", {
    successRedirect: `${privateKeys.CLIENT_ROUTE}/home`,
    failureRedirect: `${privateKeys.CLIENT_ROUTE}/account/login`,
  })
);

// ROUTES FOR USER TO CREATE ACCOUNT AND LOGIN USING FORMS
route.post("/api/v1/auth/signup_user", async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      const newUser = new User({
        clientID: null,
        email: email,
        password: password,
      });

      const token = jwt.sign({ userId: newUser._id }, process.env.MY_SECRET, {
        expiresIn: "24",
      });
      newUser.clientID = token;
      req.session.user = {
        clientID: newUser.clientID,
        email: newUser.email,
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
      const token = jwt.sign({ userId: user._id }, process.env.MY_SECRET, {
        expiresIn: "24h",
      });
      user.clientID = token;

      req.session.user = {
        clientID: user.clientID,
        email: user.email,
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

route.post("/api/v1/auth/signin_user", async function (req, res) {
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

// ROUTER AFTER USER SUCCESS ON AUTHENTICATION
route.get("/api/auth/passport_success", (req, res) => {
  if (req.isAuthenticated())
    res.json({
      user: req.user,
      message: "user is authenticated",
      session: req.user?.clientID,
    });
  else res.json({ message: "User not authenticated" });
});

route.get("/api/auth/account_success", function (req, res) {
  const user = req.session.user;
  if (user)
    res.json({
      user: user,
      session: user.clientID,
      message: "user authenticated",
    });
  else res.json({ message: "User not authenticated" });
});

export default route;
