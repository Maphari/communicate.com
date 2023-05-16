import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./homeComponents/User/Dashboard";
import { DataToSendContext } from "../context/DataTosendContext/DataToSendContext";
import { toast } from "react-toastify";

export const Home = () => {
  const userSession = localStorage.getItem("session");
  const navigate = useNavigate();
  const { data } = useContext(DataToSendContext);

  const toastNotificationInfo = (message) => {
    toast.info(message, {
      toastId: "session-expired",
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  useEffect(() => {
    if (!userSession) {
      navigate("/account/login", { replace: true });
    }
  }, [userSession, navigate]);

  return (
    <>
      <Dashboard />
    </>
  );
};
