import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./landingPage/LandingPage";
import { Register } from "./account/Register";
import { Login } from "./account/Login";
import { Home } from "./authrnticatedPages/Home";
import { BankAccount } from "./authrnticatedPages/homeComponents/BankAccount";
import { HelperRegister } from "./authrnticatedPages/helper/account/HeleperRegister";
import { Profile } from "./authrnticatedPages/homeComponents/Profile";
import Loader from "./animation/Loder";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const userSession = localStorage.getItem("session");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loader = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(loader);
  }, []);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
              userSession ? <Home /> : <Navigate to="/" replace={true} />
            }
          />
          <Route path="/helper/account_register" element={<HelperRegister />} />
          <Route path="/bank_account" element={<BankAccount />} />
          <Route />
        </Routes>
      )}
    </>
  );
}
