import React, { Component } from "react";

export class UserPosts extends Component {
  constructor(props) {
    super(props);

    this.state = { post: "" };
  }

  slicePost = function (message) {
    if (message.length > 25) return message.slice(0, 23);
    else return message;
  };

  sliceUsername = function (username) {
    if (username.length > 18) return username.slice(0, 18);
    else return username;
  };

  handlePost = function (e) {
    e.preventDefault();
  };

  render() {
    return (
      <>
        <main className="posts-container">
          <section className="posts-container__inner-poster">
            <header className="posts-container__header">
              <h1 className="posts-container__header-head">News feed</h1>
              <p>All your feed will be available here</p>
            </header>
            <aside>
              <div className="posts-container__inner-poster__inner">
                <div className="bg-yellow-700 h-14 max-w-[4.3rem] w-[4.3rem] rounded-full flex justify-center items-center transition-all duration-700 ease-linear hover:ml-3">
                  <i className="fa-solid fa-user text-2xl"></i>
                </div>
                <div className="w-full hover:border-[#161616] border-t-[0.1px] border-b-[0.1px] border-[#1f1f1f]">
                  <div className="flex items-center justify-between pt-2">
                    <h1>{this.sliceUsername("Phumudzo_Maphari")}</h1>
                    <span className="opacity-60 mr-1">16:00</span>
                  </div>
                  <div className="flex items-center justify-between pb-2">
                    <p className="opacity-60 text-sm">
                      Post: {this.slicePost("Hello how are you??")}
                    </p>
                    <i className="fa-solid fa-signs-post opacity-60 text-sm mr-1"></i>
                  </div>
                </div>
              </div>
            </aside>
          </section>
          <section className="posts-container__inner-posts">
            <div className="posts-container__inner-posts-m">
              <header>
                <div className="flex gap-2 items-center w-full">
                  <div className="h-[3rem] w-[3rem] bg-yellow-600 rounded-full flex justify-center items-center">
                    <i className="fa-solid fa-user"></i>
                  </div>
                  <form
                    className="w-full flex flex-1"
                    onSubmit={this.handlePost}
                  >
                    <input
                      type="text"
                      placeholder="what's popping?"
                      className="bg-[#1f1f1f] p-2 flex-1"
                      onChange={(e) => this.setState({ post: e.target.value })}
                      value={this.state.post}
                    />
                    <button className="flex justify-center items-center bg-yellow-600 p-2 w-14 transition-all duration-700 ease-linear hover:bg-yellow-700">
                      <i className="fa-solid fa-paper-plane"></i>
                    </button>
                  </form>
                </div>
              </header>
            </div>
            <section className="mx-[1.5rem] mt-[1.5rem] bg-[#2a2a2a] p-3 flex gap-2 rounded-xl">
              <section className="w-[60%] border-r-[0.1px]">
                <div className="flex items-center justify-between mr-5 bg-[#161616] p-3 rounded-xl">
                  <div>
                    <h1>Maphari_Phumudzo001</h1>
                    <p className="opacity-40 text-sm mt-1 flex items-center">
                      <i className="fa-solid fa-car text-xs mr-1"></i>
                      <span>Driver</span>
                    </p>
                  </div>
                  <p className="opacity-40">16:00</p>
                </div>
                <div className="mt-3 mx-3">
                  <p className="opacity-60 text-[15px]">How are you??</p>
                </div>
              </section>
              <section className="w-[40%] text-center flex flex-col items-center">
                <div className="bg-yellow-600 w-[3.5rem] h-[3.5rem] rounded-full flex justify-center items-center">
                  <i className="fa-solid fa-user"></i>
                </div>
                <div className="mt-2">
                  <h1>Maphari_Phumudzo</h1>
                  <p className="mt-1 opacity-40 text-sm">+27797881660</p>
                  <p className="mt-0 opacity-40 text-sm">maphariphumudzo57@gmail.com</p>
                </div>
                <div className="flex gap-2 items-center mt-2">
                  <button className="px-2 py-1 bg-yellow-600 rounded transition-all duration-700 ease-linear hover:bg-yellow-700"><i className="fa-solid fa-envelope mr-1"></i><span>Message</span></button>
                  <button className="px-2 py-1 bg-cyan-600 rounded transition-all duration-700 ease-linear hover:bg-cyan-700"><i className="fa-solid fa-car mr-1"></i><span>Request</span></button>
                </div>
              </section>
            </section>
          </section>
        </main>
      </>
    );
  }
}
