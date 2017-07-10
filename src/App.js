import React from "react";
import Sentry from "sentry-expo";
import HomeScreen from "./home/homescreen";

Sentry.config(
  "https://a91c8897643140638ddfd686dbf42476@sentry.io/189285"
).install();

export default class App extends React.Component {
  render() {
    return <HomeScreen />;
  }
}
