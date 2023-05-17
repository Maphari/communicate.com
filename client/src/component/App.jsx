import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./landingPage/LandingPage";
import { Register } from "./account/userAccount/Register";
import { Login } from "./account/userAccount/Login";
import Dashboard from "./authrnticatedPages/homeComponents/User/Dashboard";
import { BankAccount } from "./authrnticatedPages/homeComponents/User/BankAccount";
import { HelperRegister } from "./account/helperAccount/HelperRegister";
import { HelperLogin } from "./account/helperAccount/HelperLogin";
import { Profile } from "./authrnticatedPages/homeComponents/User/Profile";
import Loader from "./animation/Loder";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const tokenHelper = localStorage.getItem("token-helper");

  useEffect(() => {
    const loader = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(loader);
  }, [loading]);

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route
            path="/"
            element={!token ? <LandingPage /> : <Dashboard />}
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
            element={token ? <Dashboard /> : <LandingPage />}
          />
            <Route
            path="/profile"
            element={token ? <Profile /> : <LandingPage />}
          />
        </Routes>
      )}
    </>
  );
}
