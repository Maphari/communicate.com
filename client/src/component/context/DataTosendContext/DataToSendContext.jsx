import React, { Component, createContext } from "react";
import axios from "axios";

export const DataToSendContext = createContext({});
export default class DataToSendProvider extends Component {
  constructor(props) {
    super(props);

    this.state = { data: [], helperData: [], error: [] };
  }

  async componentDidMount() {
    try {
      // GETTING STORED TOKENS ON LOCAL STORAGE
      const userSession = localStorage.getItem("token");
      const helpersession = localStorage.getItem("token-helper");
      const passportAuthenticationData = await axios.get(
        "/api/auth/passport_success"
      );
      const emailAndPassowrdAuthenticatedData = await axios.get(
        "/api/auth/account_success"
      );
      const helperData = await axios.get("/api/auth/helper_success");

      const isEmailAndPassowrdAuthenticated =
        userSession === emailAndPassowrdAuthenticatedData?.data?.user?.session;
      const isPassportAuthenticated =
        userSession === passportAuthenticationData?.data?.session;
      const isHelperAunthenticated =
        helperData?.data?.helper?.session === helpersession;

      if (isEmailAndPassowrdAuthenticated) {
        this.setState({ data: emailAndPassowrdAuthenticatedData?.data?.user });
      } else if (isPassportAuthenticated) {
        this.setState({ data: passportAuthenticationData.data });
      }

      if (isHelperAunthenticated) {
        this.setState({ helperData: helperData?.data?.helper });
      }
    } catch (error) {
      this.setState({ error: error });
    }
  }

  render() {
    return (
      <DataToSendContext.Provider
        value={{ data: this.state.data, helperData: this.state.helperData, error: this.state.error}}
      >
        {this.props.children}
      </DataToSendContext.Provider>
    );
  }
}
