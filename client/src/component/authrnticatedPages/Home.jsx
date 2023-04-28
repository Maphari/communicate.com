import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const userToken = localStorage.getItem("sessionID");
  const googleToken = localStorage.getItem("google-token");
  const spotifyToken = localStorage.getItem("spotify-token");
  const navigate = useNavigate();

  return <h1>home</h1>;
};
