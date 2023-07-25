import React, { Component } from "react";

export class HelperMessage extends Component {
  constructor(props) {
    super(props);
    this.state = { isMessageClicked: false };
  }
  sliceMessage = function (message) {
    if (message.length > 25) return message.slice(0, 23);
    else return message;
  };

  sliceUsername = function (username) {
    if (username.length > 18) return username.slice(0, 18);
    else return username;
  };
  render() {
    return (
      <>
        <main className="message-container">
          <aside className="message-container__aside pt-10">
            <h1 className="message-container__message mt-2 text-2xl">
              Messages
            </h1>
            <p className="opacity-30 text-sm mt-1">
              All your messages will be availabe here
            </p>

            <section className=" mt-4 flex items-center gap-2 transition-all duration-700 ease-linear hover:cursor-pointer hover:bg-[#1f1f1f] rounded-xl">
              <div className="bg-yellow-700 h-14 max-w-[4.3rem] w-[4.3rem] rounded-full flex justify-center items-center">
                <i className="fa-solid fa-user text-2xl"></i>
              </div>
              <div className="w-full hover:border-[#161616] border-t-[0.1px] border-b-[0.1px] border-[#1f1f1f]">
                <div className="flex items-center justify-between pt-2">
                  <h1>{this.sliceUsername("Phumudzo_Maphari")}</h1>
                  <span className="opacity-60 mr-1">16:00</span>
                </div>
                <div className="flex items-center justify-between pb-2">
                  <p className="opacity-60 text-sm">
                    {this.sliceMessage("Hello how are you??")}
                  </p>
                  <i className="fa-solid fa-paper-plane opacity-60 text-sm mr-1"></i>
                </div>
              </div>
            </section>
          </aside>
          {!this.state.isMessageClicked ? (
            <section className="message-container__main flex justify-center items-center flex-col">
              <i className="fa-solid fa-envelope opacity-30 text-5xl"></i>
              <p className="message-container__para pt-2 opacity-30">
                No Message selected
              </p>
            </section>
          ) : (
            <section className="message-container__main pt-10">
              <header className="bg-slate-800 p-2">header information</header>
            </section>
          )}
        </main>
        <main className="message-small-screen  text-white">
          <section>
            <h1 className="message-container__message mt-2 text-2xl">
              Messages
            </h1>
            <p className="opacity-30 text-sm mt-1">
              All your messages will be availabe here
            </p>
          </section>
        </main>
      </>
    );
  }
}
