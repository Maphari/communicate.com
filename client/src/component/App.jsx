import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./landingPage/LandingPage";
import { Register } from "./account/Register";
import { Login } from "./account/Login";
import { Home } from "./authrnticatedPages/Home";
import Loader from "./animation/Loder";
import "react-toastify/dist/ReactToastify.css";

const Router = () => {
  const userToken = localStorage.getItem("sessionID");
  const googleToken = localStorage.getItem("google-token");
  const spotifyToken = localStorage.getItem("spotify-token");

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
      <Routes>
        <Route
          path="/"
          element={
            !userToken || !googleToken || !spotifyToken ? (
              <LandingPage />
            ) : (
              <Navigate to="/home" replace={true} />
            )
          }
        />
        <Route
          path="/account/register"
          element={
            !userToken || !googleToken || !spotifyToken ? (
              <Register />
            ) : (
              <Navigate to="/home" replace={true} />
            )
          }
        />
        <Route
          path="/account/login"
          element={
            !userToken || !googleToken || !spotifyToken ? (
              <Login />
            ) : (
              <Navigate to="/home" replace={true} />
            )
          }
        />
        <Route
          path="/home"
          element={
            userToken || spotifyToken || googleToken ? (
              <Home />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />
      </Routes>
    </>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loader = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(loader);
  }, []);

  return loading ? <Loader /> : <Router />;
}
