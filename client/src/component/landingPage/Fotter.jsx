import React from "react";

export const Fotter = () => {
  const currentYear = new Date().getFullYear();
  const userLanguage = navigator.language;

  return (
    <section className="footer-container flex flex-wrap items-center justify-between bg-[#333] text-white px-[4.5rem] py-[1rem]">
      <h1 className="font-[600] text-md opacity-70">
        Comminica<span className="text-yellow-500">tee.</span> copyright &copy;
        <span> {currentYear}</span>
      </h1>
      <p className="font-bold opacity-70">{userLanguage}</p>
    </section>
  );
};
