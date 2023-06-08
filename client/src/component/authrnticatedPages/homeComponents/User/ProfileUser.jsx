import React, { useContext } from "react";
import { DataToSendContext } from "../../../context/DataTosendContext/DataToSendContext";
import { Nav } from "../Nav";

export const ProfileUser = () => {
  const { data } = useContext(DataToSendContext);
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
            <p className="opacity-90 mb-3">{data.user.username}</p>
            <hr className="w-[30rem]" />
          </div>
          <div>
            <p className="mb-1 mt-3 font-medium">Mobile number</p>
            <p className="opacity-90 mb-3">{data.user.mobile}</p>
            <hr className="w-[30rem]" />
          </div>
          <div>
            <p className="mb-1 mt-3 font-medium">Email</p>
            <p className="opacity-90 mb-3">{data.user.email}</p>
            <hr className="w-[30rem]" />
          </div>
          <button className="my-3 p-[0.45rem] w-full bg-yellow-600 font-[400] text-white transition-all duration-700 ease-linear hover:bg-yellow-700 rounded">
            Update information
          </button>
        </section>
      </section>
    </>
  );
};
