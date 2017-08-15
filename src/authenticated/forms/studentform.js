import React from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";

export default class StudentForm extends React.Component {
  static navigationOptions = {
    headerRight:
      Platform.OS === "ios"
        ? <TouchableOpacity>
            <Text
              selectable={false}
              allowFontScaling={false}
              style={{
                color: "#5856d6",
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
    return (
      <View>
        <View style={styles.section}>
          <Text
            selectable={false}
            allowFontScaling={false}
            style={styles.label}
          >
            Profile Picture
          </Text>
          <Text allowFontScaling={false}> gty </Text>
        </View>
        <View style={styles.section}>
          <Text
            selectable={false}
            allowFontScaling={false}
            style={styles.label}
          >
            First Name
          </Text>
          <Text allowFontScaling={false}>hfrtgh</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around", //
    marginVertical: 20, //
    height: 50, //
    alignItems: "center",
    borderTopWidth: 0.3,
    borderBottomWidth: 0.3,
    borderTopColor: "black",
    borderBottomColor: "black"
  },
  label: {
    fontFamily: "roboto",
    color: "#0F5A43",
    fontSize: 22
  }
});

//style
//view
//inputs , defaults
//colors
//gradient
//elevation
