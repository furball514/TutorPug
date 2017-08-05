import React from "react";
import Sentry from "sentry-expo";
import { Text, TouchableOpacity, Platform, AsyncStorage } from "react-native";
import { AppLoading } from "expo";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigator } from "react-navigation";
import HomeScreen from "./home/homescreen";
import LicenseView from "./home/license";
import { SignedIn } from "./authenticated/signedin";
import { SignupView } from "./authenticated/signup";
import { apiURL } from "./util/links";
import cacheAssetsAsync from "./util/cacheAssets";

Sentry.config(
  "https://a91c8897643140638ddfd686dbf42476@sentry.io/189285"
).install();

class App extends React.Component {
  componentWillMount() {
    if (!this.props.signedin)
      try {
        AsyncStorage.removeItem("TOKEN", () => console.log("deleted"));
      } catch (error) {
        console.error(error);
      }
  }

  render() {
    const Root = StackNavigator(
      {
        Home: {
          screen: HomeScreen,
          header: null,
          navigationOptions: {
            header: null
          }
        },
        License: {
          screen: LicenseView,
          navigationOptions: ({ navigation }) => ({
            headerLeft:
              Platform.OS === "ios"
                ? <TouchableOpacity
                    accessible={true}
                    accessibilityLabel={"dismiss"}
                    onPress={() => navigation.goBack()}
                  >
                    <Ionicons
                      name="ios-close"
                      color="blue"
                      size={40}
                      style={{ marginLeft: 16, marginTop: 5 }}
                    />
                  </TouchableOpacity>
                : <TouchableOpacity
                    accessible={true}
                    accessibilityLabel={"dismiss"}
                    onPress={() => navigation.goBack()}
                  >
                    <Ionicons
                      name="md-close"
                      size={40}
                      style={{ marginLeft: 16, marginTop: 5 }}
                    />
                  </TouchableOpacity>,
            headerTitle: <Text allowFontScaling={false}> LICENSE </Text>
          })
        },
        Signedin: {
          screen: SignedIn,
          header: null,
          navigationOptions: {
            gesturesEnabled: false,
            header: null
          }
        },
        Signup: {
          screen: SignupView,
          header: null,
          navigationOptions: {
            gesturesEnabled: false,
            header: null
          }
        }
      },
      {
        initialRouteName: this.props.signedin ? "Signedin" : "Home"
      }
    );
    return <Root />;
  }
}

export default class AppView extends React.Component {
  state = {
    appIsReady: false,
    signedin: false
  };

  async _loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        images: [require("./assets/icons/loading.png")],
        fonts: [
          Ionicons.font,
          { roboto: require("./assets/fonts/Roboto-Regular.ttf") }
        ]
      });
    } catch (e) {
      console.log(e.message);
    } finally {
      this.setState({ appIsReady: true });
    }
  }

  async _isSignedin() {
    try {
      const token = await AsyncStorage.getItem("TOKEN");
      const response = await fetch(`${apiURL}/expiryCheck`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const expiryCheck = await response.text();
      if (token !== null && expiryCheck === "success") {
        this.setState({ signedin: true });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async componentWillMount() {
    try {
      await this._isSignedin();
    } catch (error) {
      console.error(error);
    } finally {
      this._loadAssetsAsync();
    }
  }

  render() {
    return this.state.appIsReady
      ? <App signedin={this.state.signedin} />
      : <AppLoading />;
  }
}

//keychain
//android
//orient
//access
//log err
//selectable
