import React, { useContext, useState } from "react";
import { DataToSendContext } from "../../context/DataTosendContext/DataToSendContext";
import { Nav } from "./Nav";
import { Link, useNavigate } from "react-router-dom";
import packageJSON from "../../../../package.json";
import { Profile } from "./Profile";
import { Equipment } from "./helper/Equipment";
import { Feed } from "./Feed";

export const Settings = () => {
  const { data, helperData } = useContext(DataToSendContext);
  const User = data?.user;
  const Helper = helperData?.helper;
  const userToken = localStorage.getItem("token");
  const helperToken = localStorage.getItem("token-helper");
  const [isProfileSelected, setIsProfileSelected] = useState(false);
  const [isHistorySelected, setIsHistorySelected] = useState(false);
  const [isEquipmentSelected, setIsEquipmentSelected] = useState(false);
  const navigate = useNavigate();

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

  const handleProfilePage = () => {
    setIsProfileSelected(true);
    setIsHistorySelected(false);
    setIsEquipmentSelected(false);
  };

  const handleHistoryPage = () => {
    setIsHistorySelected(true);
    setIsProfileSelected(false);
    setIsEquipmentSelected(false);
  };

  const handleEquipmentPage = () => {
    setIsEquipmentSelected(true);
    setIsHistorySelected(false);
    setIsProfileSelected(false);
  };

  const RenderWhichSettings = () => {
    if (!isProfileSelected && !isHistorySelected && !isEquipmentSelected) {
      return <p className="opacity-30">No setting selected</p>;
    } else if (isProfileSelected) {
      return <Profile />;
    } else if (isHistorySelected) {
      return <Feed />;
    } else if (isEquipmentSelected) {
      return <Equipment />;
    }
    return null;
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
          <div className="links-container mt-5 w-full">
            <h1 className="mb-4">Your settings</h1>
            <ul className="links-container__ul">
              <div>
                <Link
                  onClick={handleProfilePage}
                  className={`hover:text-white hover:rounded-lg transition-all duration-700 ease-linear hover:bg-[#1f1f1f] hover:pl-[1rem] py-[.6rem] border-b-[0.1px] border-t-[0.1px] border-[#1f1f1f]  w-full mt-1 inline-block`}
                >
                  <span>Profile</span>
                  <i className={`fa-solid fa-user float-right mr-3`}></i>
                </Link>
                <Link
                  onClick={handleHistoryPage}
                  className={`hover:text-white hover:rounded-lg transition-all duration-700 ease-linear hover:bg-[#1f1f1f]  hover:pl-[1rem] py-[.7rem] border-b-[0.1px] border-[#1f1f1f]  w-full mt-1 inline-block`}
                >
                  <span>History</span>
                  <i className={`fa-solid fa-gears float-right mr-3`}></i>
                </Link>
                {helperToken && (
                  <Link
                    onClick={handleEquipmentPage}
                    className={`hover:text-white hover:rounded-lg transition-all duration-700 ease-linear hover:bg-[#1f1f1f]  hover:pl-[1rem] py-[.7rem] border-b-[0.1px] border-[#1f1f1f]  w-full mt-1 inline-block`}
                  >
                    <span>Equipment</span>
                    <i className={`fa-solid fa-gears float-right mr-3`}></i>
                  </Link>
                )}
              </div>
              <div className="logout-div">
                <Link
                  onClick={
                    (userToken && handleUserLogOut) ||
                    (helperToken && handleHeleprLogOut)
                  }
                  className={`a hover:text-white hover:rounded-lg transition-all duration-700 ease-linear hover:bg-[#1f1f1f]  hover:pl-[1rem] py-[.7rem] border-b-[0.1px] border-[#1f1f1f] w-full mt-1 inline-block`}
                >
                  <span>Log out</span>
                  <i
                    className={`fa-solid fa-right-from-bracket float-right mr-3`}
                  ></i>
                </Link>
              </div>
              <p className="text-center mt-4 opacity-20 font-[400]">
                Communica<span className="text-yellow-600">tee.</span> version{" "}
                {packageJSON.version}
              </p>
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
          <RenderWhichSettings />
        </section>
      </main>
      <main className="settings-small-screen">
        <header>
          <h1 className="mt- text-2xl">Settings</h1>
          <p className="opacity-30 text-sm mt-1">
            All your settings will be visible here
          </p>
        </header>
      </main>
    </>
  );
};
