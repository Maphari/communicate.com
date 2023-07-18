import React, { Component } from "react";
import { Nav } from "./Nav";

export class BankAccountHelper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Nav />
        <main>
          <section className="bankaccount-container">
            <header className="bankaccount-container__header">
              <h1 className="bankaccount-container__header-head text-[1.5rem] font-[600]">
                Bank account
              </h1>
              <p className="bankaccount-container__header__para">R 0.00</p>
            </header>

            <section className="bankaccount-container__main">
              <button className="transition-all duration-700 ease-linear bg-cyan-700 hover:bg-cyan-900 p-2 rounded">
                <i className="fa-solid fa-add mr-2"></i>
                <span>Add funds</span>
              </button>
              <button className="transition-all duration-700 ease-linear bg-violet-700 hover:bg-violet-900 p-2 rounded">
                <i className="fa-solid fa-money-bill-transfer mr-2"></i>
                <span>withdraw funds</span>
              </button>
              <button className="transition-all duration-700 ease-linear bg-purple-700 hover:bg-purple-900 p-2 rounded">
                <i className="fa-solid fa-credit-card mr-2"></i>
                <span>Add banking card</span>
              </button>
            </section>
          </section>
          <hr  className="text-white mt-5 ml-[2rem] mr-[2rem]"/>
          <section className="bankaccount-container__history my-4">
            <h1 className="text-xl">Transaction history</h1>
            <p className="opacity-40 my-2">No transaction at the moment</p>
          </section>
        </main>
      </>
    );
  }
}
