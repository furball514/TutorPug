import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Font, AppLoading } from "expo";

export default class HomeScreen extends React.Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      roboto: require("./../assets/fonts/Roboto-Regular.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    this.state.fontLoaded
      ? <View style={styles.container}>
          <Text
            allowFontScaling={false}
            selectable={false}
            style={styles.license}
          >
            LICENSE
          </Text>
          <Image
            source={require("./../assets/icons/loading.png")}
            style={styles.logo}
          />
          <View style={styles.footer}>
            <Text
              selectable={false}
              allowFontScaling={false}
              style={styles.signInText}
            >
              Already have an account? Sign In.
            </Text>
          </View>
        </View>
      : null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F5A43"
  },
  logo: {
    marginTop: 100,
    width: null,
    resizeMode: "contain",
    height: 78
  },
  license: {
    marginTop: 30,
    alignSelf: "flex-end",
    color: "white",
    fontSize: 15,
    marginRight: 9,
    fontWeight: "normal",
    fontFamily: "roboto"
  },
  signInText: {
    alignSelf: "center",
    fontSize: 15,
    color: "#FDF760",
    fontWeight: "normal",
    fontFamily: "roboto"
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 50
  }
});
