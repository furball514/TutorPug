import React from "react";
import Sentry from "sentry-expo";
import { Text, TouchableOpacity, Platform, Image } from "react-native";
import { AppLoading, Font, Asset } from "expo";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigator } from "react-navigation";
import HomeScreen from "./home/homescreen";
import LicenseView from "./home/license";

Sentry.config(
  "https://a91c8897643140638ddfd686dbf42476@sentry.io/189285"
).install();

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

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
  }
});

export default class AppView extends React.Component {
  state = {
    appIsReady: false
  };

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([require("./assets/icons/loading.png")]);
    const fontAssets = cacheFonts([
      {
        roboto: require("./assets/fonts/Roboto-Regular.ttf")
      }
    ]);
    await Promise.all([...imageAssets, ...fontAssets]);
    this.setState({ appIsReady: true });
  }

  componentWillMount() {
    this._loadAssetsAsync();
  }

  render() {
    this.state.appIsReady ? <HomeScreen /> : <AppLoading />;
  }
}

//cache fonts,imgs,icons