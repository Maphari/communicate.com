import React, { Component, createContext } from "react";
import axios from "axios";

export const DataToSendContext = createContext({});
export default class DataToSendProvider extends Component {
  constructor(props) {
    super(props);

    this.state = { data: [], helperData: [] };
  }

  async componentDidMount() {
    // GETTING STORED TOKENS ON LOCAL STORAGE
    const userSession = localStorage.getItem("session");
    const helpersession = localStorage.getItem("helper-session");
    const passportAuthenticationData = await axios.get(
      "/api/auth/passport_success"
    );
    const emailAndPassowrdAuthenticatedData = await axios.get(
      "/api/auth/account_success"
    );
    const helperData = await axios.get("/api/auth/helper_success");

    const isEmailAndPassowrdAuthenticated =
      userSession === emailAndPassowrdAuthenticatedData?.data?.user?.session;
    const isPassowrdAuthenticated =
      userSession === passportAuthenticationData?.data?.session;
    const isHelperAunthenticated =
      helperData?.data?.helper?.session === helpersession;

    if (isEmailAndPassowrdAuthenticated) {
      this.setState({ data: emailAndPassowrdAuthenticatedData?.data?.user });
    } else if (isPassowrdAuthenticated) {
      this.setState({ data: passportAuthenticationData.data });
    }

    if (isHelperAunthenticated) {
      this.setState({helperData: helperData?.data?.helper});
    }
  }

  render() {
    return (
      <DataToSendContext.Provider
        value={{ data: this.state.data, helperData: this.state.helperData }}
      >
        {this.props.children}
      </DataToSendContext.Provider>
    );
  }
}
