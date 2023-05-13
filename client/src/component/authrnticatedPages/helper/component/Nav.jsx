import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DataToSendContext } from "../../../context/DataToSendContext";

export const Nav = () => {
  const location = useLocation();
  const { helperData } = useContext(DataToSendContext);
  const [isHover, setIsHover] = useState(false);


  return (
    <>
      <section className="nav-container border-b bg-white relative z-[99999]">
        <header className="nav-container__header">
          <h1 className="font-[900] opacity-90 text-[24px]">
            Communica<span className="text-yellow-500">tee</span> helper
          </h1>
          <div className="flex items-center flex-wrap gap-1">
            <Link
              to="/acccount/helper"
              className={`px-2 py-1 rounded hover:text-yellow-600 transition-all duration-500 ease-linear relative text-md font-[500] opacity-90  ${
                location.pathname === "/account/helper" ? "nav-link-active" : ""
              }`}
            >
              Home
            </Link>
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
            <Link
              to="/profile"
              onMouseOver={() => setIsHover(true)}
              className="py-[5px] px-2 rounded-full transition-all duration-500 ease-linear border flex items-center justify-center hover:text-black hover:bg-yellow-400"
            >
              {helperData?.helper?.email}
            </Link>
          </div>
        </header>
        {isHover && (
          <div
            onMouseLeave={() => setIsHover(false)}
            className="absolute top-full right-8 bg-white w-[12rem]"
          >
            hello
          </div>
        )}
      </section>
    </>
  );
};
