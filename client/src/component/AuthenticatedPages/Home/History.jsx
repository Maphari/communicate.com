import React, { Component } from "react";
import { Nav } from "./Nav";

export class History extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {/* <Nav /> */}
        <main className="history-container">
          <h1 className="mt-2 text-lg ml-3">Account History</h1>
          <p className="opacity-30 text-sm mt-1 ml-3">All account history will be availabe here</p>
        </main>
      </>
    );
  }
}
