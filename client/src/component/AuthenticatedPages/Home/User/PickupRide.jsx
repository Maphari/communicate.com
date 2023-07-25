import React from "react";
import { Link } from "react-router-dom";

export const PickupRide = (props) => {
  const { onSelectRide, iconName, header, price, discription } = props;
  return (
    <Link
      onClick={onSelectRide}
      className="flex flex-wrap my-2 hover:text-white transition-all duration-700 ease-linear hover:bg-[#1f1f1f] bg-[#050505] py-[0.7rem] px-3 rounded-xl"
    >
      <div className="flex items-center justify-between mb-1  w-full">
        <header className="flex items-center justify-between text-white">
          <i
            className={`fa-solid fa-${iconName} text-2xl text-white bg-[#1f1f1f] p-2 rounded-xl mr-3`}
          ></i>
          <h1 className="mr-5 text-[1.1rem] font-bold ride_header">{header}</h1>
        </header>
        <p className="text-lg font-bold text-yellow-500 price_ride">{price}</p>
      </div>
      <div>
        <p className="text-white opacity-30 text-xs">{discription}</p>
      </div>
    </Link>
  );
};
