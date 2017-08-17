import React from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity
} from "react-native";

export default class StudentForm extends React.Component {
  state = {
    firstName: "",
    lastName: ""
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
                marginRight: 13,
                marginTop: 3,
                fontSize: 19
              }}
            >
              Done
            </Text>
          </TouchableOpacity>
        : null
  };

  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState({
      firstName: params.data.firstName,
      lastName: params.data.lastName
    });
  }

  render() {
    return (
      <ScrollView>
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
        <Text allowFontScaling={false} selectable={false} style={styles.title}>
          BASIC INFO
        </Text>
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
            autoCapitalize="words"
            maxLength={40}
            placeholder="required"
            placeholderTextColor="#8a8a92"
            returnKeyType="next"
            selectionColor="#FDF760"
            onChangeText={firstName => this.setState({ firstName })}
          />
        </View>
        <View style={styles.border} />
        <View style={styles.section}>
          <Text
            selectable={false}
            allowFontScaling={false}
            style={styles.label}
          >
            Last Name
          </Text>
          <TextInput
            style={styles.textInput}
            value={this.state.lastName}
            autoCapitalize="words"
            maxLength={40}
            placeholder="required"
            placeholderTextColor="#8a8a92"
            returnKeyType="next"
            selectionColor="#FDF760"
            onChangeText={lastName => this.setState({ lastName })}
          />
        </View>
        <View style={styles.border} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 65,
    alignItems: "center"
  },
  label: {
    fontWeight: "500",
    color: "#0F5A43",
    fontSize: 24,
    marginLeft: 20
  },
  title: {
    color: "#8a8a92",
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 5,
    marginLeft: 20
  },
  textInput: {
    fontFamily: "roboto",
    textAlign: "right",
    fontSize: 22,
    height: 40,
    width: 140,
    alignSelf: "center",
    marginRight: 20
  },
  border: {
    borderBottomWidth: 0.3,
    borderBottomColor: "black"
  }
});

//focus
//style
//view
//inputs , defaults
//colors
//gradient
//elevation
