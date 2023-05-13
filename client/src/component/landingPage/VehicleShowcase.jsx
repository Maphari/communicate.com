import React from "react";
import carsImage from "../../assets/cars.png";

export const VehicleShowcase = () => {
  return (
    <>
      <section className="vehicleShowcase-container">
        <div className="vehicleShowcase-container__inner">
          <h1 className="text-5xl font-[900]">
            Vehicles in <span className="text-yellow-500">communicatee.</span>
          </h1>
          <p className="max-w-[30rem] my-3">
            Find more information about the vehicles that comunicatee offers and
            explore more ways you can get started with communicatee.
          </p>
          <button className="bg-yellow-500 p-[0.7rem] transition-all duration-700 ease-linear hover:bg-yellow-600 rounded font-bold text-white">
            Find out more
          </button>
        </div>

        <img src={carsImage} alt="cars that communicatee offers" />
      </section>
    </>
  );
};
