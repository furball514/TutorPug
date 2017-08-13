import React from "react";
import { Text, StyleSheet, Platform, TouchableOpacity } from "react-native";

export default class StudentForm extends React.Component {
  static navigationOptions = {
    headerRight:
      Platform.OS === "ios"
        ? <TouchableOpacity>
            <Text
              selectable={false}
              allowFontScaling={false}
              style={{
                color: "blue",
                fontWeight: "600",
                marginRight: 15,
                marginTop: 3,
                fontSize: 17
              }}
            >
              Done
            </Text>
          </TouchableOpacity>
        : null
  };

  render() {
    return <Text> student form</Text>;
  }
}

const styles = StyleSheet.create({});
