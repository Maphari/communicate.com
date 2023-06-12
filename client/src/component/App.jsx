import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./landingPage/LandingPage";
import { Register } from "./account/userAccount/Register";
import { Login } from "./account/userAccount/Login";
import { HelperRegister } from "./account/helperAccount/HelperRegister";
import { HelperLogin } from "./account/helperAccount/HelperLogin";
import { BankAccountHelper } from "./authrnticatedPages/homeComponents/helper/BankAccountHelper";
import { Profile } from "./authrnticatedPages/homeComponents/Profile";
import { History } from "./authrnticatedPages/homeComponents/History";
import { Settings } from "./authrnticatedPages/homeComponents/Settings";
import { Messages } from "./authrnticatedPages/MessageComponents/Message";
import { NewsFeed } from "./authrnticatedPages/newsFeedComponents/NewsFeed";
import { Accept } from "./authrnticatedPages/homeComponents/helper/Accept";
import { Decline } from "./authrnticatedPages/homeComponents/helper/Decline";
import RequestInformation from "./authrnticatedPages/homeComponents/User/RequestInformation";
import Dashboard from "./authrnticatedPages/homeComponents/Dashboard";
import Loader from "./animation/Loder";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const tokenHelper = localStorage.getItem("token-helper");
  const navigate = useNavigate();

  useEffect(() => {
    const loader = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(loader);
  }, [loading]);

  useEffect(() => {
    if (token) {
      navigate("/home", { replace: true });
    } else if (tokenHelper) {
      navigate("/account/helper", { replace: true });
    }
  }, []);

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
              !token || !tokenHelper ? (
                <LandingPage />
              ) : token ? (
                <Navigate to="/home" replace={true} />
              ) : tokenHelper ? (
                <Navigate to="/account/helper" replace={true} />
              ) : null
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
            path="/account/helper/bank_account"
            element={
              tokenHelper ? (
                <BankAccountHelper />
              ) : (
                <Navigate to="/account/helper" />
              )
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
            path="/request-information"
            element={token ? <RequestInformation /> : <Navigate to="/home" />}
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
            path="/latest-news"
            element={
              token || tokenHelper ? (
                <NewsFeed />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
        </Routes>
      )}
    </>
  );
}
