import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { DataToSendContext } from "../../context/DataToSendContext";

export const Nav = () => {
  const dataContext = useContext(DataToSendContext);
  const { data } = dataContext || {};
  const location = useLocation();

  const sliceUsername = (username) => {
    return username.toUpperCase().slice(0, 2);
  };

  return (
    <>
      <section className="nav-container border-b bg-white relative z-[99999]">
        <header className="nav-container__header">
          <h1 className="font-[900] opacity-90 text-[24px]">
            Communica<span className="text-yellow-500">tee.</span>
          </h1>
          <div className="flex items-center flex-wrap gap-1">
            <Link
              to="/home"
              className={`px-2 py-1 rounded hover:text-yellow-600 transition-all duration-500 ease-linear relative text-md font-[500] opacity-90  ${
                location.pathname === "/home" ? "nav-link-active" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/bank_account"
              className={`px-2 py-1  rounded hover:text-yellow-600 transition-all duration-500 ease-linear relative text-md font-[500] opacity-90  ${
                location.pathname === "/bank_account" ? "nav-link-active" : ""
              }`}
            >
              Bank Account
            </Link>
            <Link
              to="/become_hepler"
              className={`px-2 py-1  rounded hover:text-yellow-600 transition-all duration-500 ease-linear relative text-md font-[500] opacity-90  ${
                location.pathname === "/become_hepler" ? "nav-link-active" : ""
              }`}
            >
              Become Hepler
            </Link>
            <Link
              to=""
              className="h-10 w-10 transition-all duration-500 ease-linear bg-yellow-500 flex items-center justify-center font-black rounded-full hover:text-black hover:bg-yellow-400"
            >
              {sliceUsername(data?.user?.email)}
            </Link>
          </div>
        </header>
      </section>
    </>
  );
};