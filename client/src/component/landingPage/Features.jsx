import React from "react";
import { motion } from "framer-motion";

export function Features() {
  return (
    <>
      <motion.section className="features-container">
        <motion.header className="features-container__header mb-4">
          <motion.h1 className="features-container__header__h1">
            We guarantee <span className="text-yellow-500">fast</span> and
            <span className="text-yellow-500"> safe</span> transport
            <br /> for your package
          </motion.h1>
          <p className="opacity-90 mt-2 pb-1">
            It's more than just a guarantee because the proprity is to make
            customer rely on us
          </p>
        </motion.header>

        <section className="flex items-center gap-2 flex-wrap mt-5 mb-10">
          <div className="bg-slate-100 py-3 px-4 max-w-[20rem] transition-all duration-700 ease-linear hover:drop-shadow-2xl hover:bg-white hover:cursor-pointer hover:scale-110 hover:z-[100]">
            <i className="fa-solid fa-credit-card text-yellow-500 text-2xl mb-2"></i>
            <h1 className="font-bold text-xl mb-1">Easy payments</h1>
            <p className="opacity-80 mb-2">
              With communicatee our system supports all the cards we make a
              better place for you to deliver things.
            </p>
          </div>
          <div className="bg-slate-100 py-3 px-4 max-w-[20rem] transition-all duration-700 ease-linear hover:drop-shadow-2xl hover:bg-white hover:cursor-pointer hover:scale-110 hover:z-[100]">
            <i className="fa-solid fa-map text-yellow-500 text-2xl mb-2"></i>
            <h1 className="font-bold text-xl mb-1">Interactive map</h1>
            <p className="opacity-80 mb-2">
              With communicatee our system allows you to search using the map to
              tell us where to pick up your item and deliver.
            </p>
          </div>
          <div className="bg-slate-100 py-3 px-4 max-w-[20rem] transition-all duration-700 ease-linear hover:drop-shadow-2xl hover:bg-white hover:cursor-pointer hover:scale-110 hover:z-[100]">
            <i className="fa-solid fa-user text-yellow-500 text-2xl mb-2"></i>
            <h1 className="font-bold text-xl mb-1">Choose the deliver</h1>
            <p className="opacity-80 mb-2">
              With communicatee our system allows you to choose a person to
              deliver we dont choose for you.
            </p>
          </div>
          <div className="bg-slate-100 py-3 px-4 max-w-[20rem] transition-all duration-700 ease-linear hover:drop-shadow-2xl hover:bg-white hover:cursor-pointer hover:scale-110 hover:z-[100]">
            <i className="fa-solid fa-car text-yellow-500 text-2xl mb-2"></i>
            <h1 className="font-bold text-xl mb-1">Choose the vehicle</h1>
            <p className="opacity-80 mb-2">
              With communicatee our system allows you to choose a vehicle to
              deliver we dont choose for you.
            </p>
          </div>
        </section>

        <section className="features-container__info mt-20 flex items-center flex-wrap gap-[7rem]">
          <img
            src="https://images.pexels.com/photos/7706447/pexels-photo-7706447.jpeg?auto=compress&cs=tinysrgb&dpr=1"
            alt="person taking parcel"
            className="w-[20rem] h-[27rem] object-cover"
          />
          <div className="features-container__info-more">
            <header className="features-container__info-more__head">
              <h1 className="font-[900] text-4xl mb-2">
                Reliable <span className="text-yellow-500">logistics</span> &{" "}
                <span className="text-yellow-500">transport </span>
                solution
              </h1>
              <p className="opacity-90 pb-2">
                Communicatee is the future of transportation all the benefits
                are for you. we want you to rember <br />
                communicatee whenever theres a package to deliver
              </p>
            </header>

            <section className="mt-10 max-w-[36rem]">
              <p className="mb-3">
                We pride our self on bringing best transportation and shipping
                available all over the world. Our personell, utilising the
                latest communication
              </p>
              <p className="mb-3">
                Communicatee brings the best solution to you in just a single
                click of a button the your package is taken care of by out hard
                working professionals.
              </p>
              <button className="mb-4 text-white font-[600] p-2 bg-yellow-500 transition-all duration-700 ease-linear hover:bg-yellow-600">Learn more</button>
              <div>
                <h1 className="font-[800] mb-3 text-2xl">
                  Meet our{" "}
                  <span className="text-yellow-500">trusted brand</span> since
                  day one{" "}
                </h1>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="w-10 h-10 bg-yellow-500"></div>
                  <div className="w-10 h-10 bg-yellow-500"></div>
                  <div className="w-10 h-10 bg-yellow-500"></div>
                  <div className="w-10 h-10 bg-yellow-500"></div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </motion.section>
    </>
  );
}
