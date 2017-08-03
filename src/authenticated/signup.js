import React from "react";
import { Text } from "react-native";

export class SignupView extends React.Component {
  render() {
    const { params } = this.props.navigation.state;
    return (
      <Text>
        <Text>
          {params.uniqueID}
        </Text>
        <Text> signup </Text>
        <Text>
          {params.provider}
        </Text>
      </Text>
    );
  }
}
