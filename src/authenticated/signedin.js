import React from "react";
import { Text } from "react-native";

export class SignedIn extends React.Component {
  render() {
    const { params } = this.props.navigation.state;
    return (
      <Text>
        <Text>
          {params.uniqueID}
        </Text>
        <Text> signedin </Text>
        <Text>
          {params.provider}
        </Text>
      </Text>
    );
  }
}
