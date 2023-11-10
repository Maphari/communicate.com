import React, { Component } from "react";
import { Nav } from "./Nav";

export class Feed extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {/* <Nav /> */}
        <main className="history-container">
          <h1>News Feed</h1>
          <p>
            Upcoming News Feed feature: Post for help and negotiate prices with
            drivers on Communicatee, ensuring your safety and convenience. Stay
            tuned for the launch!
          </p>
          <button>Be the first to know!!</button>
        </main>
      </>
    );
  }
}
