import React from "react";
import { Text, StyleSheet } from "react-native";

export default class StudentForm extends React.Component {
  static navigationOptions = {
    headerRight:
      Platform.OS === "ios"
        ? <Text
            selectable={false}
            allowFontScaling={false}
            style={styles.submitText}
          >
            Done
          </Text>
        : null
  };

  render() {
    return <Text> student form</Text>;
  }
}

const styles = StyleSheet.create({
  submitText: {
    color: "blue",
    fontWeight: "300"
  }
});
