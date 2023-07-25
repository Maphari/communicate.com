import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DataToSendContext } from "../../context/DataTosendContext/DataToSendContext";
import applicationVersion from "../../../../package.json";

export const Nav = () => {
  const dataContext = useContext(DataToSendContext);
  const { data, helperData } = dataContext || {};
  const [isHoverUser, setIsHoverUser] = useState(false);
  const [isHelperHover, setIsHelperHover] = useState(false);
  const [isSmallScreenMenuOpen, setIsSmallScreenMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
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
      <section className="nav-container border-b-[0.3px] border-[#333] bg-[#161616] text-white relative z-[99999]">
        <header className="nav-container__header">
          {session ? (
            <Link className="hover:text-black" to="/home">
              <h1 className="font-[900] opacity-90 text-[22px] hover:text-white">
                Communica<span className="text-yellow-500">tee.</span>
              </h1>
            </Link>
          ) : helperSession ? (
            <Link className="hover:text-black" to="/account/helper">
              <h1 className="head-help font-[900] opacity-90 text-[22px] hover:text-white">
                Communica<span className="text-yellow-500">tee</span>
                <i className="fa-solid fa-truck ml-1 text-lg -rotate-12"></i>
              </h1>
            </Link>
          ) : null}
          <div className="links flex items-center flex-wrap gap-1">
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
                  location.pathname === "/message" ? "nav-link-active" : ""
                }`}
              >
                Message
              </Link>
            ) : null}
            {helperSession || session ? (
              <Link
                to="/bank-account"
                className={`px-2 py-1  rounded hover:text-yellow-600 transition-all duration-500 ease-linear relative text-md font-[300] ${
                  location.pathname === "/bank-account" ? "nav-link-active" : ""
                }`}
              >
                Bank account
              </Link>
            ) : null}
            {session ? (
              <Link
                onMouseOver={() => setIsHoverUser(true)}
                onClick={() => setIsHoverUser(true)}
                className="font-[300] rounded-full transition-all duration-500 ease-linear border-[0.3px] border-[#333] py-[5px] px-2 flex items-center justify-center gap-2 hover:text-black hover:bg-yellow-400"
              >
                <span>{data?.user?.username} </span>
                <i className="fa-solid fa-caret-down"></i>
              </Link>
            ) : helperSession ? (
              <Link
                onMouseOver={() => setIsHelperHover(true)}
                onClick={() => setIsHelperHover(true)}
                className="font-[300] py-[5px] px-2 border-[0.3px] border-[#333] rounded-full transition-all duration-500 ease-linear flex items-center gap-2 justify-center hover:text-black hover:bg-yellow-400"
              >
                <span>{helperData?.helper?.username}</span>
                <i className="fa-solid fa-caret-down"></i>
              </Link>
            ) : null}
          </div>
        </header>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 border-[0.1px] border-[#2b2b2b] menu px-2 py-1 transition-all duration-700 ease-linear hover:bg-[#2b2b2b]">
            <i className="fa-solid fa-envelope menu text-xl"></i>
          </div>
          <div
            onClick={() => setIsSmallScreenMenuOpen(true)}
            className="flex items-center gap-2 border-[0.1px] border-[#2b2b2b] menu px-2 py-1 transition-all duration-700 ease-linear hover:bg-[#2b2b2b]"
          >
            <i className="fa-solid fa-bars menu text-xl"></i>
          </div>
        </div>
        {isHoverUser && session ? (
          <div
            onMouseLeave={() => setIsHoverUser(false)}
            className="absolute rounded-b-xl rounded-t-lg top-full right-5 bg-[#312e2e] w-[15rem] drop-shadow-2xl"
          >
            <div className="flex items-center flex-col w-full">
              <div className="w-full">
                <Link
                  to="/settings"
                  className="flex border-[#333]  border-t justify-between text-[0.9rem] items-center gap-2 px-[0.9rem] py-[0.45rem] transition-all duration-700 ease-linear hover:text-yellow-500"
                >
                  <span className="font-[400]">Settings</span>
                  <i className="fa-solid fa-gear"></i>
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
            className="absolute rounded-b-xl rounded-t-lg top-full right-5 bg-[#312e2e] w-[15rem] drop-shadow-2xl"
          >
            <div className="flex items-center flex-col w-full">
              <div className="w-full">
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
      {isSmallScreenMenuOpen && (
        <div className="absolute h-full w-full bg-[#161616] z-[999999] text-white transition-all duration-700 ease-linear">
          <header className="flex items-center justify-between pt-2 py-4 px-3">
            <h1 className="font-bold text-xl">
              Communica<span className="text-yellow-500">tee.</span>
            </h1>
            <div
              className="border-[0.3px] border-[#2b2b2b] p-2 flex items-center gap-1"
              onClick={() => setIsSmallScreenMenuOpen(false)}
            >
              <i className="fa-solid fa-xmark"></i>
              <span>CLOSE</span>
            </div>
          </header>
          <section className="px-3 flex justify-center items-center flex-col">
            <Link
              to="/profile"
              className="p-[0.73rem] hover:bg-[#2b2b2b] bg-[#1f1f1f] hover:text-white font-[500] w-full flex items-center justify-between rounded mb-2 transition-all duration-500 ease-linear hover:ml-3"
            >
              <span>Profile</span>
              <i className="fa-solid fa-user"></i>
            </Link>
            <Link
              to="/history"
              className="p-[0.73rem] hover:bg-[#2b2b2b] bg-[#1f1f1f] hover:text-white font-[500] w-full flex items-center justify-between rounded mb-2 transition-all duration-500 ease-linear hover:ml-3"
            >
              <span>History</span>
              <i className="fa-solid fa-timeline"></i>
            </Link>
            {helperSession && (
              <Link
                to="/equipment"
                className="p-[0.73rem] hover:bg-[#2b2b2b] bg-[#1f1f1f] hover:text-white font-[500] w-full flex items-center justify-between rounded mb-2 transition-all duration-500 ease-linear hover:ml-3"
              >
                <span>Equipment</span>
                <i className="fa-solid fa-gears"></i>
              </Link>
            )}
            <Link
              to={
                session
                  ? "/account/register"
                  : helperSession
                  ? "/account/helper_register"
                  : null
              }
              className="p-[0.73rem] hover:bg-[#2b2b2b] bg-[#1f1f1f] hover:text-white font-[500] w-full flex items-center justify-between rounded mb-2 transition-all duration-500 ease-linear hover:ml-3"
            >
              <span>
                {session
                  ? "Become a user"
                  : helperSession
                  ? "Become a helper"
                  : null}
              </span>
              <i
                className={`fa-solid fa-${
                  session ? "user" : helperSession ? "car" : ""
                }`}
              ></i>
            </Link>
            <Link
              onClick={
                session
                  ? handleUserLogOut
                  : helperSession
                  ? handleHeleprLogOut
                  : null
              }
              className="p-[0.73rem] hover:bg-[#2b2b2b] bg-[#1f1f1f] hover:text-white font-[500] w-full flex items-center justify-between rounded mb-2 transition-all duration-500 ease-linear hover:ml-3"
            >
              <span>Log out</span>
              <i
                className={`fa-solid fa-${
                  session ? "user" : helperSession ? "car" : ""
                }`}
              ></i>
            </Link>
            <p className="opacity-40">
              Comminicatee version - {applicationVersion.version}
            </p>
          </section>
        </div>
      )}
    </>
  );
};
