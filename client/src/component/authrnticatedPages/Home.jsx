import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dashboard } from "./homeComponents/Dashboard";

export const Home = () => {
  const userSession = localStorage.getItem("session");
  const navigate = useNavigate();

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
