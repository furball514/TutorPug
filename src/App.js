import React from "react";
import Sentry from "sentry-expo";
import { StackNavigator } from "react-navigation";
import HomeScreen from "./home/homescreen";
import LicenseView from "./home/license";

Sentry.config(
  "https://a91c8897643140638ddfd686dbf42476@sentry.io/189285"
).install();

const App = StackNavigator({
  Home: {
    screen: HomeScreen,
    header: null,
    navigationOptions: {
      header: null
    }
  },
  License: {
    screen: LicenseView,
    header: null,
    navigationOptions: {
      header: null
    }
  }
});

export default App;
