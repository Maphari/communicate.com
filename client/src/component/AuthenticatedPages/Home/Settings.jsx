import React, { useContext, useState } from "react";
import { DataToSendContext } from "../../context/DataTosendContext/DataToSendContext";
import { Nav } from "./Nav";
import { Link } from "react-router-dom";

export const Settings = () => {
  const { data, helperData } = useContext(DataToSendContext);
  const User = data?.user;
  const Helper = helperData?.helper;
  const userToken = localStorage.getItem("token");
  const helperToken = localStorage.getItem("token-helper");
  const [isProfileSelected, setIsProfileSelected] = useState(false);
  const [isHistorySelected, setIsHistorySelected] = useState(false);
  const [isEquipmentSelected, setIsEquipmentSelected] = useState(false);

  const concatString = (string) => {
    if (string.length > 25) return string.slice(0, 25) + "...";
    else return string;
  };

  return (
    <>
      <Nav />
      <main className="settings-container">
        <aside className="settings-container__aside mt-3">
          <h1 className="mt- text-2xl">Settings</h1>
          <p className="opacity-30 text-sm mt-1">
            All your settings will be visible here
          </p>
          <div className="flex items-center gap-3 bg-[#1f1f1f] pl-3 my-4 rounded-lg">
            <div className="settings-container__user-setting bg-yellow-600">
              <i className="fa-solid fa-user text-[#333]"></i>
            </div>
            <div>
              <p className="text-[1.1rem] mb-1 opacity-70 font-normal">
                {userToken
                  ? concatString(User?.username)
                  : helperToken
                  ? concatString(Helper?.username)
                  : null}
              </p>
              <p className="text-sm opacity-40 font-[300]">
                {userToken
                  ? concatString(User?.mobile)
                  : helperToken
                  ? concatString(Helper?.mobile)
                  : null}
              </p>
              <p className="text-sm opacity-40 font-[300]">
                {userToken
                  ? concatString(User?.email)
                  : helperToken
                  ? concatString(Helper?.email)
                  : null}
              </p>
            </div>
          </div>
          <div className="links-container mt-5 w-full">
            <h1 className="mb-4">Your settings</h1>
            <ul className="links-container__ul">
              <div>
                <Link
                  className={`hover:text-white hover:rounded-lg transition-all duration-700 ease-linear hover:bg-[#1f1f1f] hover:pl-[1rem] py-[.6rem] border-b-[0.1px] border-t-[0.1px] border-[#1f1f1f]  w-full mt-1 inline-block`}
                >
                  <span>Profile</span>
                  <i className={`fa-solid fa-user float-right mr-3`}></i>
                </Link>
                <Link
                  className={`hover:text-white hover:rounded-lg transition-all duration-700 ease-linear hover:bg-[#1f1f1f]  hover:pl-[1rem] py-[.7rem] border-b-[0.1px] border-[#1f1f1f]  w-full mt-1 inline-block`}
                >
                  <span>History</span>
                  <i className={`fa-solid fa-gears float-right mr-3`}></i>
                </Link>
                {helperToken && (
                  <Link
                    className={`hover:text-white hover:rounded-lg transition-all duration-700 ease-linear hover:bg-[#1f1f1f]  hover:pl-[1rem] py-[.7rem] border-b-[0.1px] border-[#1f1f1f]  w-full mt-1 inline-block`}
                  >
                    <span>Equipment</span>
                    <i className={`fa-solid fa-gears float-right mr-3`}></i>
                  </Link>
                )}
              </div>
              <div className="logout-div">
                <Link
                  className={`a hover:text-white hover:rounded-lg transition-all duration-700 ease-linear hover:bg-[#1f1f1f]  hover:pl-[1rem] py-[.7rem] border-b-[0.1px] border-[#1f1f1f] w-full mt-1 inline-block`}
                >
                  <span>Log out</span>
                  <i
                    className={`fa-solid fa-right-from-bracket float-right mr-3`}
                  ></i>
                </Link>
              </div>
              <p className="text-center mt-4 opacity-20 font-[400]">Communica<span className="text-yellow-600">tee.</span> version 0.0.1</p>
            </ul>
          </div>
        </aside>
        <section
          className={`${
            !isProfileSelected &&
            !isHistorySelected &&
            !isEquipmentSelected &&
            "flex justify-center items-center"
          } settings-container__main mt-2 pl-2`}
        >
          {!isProfileSelected && !isHistorySelected && !isEquipmentSelected && (
            <p className="opacity-30">No setting selected</p>
          )}
        </section>
      </main>
    </>
  );
};
