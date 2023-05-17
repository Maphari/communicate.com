import React from "react";
import { Link } from "react-router-dom";

export const Process = () => {
  return (
    <>
      <section className="process-container">
        <div className="process-container__inner">
          <h1 className="text-4xl font-bold">
            Three ways to become
            <br /> a <span className="text-yellow-500">driver</span>
          </h1>
          <p className="my-3">
            Find out how you can start driving to add
            <br /> a smile to people who need it.
          </p>
          <Link
            to="/account/helper_register"
            className="p-[0.6rem] font-bold rounded bg-yellow-500 inline-block hover:bg-yellow-600 hover:text-white transition-all duration-700 ease-linear text-white"
          >
            Register to drive
          </Link>
        </div>
        <div className="process-container__bottom flex items-center flex-wrap gap-2">
          <div className="bg-slate-100 rounded py-3 px-4 max-w-[19rem] transition-all duration-700 ease-linear hover:drop-shadow-2xl hover:bg-white hover:cursor-pointer hover:scale-110 hover:z-[100]">
            <i className="fa-solid fa-mobile-button text-yellow-500 text-2xl mb-2"></i>
            <h1 className="font-bold text-xl mb-1">Apply</h1>
            <p className="opacity-80 mb-2">
              You can start by applying so that we verify your identity.
              Customes has to feel safe and trust you as a driver
            </p>
          </div>
          <div className="bg-slate-100 rounded py-3 px-4 max-w-[19rem] transition-all duration-700 ease-linear hover:drop-shadow-2xl hover:bg-white hover:cursor-pointer hover:scale-110 hover:z-[100]">
            <i className="fa-solid fa-certificate text-yellow-500 text-2xl mb-2"></i>
            <h1 className="font-bold text-xl mb-1">Get verified</h1>
            <p className="opacity-80 mb-2">
              then we can verify your information so that we know that you are
              the person who you say you are
            </p>
          </div>
          <div className="bg-slate-100 rounded py-3 px-4 max-w-[19rem] transition-all duration-700 ease-linear hover:drop-shadow-2xl hover:bg-white hover:cursor-pointer hover:scale-110 hover:z-[100]">
            <i className="fa-solid fa-car text-yellow-500 text-2xl mb-2"></i>
            <h1 className="font-bold text-xl mb-1">Start driving</h1>
            <p className="opacity-80 mb-2">
              then now you can start driving and add a smile to the to the
              people who really needs the smile.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
