import React, { useContext } from "react";
import { Nav } from "../Nav";
import { DataToSendContext } from "../../../context/DataTosendContext/DataToSendContext";

export const ProfileHelper = () => {
  const { helperData } = useContext(DataToSendContext);

  return (
    <>
      <Nav />
      <section className="profile-container">
        <header className="profile-container__header">
          <h1 className="profile-container__header-main">
            Account information
          </h1>
        </header>

        <div className="profile-container__user">
          <i className="fa-solid fa-user"></i>
        </div>
        <section className="profile-container__basic">
          <h2 className="profile-container__basic-header">Basic information</h2>
          <div>
            <p className="mb-1 mt-3 font-medium">Name</p>
            <p className="opacity-90 mb-3">{helperData.helper.username}</p>
            <hr className="w-[30rem]" />
          </div>
          <div>
            <p className="mb-1 mt-3 font-medium">Mobile number</p>
            <p className="opacity-90 mb-3">{helperData.helper.mobile}</p>
            <hr className="w-[30rem]" />
          </div>
          <div>
            <p className="mb-1 mt-3 font-medium">Email</p>
            <p className="opacity-90 mb-3">{helperData.helper.email}</p>
            <hr className="w-[30rem]" />
          </div>
          <button className="my-3 w-full p-[0.45rem] bg-yellow-600 font-[400] text-white transition-all duration-700 ease-linear hover:bg-yellow-700 rounded">
            Update information
          </button>
        </section>
      </section>
    </>
  );
};
