import React from "react";
import { ProfileHelper } from "./helper/ProfileHelper";
import { ProfileUser } from "./User/ProfileUser";

export const Profile = () => {
  const userToken = localStorage.getItem("token");
  const helperToken = localStorage.getItem("token-helper");
  return userToken ? <ProfileUser /> : helperToken ? <ProfileHelper /> : null;
};
