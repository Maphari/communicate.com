import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export function Navigation() {
  const location = useLocation();

  return (
    <>
      <motion.nav className="navigation-container">
        <header className="navigation-container__header">
          <div className="head">
            <a
              href="/"
              className="navigation-container__header-main hover:text-white"
            >
              Communica<span className="text-yellow-500">tee.</span>
            </a>
          </div>

          <div className="navigation-container__header-mobile">
            <div className="h-2 w-10 staborn"></div>
          </div>

          <div className="flex items-center flex-wrap gap-2 navigation-container__header-buttons">
            <Link
              to=""
              className="p-2 font-medium hover:text-yellow-500 rounded link"
            >
              Login
            </Link>
            <Link
              to=""
              className="p-2 font-medium hover:bg-yellow-600 bg-yellow-500 text-white transition-all duration-700 ease-out"
            >
              Create accout
            </Link>
          </div>
        </header>

        <motion.section className=" relative z-[100] showcase-container">
          <div>
            <h1 className="showcase-container__header">
              Quickest <span className="rot">&</span> safest
              <span className="text-yellow-500"> delivery</span>
              <br /> services.
            </h1>
            <p>
              Looking for a delivery service that is both fast and secure? Our
              company offers the quickest and safest
              <br /> delivery services available.
            </p>
          </div>
          <div className="showcase-container__socials flex items-center flex-col gap-1">
            <i className="fa-brands fa-facebook p-1 text-xl hover:cursor-pointer transition-all duration-700 ease-linear hover:text-yellow-500"></i>
            <i className="fa-brands fa-instagram p-1 text-xl hover:cursor-pointer transition-all duration-700 ease-linear hover:text-yellow-500"></i>
            <i className="fa-brands fa-twitter p-1 text-xl hover:cursor-pointer transition-all duration-700 ease-linear hover:text-yellow-500"></i>
            <i className="fa-brands fa-youtube p-1 text-xl hover:cursor-pointer transition-all duration-700 ease-linear hover:text-yellow-500"></i>
          </div>
        </motion.section>

        <motion.section className="navigation-container__bottom relative z-[100] text-white my-5 ">
          <div className="glassy-background">
            <header>
              <h1 className="text-2xl font-bold mb-2">
                Subscribe to our{" "}
                <span className="text-yellow-500">news letter</span>
              </h1>
              <form className="flex items-center flex-1 flex-wrap w-full form">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="p-2 outline-none text-gray-500 flex items-center flex-1"
                />
                <button className="p-2 bg-yellow-500 font-medium hover:bg-yellow-600 transition-all duration-700 ease-linear">
                  Subscribe
                </button>
              </form>
            </header>
          </div>
        </motion.section>
        <motion.section className="stat relative z-[100] text-white flex items-center gap-4 flex-wrap">
          <div className="flex items-baseline flex-wrap gap-1">
            <h1 className="text-5xl font-bold">200+</h1>
            <p className="font-bold text-yellow-500 text-lg">Subscribers</p>
          </div>
          <div className="flex items-baseline flex-wrap gap-1">
            <h1 className="text-5xl font-bold">100+</h1>
            <p className="font-bold text-yellow-500 text-lg">Helper</p>
          </div>
          <div className="flex items-baseline flex-wrap gap-1">
            <h1 className="text-5xl font-bold">50+</h1>
            <p className="font-bold text-yellow-500 text-lg">Warehouse</p>
          </div>
        </motion.section>
      </motion.nav>
    </>
  );
}
