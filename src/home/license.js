import React from "react";
import { StyleSheet, Text, View, Linking, WebView } from "react-native";

export default class LicenseView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Text allowFontScaling={false} selectable={false} style={styles.text}>
            This App's Source Code Is Publicly Viewable On{" "}
            <Text style={styles.link} allowFontScaling={false}>
              Github
            </Text>
          </Text>
          <Text allowFontScaling={false} style={styles.text}>
            This App Is Licensed Under
            <Text selectable={true} allowFontScaling={false}>
              {" "}The Microsoft Reference Source License
            </Text>
          </Text>
        </View>
        <WebView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F5A43"
  },
  info: {
    flex: 1,
    marginTop: 25,
    alignContent: "space-around"
  },
  text: {
    color: "white"
  },
  link: {
    textDecorationLine: "underline",
    color: "lightblue"
  }
});

//linking
//webview
//layout
//header
//backbutton
//fontweight
