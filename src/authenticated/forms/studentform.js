import React from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";

export default class StudentForm extends React.Component {
  state = {
    firstName: "jared"
  };

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
      <KeyboardAvoidingView behavior="padding">
        <View style={[styles.border, { marginTop: 40 }]} />
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
        <View style={[styles.border, { marginBottom: 40 }]} />
        <View style={styles.border} />
        <View style={styles.section}>
          <Text
            selectable={false}
            allowFontScaling={false}
            style={styles.label}
          >
            First Name
          </Text>
          <TextInput
            style={styles.textInput}
            value={this.state.firstName}
            onChangeText={firstName => this.setState({ firstName })}
          />
        </View>
        <View style={styles.border} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around", //
    height: 65, //
    alignItems: "center"
  },
  label: {
    fontWeight: "500",
    color: "#0F5A43",
    fontSize: 24
  },
  textInput: {
    color: "#FDF760",
    fontFamily: "roboto",
    height: 20
  },
  border: {
    borderBottomWidth: 0.3,
    borderBottomColor: "black"
  }
});

//style
//view
//inputs , defaults
//colors
//gradient
//elevation
