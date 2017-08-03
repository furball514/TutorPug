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
import cacheAssetsAsync from "./util/cacheAssets";

Sentry.config(
  "https://a91c8897643140638ddfd686dbf42476@sentry.io/189285"
).install();

const isSignedin = async () => {
  try {
    const token = await AsyncStorage.getItem("TOKEN");
    if (token !== null) {
      return true;
    } else return false;
  } catch (error) {
    console.error(error);
  }
};

const App = StackNavigator(
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
    initialRouteName: isSignedin() ? "Signedin" : "Home"
  }
);

export default class AppView extends React.Component {
  state = {
    appIsReady: false
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

  componentWillMount() {
    this._loadAssetsAsync();
  }

  render() {
    return this.state.appIsReady ? <App /> : <AppLoading />;
  }
}

//exp
//keychain
//android
//orient
//access
//log err
//selectable
