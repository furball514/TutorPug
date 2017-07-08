import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Sentry from "sentry-expo";
Sentry.config(
  "https://a91c8897643140638ddfd686dbf42476@sentry.io/189285"
).install();

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
