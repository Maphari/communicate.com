import React from "react";
import { Nav } from "../Home/Nav";
import { UserPosts } from "./User/UserPosts";
import { HelperPosts } from "./Helper/HelperPosts";

export const Post = () => {
  const userToken = localStorage.getItem("token");
  const helperToken = localStorage.getItem("token-helper");

  return (
    <>
      <Nav />
      {(userToken && <UserPosts />) || (helperToken && <HelperPosts />)}
    </>
  );
};
