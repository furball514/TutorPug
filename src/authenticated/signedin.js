import React from "react";
import { Text } from "react-native";
import jwtDecoder from "jwt-decode";
import { SecureStore } from "expo";

export class SignedIn extends React.Component {
  state = {
    uniqueID: "",
    provider: "",
    exp: "",
    iat: ""
  };

  async componentDidMount() {
    try {
      const token = await SecureStore.getValueWithKeyAsync("TOKEN");
      if (token !== null) {
        let decoded = jwtDecoder(token);
        this.setState({
          uniqueID: decoded.uniqueID,
          provider: decoded.provider,
          exp: decoded.exp,
          iat: decoded.iat
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <Text>
        <Text>
          {this.state.uniqueID}
        </Text>
        <Text> signedin </Text>
        <Text>
          {this.state.provider}
        </Text>
      </Text>
    );
  }
}
