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
      <section className="nav-container border-b bg-white relative z-[99999]">
        <header className="nav-container__header">
          {session ? (
            <Link className="hover:text-black" to="/home">
              <h1 className="font-[900] opacity-90 text-[22px]">
                Communica<span className="text-yellow-500">tee.</span>
              </h1>
            </Link>
          ) : helperSession ? (
            <Link className="hover:text-black" to="/account/helper">
              <h1 className="font-[900] opacity-90 text-[22px]">
                Communica<span className="text-yellow-500">tee</span> helper
              </h1>
            </Link>
          ) : null}
          <div className="flex items-center flex-wrap gap-1">
            {session ? (
              <Link
                to="/home"
                className={`px-2 py-1 rounded hover:text-yellow-600 transition-all duration-500 ease-linear relative text-md font-[500] opacity-90  ${
                  location.pathname === "/home" ? "nav-link-active" : ""
                }`}
              >
                Home
              </Link>
            ) : helperSession ? (
              <Link
                to="/account/helper"
                className={`px-2 py-1 rounded hover:text-yellow-600 transition-all duration-500 ease-linear relative text-md font-[500] opacity-90  ${
                  location.pathname === "/account/helper"
                    ? "nav-link-active"
                    : ""
                }`}
              >
                Home
              </Link>
            ) : null}
            {session ? (
              <Link
                to="/bank_account"
                className={`px-2 py-1  rounded hover:text-yellow-600 transition-all duration-500 ease-linear relative text-md font-[500] opacity-90  ${
                  location.pathname === "/bank_account" ? "nav-link-active" : ""
                }`}
              >
                Bank Account
              </Link>
            ) : helperSession ? (
              <Link
                to="/account/helper/bank_account"
                className={`px-2 py-1  rounded hover:text-yellow-600 transition-all duration-500 ease-linear relative text-md font-[500] opacity-90  ${
                  location.pathname === "/account/helper/bank_account"
                    ? "nav-link-active"
                    : ""
                }`}
              >
                Bank Account
              </Link>
            ) : null}

            {session ? (
              <Link
                onMouseOver={() => setIsHoverUser(true)}
                className=" rounded-full transition-all duration-500 ease-linear border py-[5px] px-2 flex items-center justify-center gap-2 hover:text-black hover:bg-yellow-400"
              >
                <span>{data?.user?.username} </span>
                <i className="fa-solid fa-caret-down"></i>
              </Link>
            ) : helperSession ? (
              <Link
                onMouseOver={() => setIsHelperHover(true)}
                className="py-[5px] px-2 rounded-full transition-all duration-500 ease-linear border flex items-center gap-2 justify-center hover:text-black hover:bg-yellow-400"
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
            className="absolute rounded-b-xl top-full right-5 bg-white w-[15rem] drop-shadow-2xl"
          >
            <div className="flex items-center flex-col w-full">
              <header className="px-2 rounded py-2 w-full flex items-center justify-center flex-col">
                <img
                  src={logoImage}
                  alt="logo"
                  className="h-8 w-8 object-contain"
                />
                <div className="mt-2 text-center w-full">
                  <p className="text-[0.9rem] font-[600]">
                    {data?.user?.username}
                  </p>
                  <p className="text-[0.8rem] font-[500] mt-1">
                    {data?.user?.email}
                  </p>
                </div>
              </header>
              <div className="w-full">
                <Link
                  to="/profile"
                  className="flex rounded-xl border-t justify-between text-[0.9rem] items-center gap-2 px-[0.9rem] py-[0.45rem] transition-all duration-700 ease-linear hover:bg-yellow-500 hover:text-black"
                >
                  <span className="font-[400]">Profile</span>
                  <i className="fa-solid fa-user"></i>
                </Link>
                <Link
                  onClick={handleUserLogOut}
                  className="flex rounded-xl hover:text-black border-t justify-between text-[0.9rem] items-center gap-2 px-[0.74rem] py-[0.45rem]  transition-all duration-700 ease-linear hover:bg-yellow-500"
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
            className="absolute rounded-b-xl top-full right-5 bg-white w-[15rem] drop-shadow-2xl"
          >
            <div className="flex items-center flex-col w-full">
              <header className="px-2 rounded py-3 w-full flex items-center justify-center flex-col">
                <div className="absolute right-3 top-3 bg-white drop-shadow-xl p-2 flex justify-center items-center font-b rounded-full h-6 w-6">
                  <i className="fa-solid fa-certificate"></i>
                </div>
                <img
                  src={logoImage}
                  alt="logo"
                  className="h-8 w-8 object-contain"
                />
                <div className="mt-2 text-center w-full">
                  <p className="text-[0.9rem] font-[600]">
                    {helperData?.helper?.username}
                  </p>
                  <p className="text-[0.8rem] font-[500] mt-1">
                    {helperData?.helper?.email}
                  </p>
                </div>
              </header>
              <div className="w-full">
                <Link
                  to="/profile"
                  className="flex rounded-xl border-t justify-between text-[0.9rem] items-center gap-2 px-[0.9rem] py-[0.45rem] transition-all duration-700 ease-linear hover:bg-yellow-500 hover:text-black"
                >
                  <span className="font-[400]">Profile</span>
                  <i className="fa-solid fa-user"></i>
                </Link>
                <Link
                  onClick={handleHeleprLogOut}
                  className="flex rounded-xl border-t justify-between text-[0.9rem] items-center gap-2 px-[0.9rem] py-[0.45rem] transition-all duration-700 ease-linear hover:bg-yellow-500 hover:text-black"
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
