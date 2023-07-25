import React, { Component } from "react";
import { Driver } from "./Driver";

export class WhichVihicle extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { distance, duration, isBackClicked } = this.props;

    return (
      <>
        <section className="dashboard-container__content_ride drop-shadow-2xl rounded-xl">
          <header className="w-full flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1 mt-4 mb-2">
                <i
                  onClick={isBackClicked}
                  className="fa-solid fa-arrow-left text-lg px-2 text-white rounded-lg transition-all duration-700 ease-linear hover:bg-[#1f1f1f]"
                ></i>
                <h1 className="mb-[0.2rem] mt-1 text-white opacity-70 font-bold text-lg">
                  Choose a driver
                </h1>
              </div>
              <p className="text-white font-normal opacity-50 text-sm">
                we give you the priveledge to choose your package handler
              </p>
            </div>
          </header>
          <section className="bg-[#1f1f1f] mt-3 text-white py-2 px-3 rounded-xl flex flex-wrap items-center justify-between">
            <p className="opacity-80 text-sm">Distance: {distance}</p>
            <p className="opacity-80 text-sm">Estimated time: {duration}</p>
          </section>
          <Driver />
        </section>
      </>
    );
  }
}
