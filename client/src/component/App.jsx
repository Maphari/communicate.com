import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./landingPage/LandingPage";
import { Register } from "./account/userAccount/Register";
import { Login } from "./account/userAccount/Login";
import { HelperRegister } from "./account/helperAccount/HelperRegister";
import { HelperLogin } from "./account/helperAccount/HelperLogin";
import { BankAccountHelper } from "./AuthenticatedPages/Home/BankAccountHelper";
import { Profile } from "./AuthenticatedPages/Home/Profile";
import { History } from "./AuthenticatedPages/Home/History";
import { Settings } from "./AuthenticatedPages/Home/Settings";
import { Messages } from "./AuthenticatedPages/Message/Message";
import { Accept } from "./AuthenticatedPages/Home/helper/Accept";
import { Decline } from "./AuthenticatedPages/Home/helper/Decline";
import { DataToSendContext } from "./context/DataTosendContext/DataToSendContext";
import { Equipment } from "./AuthenticatedPages/Home/helper/Equipment";
import Dashboard from "./AuthenticatedPages/Home/Dashboard";
import Loader from "./animation/Loder";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";

export default function App() {
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const tokenHelper = localStorage.getItem("token-helper");
  const { data, helperData, error } = useContext(DataToSendContext);
  const location = useLocation();
  const navigate = useNavigate();

  const toastNotificationError = (message) => {
    toast.error(message, {
      toastId: "session",
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  useEffect(() => {
    const loader = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(loader);
  }, [loading]);

  // THIS USEEFFECT WILL DISABLE CHANGING TO HOME PAGE AFTER USER REFRESHES THE WEBPAGE WHEN USER IS IN DIFFERENT ROUTE
  useEffect(() => {
    // FOR USER ACCOUNT
    if (location.pathname === "/home" && token) {
      navigate("/home", { replace: true });
    } else if (location.pathname === "/account/helper" && tokenHelper) {
      navigate("/account/helper", { replace: true });
    } else if (
      (location.pathname === "/message" && token) ||
      (location.pathname === "/message" && tokenHelper)
    ) {
      navigate("/message");
    } else if (
      (location.pathname === "/profile" && token) ||
      (location.pathname === "/profile" && tokenHelper)
    ) {
      navigate("/profile");
    } else if (
      (location.pathname === "/setting" && token) ||
      (location.pathname === "/setting" && tokenHelper)
    ) {
      navigate("/setting");
    } else if (
      (location.pathname === "/history" && token) ||
      (location.pathname === "/history" && tokenHelper)
    ) {
      navigate("/history");
    } else if (location.pathname === "/account/helper_bank-account") {
      navigate("/account/helper_bank-account");
    }
  }, []);

  if (!data.session === token || !helperData.session === tokenHelper) {
    toastNotificationError("You have to be logged in to access this page.");
    localStorage.clear();
    navigate("/account/login");
  }

  useEffect(() => {
    const response = error?.response;

    if (
      response?.status === 401 &&
      response?.statusText === "Unauthorized" &&
      response?.data?.error === "Session expired or user not authenticated" &&
      (token || tokenHelper)
    ) {
      toastNotificationError("You have to be logged in to access this page");
      localStorage.clear();
      navigate("/account/login");
    }
  }, [error]);

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              token ? (
                <Navigate to="/home" replace={true} />
              ) : tokenHelper ? (
                <Navigate to="/account/helper" replace={true} />
              ) : (
                <LandingPage />
              )
            }
          />
          <Route
            path="/account/helper"
            element={tokenHelper ? <Dashboard /> : <HelperRegister />}
          />
          <Route
            path="/account/helper_register"
            element={!tokenHelper ? <HelperRegister /> : <Dashboard />}
          />
          <Route
            path="/account/helper_login"
            element={!tokenHelper ? <HelperLogin /> : <Dashboard />}
          />
          <Route
            path="/account/register"
            element={!token ? <Register /> : <Dashboard />}
          />
          <Route
            path="/account/login"
            element={!token ? <Login /> : <Dashboard />}
          />
          <Route
            path="/home"
            element={token ? <Dashboard /> : <Navigate to="/" replace={true} />}
          />
          <Route
            path="/profile"
            element={token || tokenHelper ? <Profile /> : <LandingPage />}
          />
          <Route
            path="/bank-account"
            element={
              tokenHelper || token ? <BankAccountHelper /> : <Navigate to="/" />
            }
          />
          <Route
            path="/account/helper-declined"
            element={
              tokenHelper ? <Decline /> : <Navigate to="/account/helper" />
            }
          />
          <Route
            path="/account/helper-accept"
            element={
              tokenHelper ? <Accept /> : <Navigate to="/account/helper" />
            }
          />
          <Route
            path="/history"
            element={
              token || tokenHelper ? (
                <History />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            path="/settings"
            element={
              token || tokenHelper ? (
                <Settings />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            path="/message"
            element={
              token || tokenHelper ? (
                <Messages />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            path="/equipment"
            element={
              tokenHelper ? <Equipment /> : <Navigate to="/" replace={true} />
            }
          />
        </Routes>
      )}
    </>
  );
}
