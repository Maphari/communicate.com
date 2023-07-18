import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import  Helper  from "./helper/Helper";
import Requester from "./User/Requester";

const Dashboard = () => {
  const session = localStorage.getItem("token");
  const helperSession = localStorage.getItem("token-helper");
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/home", { replace: true });
    } else if (helperSession) {
      navigate("/account/helper", { replace: true });
    }
  }, [session, helperSession, navigate]);

  return <>{session ? <Requester /> : helperSession ? <Helper /> : null}</>;
};

export default connect()(Dashboard);
