import React from "react";

export const Goals = () => {
  return (
    <>
      <section className="goals-container">
        <header className="text-center mb-7">
          <h1 className="font-[900] text-4xl">Our Impact Goals</h1>
        </header>

        <section className="goals-container__inner flex items-center justify-center flex-wrap gap-10">
          <div className="text-center">
            <i className="fa-solid fa-venus-mars text-3xl mb-2"></i>
            <h1 className="text-4xl mb-2 font-black">50%</h1>
            <h1 className="text-3xl font-extrabold mb-2">Gender Equality</h1>
            <p className="max-w-[27rem]">
              Communicatee is commited to a 50% female customer base globally
              and supporting women in becoming successful business owners and
              owing their own vehicles.
            </p>
          </div>
          <div className="text-center">
            <i className="fa-solid fa-wallet text-3xl mb-2"></i>
            <h1 className="text-4xl mb-2 font-black">100%</h1>
            <h1 className="text-3xl font-extrabold mb-2">Finance inclusion</h1>
            <p className="max-w-[27rem]">
              Communicatee provides customers with access to vehicle financing.
              as well as a range of finacial services that we previously
              inaccessible to them and their families.
            </p>
          </div>
          <div className="text-center">
            <i className="fa-solid fa-credit-card text-3xl mb-2"></i>
            <h1 className="text-4xl mb-2 font-black">100%</h1>
            <h1 className="text-3xl font-extrabold mb-2">Anytime withdrawal</h1>
            <p className="max-w-[27rem]">
              Communicatee provides drivers anytime money withdrawal with any
              bank you we make it easy for you to focus on making money and not
              stress about withdrawal time.
            </p>
          </div>
        </section>
      </section>
    </>
  );
};
