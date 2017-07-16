import React from "react";
import { StyleSheet, Text, View, Linking, WebView } from "react-native";

export default class LicenseView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.info} accessible={true}>
          <Text allowFontScaling={false} selectable={false} style={styles.text}>
            This App's Source Code Is Publicly Viewable On{" "}
            <Text
              onPress={() =>
                Linking.openURL(
                  "https://github.com/furball514/TutorPug"
                ).catch(err => console.error(err))}
              style={styles.link}
              allowFontScaling={false}
            >
              Github.
            </Text>
          </Text>
          <Text allowFontScaling={false} style={styles.text}>
            This App Is Licensed Under
            <Text selectable={true} allowFontScaling={false}>
              {" "}The Microsoft Reference Source License.
            </Text>
          </Text>
        </View>
        <WebView
          source={{
            uri: "https://github.com/furball514/TutorPug/blob/master/LICENSE"
          }}
          style={styles.webview}
          startInLoadingState={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  info: {
    marginTop: 10,
    marginBottom: 10
  },
  text: {
    fontWeight: "normal",
    fontSize: 20,
    marginLeft: 7
  },
  link: {
    textDecorationLine: "underline",
    color: "blue",
    fontWeight: "normal"
  },
  webview: {
    alignSelf: "stretch",
    height: 900
  }
});

//modal
