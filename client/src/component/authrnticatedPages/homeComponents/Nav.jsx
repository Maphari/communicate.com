import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DataToSendContext } from "../../context/DataTosendContext/DataToSendContext";

export const Nav = () => {
  const dataContext = useContext(DataToSendContext);
  const { data, helperData } = dataContext || {};
  const location = useLocation();
  const navigate = useNavigate();
  const [isHoverUser, setIsHoverUser] = useState(false);
  const [isHelperHover, setIsHelperHover] = useState(false);
  const session = localStorage.getItem("session");
  const helperSession = localStorage.getItem("helper-session");

  const handleUserLogOut = () => {
    localStorage.removeItem("session");
    navigate("/account/login", { replace: true });
  };

  const handleHeleprLogOut = () => {
    localStorage.removeItem("helper-session");
    navigate("/account/helper_login", { replace: true });
  };

  return (
    <>
      <section className="nav-container border-b bg-white relative z-[99999]">
        <header className="nav-container__header">
          {session ? (
            <h1 className="font-[900] opacity-90 text-[24px]">
              Communica<span className="text-yellow-500">tee.</span>
            </h1>
          ) : helperSession ? (
            <h1 className="font-[900] opacity-90 text-[24px]">
              Communica<span className="text-yellow-500">tee</span> helper
            </h1>
          ) : null}
          <div className="flex items-center flex-wrap gap-1">
            {session ? (
              <Link
                to={"/home"}
                className={`px-2 py-1 rounded hover:text-yellow-600 transition-all duration-500 ease-linear relative text-md font-[500] opacity-90  ${
                  location.pathname === "/home" ? "nav-link-active" : ""
                }`}
              >
                Home
              </Link>
            ) : helperSession ? (
              <Link
                to="/acccount/helper"
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
                to="/profile"
                onMouseOver={() => setIsHoverUser(true)}
                className="rounded-full transition-all duration-500 ease-linear border py-[5px] px-2 flex items-center justify-center hover:text-black hover:bg-yellow-400"
              >
                {data?.user?.email}
              </Link>
            ) : helperSession ? (
              <Link
                to="/profile"
                onMouseOver={() => setIsHover(true)}
                className="py-[5px] px-2 rounded-full transition-all duration-500 ease-linear border flex items-center justify-center hover:text-black hover:bg-yellow-400"
              >
                {helperData?.helper?.email}
              </Link>
            ) : null}
          </div>
        </header>

        {isHoverUser && session ? (
          <div
            onMouseLeave={() => setIsHoverUser(false)}
            className="absolute top-full right-8 bg-white w-[12rem] drop-shadow-2xl"
          >
            <button
              className="p-2 transition-all duration-700 ease-linear hover:bg-yellow-500 w-full "
              onClick={handleUserLogOut}
            >
              Log out
            </button>
          </div>
        ) : isHelperHover && helperSession ? (
          <div
            onMouseLeave={() => setIsHelperHover(false)}
            className="absolute top-full right-8 bg-white w-[12rem]"
          >
            <button
              className="p-1 transition-all duration-700 ease-linear hover:bg-yellow-500 w-full "
              onClick={handleHeleprLogOut}
            >
              Log out
            </button>
          </div>
        ) : null}
      </section>
    </>
  );
};
