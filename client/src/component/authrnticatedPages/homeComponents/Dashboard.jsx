import React from "react";
import { connect } from "react-redux";
import Requester from "./User/Requester";
import { Helper } from "./helper/Helper";

const Dashboard = () => {
  const session = localStorage.getItem("token");
  const helperSession = localStorage.getItem("token-helper");

  return <>{session ? <Requester /> : helperSession ? <Helper /> : null}</>;
};

export default connect()(Dashboard);
