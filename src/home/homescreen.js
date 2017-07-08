import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("./../assets/icons/loading.png")}
          style={styles.logo}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F5A43"
  },
  logo: {
    margin: 50,
    alignSelf: "center"
  }
});
