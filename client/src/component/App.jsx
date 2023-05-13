import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./landingPage/LandingPage";
import { Register } from "./account/Register";
import { Login } from "./account/Login";
import { Home } from "./authrnticatedPages/Home";
import { BankAccount } from "./authrnticatedPages/homeComponents/BankAccount";
import { HelperRegister } from "./authrnticatedPages/helper/account/HelperRegister";
import { HelperLogin } from "./authrnticatedPages/helper/account/HelperLogin";
import { Profile } from "./authrnticatedPages/homeComponents/Profile";
import { AccountHelperHome } from "./authrnticatedPages/helper/component/AccountHelperHome";
import Loader from "./animation/Loder";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function App() {
  const userSession = localStorage.getItem("session");
  const helperSession = localStorage.getItem("helper-session");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loader = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(loader);
  }, [loading]);

  useEffect(() => {
    if (helperSession) {
      navigate("/account/helper", { replace: true });
    } else if (userSession) {
      navigate("/home", { replace: true });
    }
  }, [helperSession, userSession, Navigate]);

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
              !userSession ? (
                <LandingPage />
              ) : (
                <Navigate to="/home" replace={true} />
              )
            }
          />
          <Route
            path="/account/register"
            element={
              !userSession ? (
                <Register />
              ) : (
                <Navigate to="/home" replace={true} />
              )
            }
          />
          <Route
            path="/account/login"
            element={
              !userSession ? <Login /> : <Navigate to="/home" replace={true} />
            }
          />
          <Route
            path="/home"
            element={
              userSession && userSession !== "undefined" ? (
                <Home />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            path="/bank_account"
            element={
              userSession && userSession !== "undefined" ? (
                <BankAccount />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            path="/profile"
            element={
              userSession && userSession !== "undefined" ? (
                <Profile />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            path="/helper/account_register"
            element={
              !helperSession ? <HelperRegister /> : <AccountHelperHome />
            }
          />
          <Route
            path="/"
            element={
              helperSession ? (
                <Navigate to="/account/helper" replace={true} />
              ) : (
                <LandingPage />
              )
            }
          />
          <Route
            path="/helper/account_login"
            element={!helperSession ? <HelperLogin /> : <AccountHelperHome />}
          />
          <Route
            path="/account/helper"
            element={helperSession ? <AccountHelperHome /> : <HelperRegister />}
          />
        </Routes>
      )}
    </>
  );
}
