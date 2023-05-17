import React from "react";
import { connect } from "react-redux";
import Requester from "./Requester";
import { Helper } from "./Helper";

const Dashboard = () => {
  const session = localStorage.getItem("token");
  const helperSession = localStorage.getItem("token-helper");

  return <>{session ? <Requester /> : helperSession ? <Helper /> : null}</>;
};

export default connect()(Dashboard);
