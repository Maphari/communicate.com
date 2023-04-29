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
    const userSession = localStorage.getItem("session");
    const passportAuthenticationData = await axios.get(
      "/api/auth/passport_success"
    );
    const emailAndPassowrdAuthenticatedData = await axios.get(
      "/api/auth/account_success"
    );

    const isEmailAndPassowrdAuthenticated =
      userSession === emailAndPassowrdAuthenticatedData?.data?.user?.session;
    const isPassowrdAuthenticated =
      userSession === passportAuthenticationData?.data?.session;

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
