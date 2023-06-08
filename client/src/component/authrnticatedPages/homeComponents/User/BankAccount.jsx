import React from "react";
import { Nav } from "../Nav";

export const BankAccount = () => {
  return (
    <>
      <Nav />
      <section className="bankaccount-container">
        <header className="bankaccount-container__header">
          <h1 className="bankaccount-container-main text-[1.5rem] font-[600]">
            Bank account
          </h1>
        </header>
      </section>
    </>
  );
};
