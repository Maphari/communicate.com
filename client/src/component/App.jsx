import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./landingPage/LandingPage";
import { Register } from "./account/userAccount/Register";
import { Login } from "./account/userAccount/Login";
import { BankAccount } from "./authrnticatedPages/homeComponents/User/BankAccount";
import { ProfileHelper } from "../component/authrnticatedPages/homeComponents/helper/ProfileHelper";
import { HelperRegister } from "./account/helperAccount/HelperRegister";
import { HelperLogin } from "./account/helperAccount/HelperLogin";
import { ProfileUser } from "./authrnticatedPages/homeComponents/User/ProfileUser";
import { BankAccountHelper } from "./authrnticatedPages/homeComponents/helper/BankAccountHelper";
import { Profile } from "./authrnticatedPages/Profile";
import Dashboard from "./authrnticatedPages/homeComponents/Dashboard";
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
          <Route path="/" element={!token ? <LandingPage /> : <Dashboard />} />
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
            element={token || tokenHelper ? <Profile /> : <LandingPage />}
          />
          <Route
            path="/bank_account"
            element={token ? <BankAccount /> : <LandingPage />}
          />
          <Route
            path="/account/helper/bank_account"
            element={tokenHelper ? <BankAccountHelper /> : <LandingPage />}
          />
        </Routes>
      )}
    </>
  );
}
