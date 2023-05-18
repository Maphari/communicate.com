import React from "react";
import { ProfileHelper } from "./homeComponents/helper/ProfileHelper";
import { ProfileUser } from "./homeComponents/User/ProfileUser";

export const Profile = () => {
  const userToken = localStorage.getItem("token");
  const helperToken = localStorage.getItem("token-helper");
  return userToken ? <ProfileUser /> : helperToken ? <ProfileHelper /> : null;
};
