import React from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView
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
      <View style={styles.container}>
        <View style={styles.section}>
          <Text
            selectable={false}
            allowFontScaling={false}
            style={styles.label}
          >
            Profile Picture
          </Text>
          <View
            style={{
              backgroundColor: "black",
              borderRadius: 50,
              alignSelf: "flex-end"
            }}
          />
        </View>
        <View style={styles.section}>
          <Text
            selectable={false}
            allowFontScaling={false}
            style={styles.label}
          >
            First Name
          </Text>
          <TextInput style={styles.input} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  section: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 0.3,
    borderColor: "black",
    justifyContent: "space-around",
  },
  label: {
    fontFamily: "roboto",
    color: "#0F5A43",
    fontSize: 22,
    alignSelf: "flex-start"
  },
  input: {
    alignSelf: "flex-end"
  }
});

//style
//view
//inputs , defaults
//colors
//gradient
//elevation