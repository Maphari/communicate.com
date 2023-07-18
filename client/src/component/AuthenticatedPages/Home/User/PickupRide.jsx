import React from "react";
import { Link } from "react-router-dom";

export const PickupRide = (props) => {
  const { onSelectRide, iconName, header, price, discription } = props;
  return (
    <Link
      onClick={onSelectRide}
      className="flex my-2 hover:text-white hover:bg-[#1b1b1b] p-[0.6rem] rounded-xl"
    >
      <div className="flex items-center justify-center bg-[#050505] p-2 rounded-xl w-[65px] mr-3">
        <i className={`fa-solid fa-${iconName} text-3xl text-white`}></i>
      </div>
      <div>
        <header className="flex items-center justify-between text-white">
          <h1 className="mr-5 text-[1.1rem] font-bold">
            Communica<span className="text-yellow-600">tee.</span> {header}
          </h1>
          <p className="text-lg font-bold text-yellow-500">{price}</p>
        </header>
        <p className="text-white opacity-30 text-xs">{discription}</p>
      </div>
    </Link>
  );
};
