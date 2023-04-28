import React, { Component, createContext } from "react";
import axios from "axios";

export const DataToSendContext = createContext({});
export default class DataToSendProvider extends Component {
  constructor(props) {
    super(props);

    this.state = { data: [] };
  }

  async componentDidMount() {
    // GETTING STORED TOKENS ON LOCAL STORAGE
    const googleToken = localStorage.getItem("google-token");
    const spotifyToken = localStorage.getItem("spotify-token");
    const userToken = localStorage.getItem("sessionID");
    const passportAuthenticationData = await axios.get(
      "/api/auth/passport_success"
    );
    const emailAndPassowrdAuthenticatedData = await axios.get(
      "/api/auth/account_success"
    );

    const isEmailAndPassowrdAuthenticated =
      userToken === emailAndPassowrdAuthenticatedData?.data?.user?.session;
    const isPassowrdAuthenticated =
      googleToken === passportAuthenticationData?.data?.session ||
      spotifyToken === passportAuthenticationData?.data?.session;

    if (isEmailAndPassowrdAuthenticated) {
      this.setState({ data: emailAndPassowrdAuthenticatedData?.data?.user });
    } else if (isPassowrdAuthenticated) {
      this.setState({ data: passportAuthenticationData.data });
    }
  }

  render() {
    return (
      <DataToSendContext.Provider value={{ data: this.state.data }}>
        {this.props.children}
      </DataToSendContext.Provider>
    );
  }
}
