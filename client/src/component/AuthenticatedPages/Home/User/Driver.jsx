import React from "react";

export const Driver = (props) => {
  return (
    <>
      <main className="mt-3">
        <section className="flex items-center gap-3 py-2 px-2 hover:bg-[#1f1f1f] rounded-2xl transition-all duration-700 ease-linear">
          <div className="flex justify-center items-center h-16 w-[5rem] rounded-2xl bg-yellow-600">
            <i className="fa-solid fa-user text-3xl"></i>
          </div>
          <div className="flex justify-between w-full">
            <div className="">
              <h1 className="text-white opacity-70">namfffffffffffffe</h1>
              <p className="my-1 text-white opacity-40 text-sm">email@example.com</p>
              <p className=" text-white opacity-40 text-sm">232442424242</p>
            </div>
            <button className="rounded-2xl bg-violet-800 px-3 text-white opacity-80">Request</button>
          </div>
        </section>
      </main>
    </>
  );
};
