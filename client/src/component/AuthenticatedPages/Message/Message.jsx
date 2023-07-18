import React from "react";
import { Nav } from "../Home/Nav";
import { UserMessage } from "./User/UserMessage";
import { HelperMessage } from "./Helper/HelperMessage";

export const Messages = () => {
  const userToken = localStorage.getItem("token");
  const HelperToken = localStorage.getItem("token-helper");

  return (
    <>
      <Nav />
      {(userToken && <UserMessage />) || (HelperToken && <HelperMessage />)}
    </>
  );
};
