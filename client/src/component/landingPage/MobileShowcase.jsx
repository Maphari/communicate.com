import React from "react";

export const MobileShowcase = () => {
  return (
    <>
      <section className="vehicleShowcase-container">
        <div className="vehicleShowcase-container__inner">
          <h1 className="mobile:text-3xl tablet:text-5xl font-[900] text-white">
            Mobile application coming <br />
            <span className="text-yellow-500">SOON</span>
          </h1>
          <p className="max-w-[40rem] my-3 text-white">
            We are proud to give you communicatee in mobile application so that
            everywhere you are with your mobile phone you can access
            communicatee features that we offer. and we are proud to add more
            features on the mobile application.
          </p>
          <button className="bg-yellow-500 p-[0.5rem] transition-all duration-700 ease-linear hover:bg-yellow-600 rounded font-normal text-white">
            Learn More
          </button>
        </div>

        {/* <img src={carsImage} alt="cars that communicatee offers" /> */}
      </section>
    </>
  );
};
