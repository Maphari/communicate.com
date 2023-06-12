import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DataToSendContext } from "../../context/DataTosendContext/DataToSendContext";
import logoImage from "../../../assets/logo.png";

export const Nav = () => {
  const dataContext = useContext(DataToSendContext);
  const { data, helperData } = dataContext || {};
  const location = useLocation();
  const navigate = useNavigate();
  const [isHoverUser, setIsHoverUser] = useState(false);
  const [isHelperHover, setIsHelperHover] = useState(false);
  const session = localStorage.getItem("token");
  const helperSession = localStorage.getItem("token-helper");

  const handleUserLogOut = () => {
    localStorage.removeItem("token");
    navigate("/account/login", { replace: true });
    window.location.reload();
  };

  const handleHeleprLogOut = () => {
    localStorage.removeItem("token-helper");
    navigate("/account/helper_login", { replace: true });
    window.location.reload();
  };

  return (
    <>
      <section className="nav-container bg-[#161616] drop-shadow-2xl text-white relative z-[99999]">
        <header className="nav-container__header">
          {session ? (
            <Link className="hover:text-black" to="/home">
              <h1 className="font-[900] opacity-90 text-[22px] hover:text-white">
                Communica<span className="text-yellow-500">tee.</span>
              </h1>
            </Link>
          ) : helperSession ? (
            <Link className="hover:text-black" to="/account/helper">
              <h1 className="font-[900] opacity-90 text-[22px] hover:text-white">
                Communica<span className="text-yellow-500">tee</span> helper
              </h1>
            </Link>
          ) : null}
          <div className="flex items-center flex-wrap gap-1">
            {session ? (
              <Link
                to="/home"
                className={`px-2 py-1 rounded hover:text-yellow-600 transition-all duration-500 ease-linear relative text-md font-[300]  ${
                  location.pathname === "/home" ? "nav-link-active" : ""
                }`}
              >
                Home
              </Link>
            ) : helperSession ? (
              <Link
                to="/account/helper"
                className={`px-2 py-1 rounded hover:text-yellow-600 transition-all duration-500 ease-linear relative text-md font-[300] ${
                  location.pathname === "/account/helper"
                    ? "nav-link-active"
                    : ""
                }`}
              >
                Home
              </Link>
            ) : null}
            {session || helperSession ? (
              <Link
                to="/message"
                className={`px-2 py-1  rounded hover:text-yellow-600 transition-all duration-500 ease-linear relative text-md font-[300] ${
                  location.pathname === "/massage" ? "nav-link-active" : ""
                }`}
              >
                Message
              </Link>
            ) : null}
            {session || helperSession ? (
              <Link
                to="/latest-news"
                className={`px-2 py-1  rounded hover:text-yellow-600 transition-all duration-500 ease-linear relative text-md font-[300] ${
                  location.pathname === "/latest-news" ? "nav-link-active" : ""
                }`}
              >
                Latest News
              </Link>
            ) : null}
            {session ? (
              <Link
                onMouseOver={() => setIsHoverUser(true)}
                className="font-[300] rounded-full transition-all duration-500 ease-linear border-[0.3px] border-[#333] py-[5px] px-2 flex items-center justify-center gap-2 hover:text-black hover:bg-yellow-400"
              >
                <span>{data?.user?.username} </span>
                <i className="fa-solid fa-caret-down"></i>
              </Link>
            ) : helperSession ? (
              <Link
                onMouseOver={() => setIsHelperHover(true)}
                className="font-[300] py-[5px] px-2 border-[0.3px] border-[#333] rounded-full transition-all duration-500 ease-linear flex items-center gap-2 justify-center hover:text-black hover:bg-yellow-400"
              >
                <span>{helperData?.helper?.username}</span>
                <i className="fa-solid fa-caret-down"></i>
              </Link>
            ) : null}
          </div>
        </header>

        {isHoverUser && session ? (
          <div
            onMouseLeave={() => setIsHoverUser(false)}
            className="absolute rounded-b-xl rounded-t-lg top-full right-5 bg-[#161616] w-[15rem] drop-shadow-2xl"
          >
            <div className="flex items-center flex-col w-full">
              <div className="w-full">
                <Link
                  to="/profile"
                  className="flex border-t border-[#333] justify-between text-[0.9rem] items-center gap-2 px-[0.9rem] py-[0.45rem] transition-all duration-700 ease-linear hover:text-yellow-500"
                >
                  <span className="font-[400]">Profile</span>
                  <i className="fa-solid fa-user"></i>
                </Link>
                <Link
                  to="/history"
                  className="flex border-[#333]  border-t justify-between text-[0.9rem] items-center gap-2 px-[0.9rem] py-[0.45rem] transition-all duration-700 ease-linear hover:text-yellow-500"
                >
                  <span className="font-[400]">History</span>
                  <i className="fa-solid fa-timeline"></i>
                </Link>
                <Link
                  to="/settings"
                  className="flex border-[#333]  border-t justify-between text-[0.9rem] items-center gap-2 px-[0.9rem] py-[0.45rem] transition-all duration-700 ease-linear hover:text-yellow-500"
                >
                  <span className="font-[400]">Settings</span>
                  <i className="fa-solid fa-gear"></i>
                </Link>
                <Link
                  to="/account/helper_register"
                  className="flex border-[#333]  border-t justify-between text-[0.9rem] items-center gap-2 px-[0.9rem] py-[0.45rem] transition-all duration-700 ease-linear hover:text-yellow-500"
                >
                  <span className="font-[400]">Become a helper</span>
                  <i className="fa-solid fa-car"></i>
                </Link>
                <Link
                  onClick={handleUserLogOut}
                  className="flex hover:text-yellow-500 border-[#333]  border-t justify-between text-[0.9rem] items-center gap-2 px-[0.74rem] py-[0.45rem]  transition-all duration-700 ease-linear"
                >
                  <span className="font-[400]">Log out</span>
                  <i className="fa-solid fa-right-from-bracket"></i>
                </Link>
              </div>
            </div>
          </div>
        ) : isHelperHover && helperSession ? (
          <div
            onMouseLeave={() => setIsHelperHover(false)}
            className="absolute rounded-b-xl rounded-t-lg top-full right-5 bg-[#161616] w-[15rem] drop-shadow-2xl"
          >
            <div className="flex items-center flex-col w-full">
              <div className="w-full">
                <Link
                  to="/profile"
                  className="flex border-[#333] border-t justify-between text-[0.9rem] items-center gap-2 px-[0.9rem] py-[0.45rem] transition-all duration-700 ease-linear hover:text-yellow-500"
                >
                  <span className="font-[400]">Profile</span>
                  <i className="fa-solid fa-user"></i>
                </Link>
                <Link
                  to="/history"
                  className="flex border-[#333] border-t justify-between text-[0.9rem] items-center gap-2 px-[0.9rem] py-[0.45rem] transition-all duration-700 ease-linear hover:text-yellow-500"
                >
                  <span className="font-[400]">History</span>
                  <i className="fa-solid fa-timeline"></i>
                </Link>
                <Link
                  to="/settings"
                  className="flex border-[#333] border-t justify-between text-[0.9rem] items-center gap-2 px-[0.9rem] py-[0.45rem] transition-all duration-700 ease-linear hover:text-yellow-500"
                >
                  <span className="font-[400]">Settings</span>
                  <i className="fa-solid fa-gear"></i>
                </Link>
                <Link
                  onClick={handleHeleprLogOut}
                  className="flex border-[#333] border-t justify-between text-[0.9rem] items-center gap-2 px-[0.9rem] py-[0.45rem] transition-all duration-700 ease-linear hover:text-yellow-500"
                >
                  <span className="font-[400]">Log out</span>
                  <i className="fa-solid fa-right-from-bracket"></i>
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
};
