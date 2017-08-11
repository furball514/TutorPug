import React from "react";
import {
  View,
  Text,
  AsyncStorage,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { apiURL } from "../util/links";

export class SignupView extends React.Component {
  state = {
    data: {}
  };

  async componentDidMount() {
    try {
      const token = await AsyncStorage.getItem("TOKEN");
      const response = await fetch(`${apiURL}/getAll`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      this.setState({ data });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text
          selectable={false}
          allowFontScaling={false}
          style={styles.greeting}
        >
          Hi, {this.state.data.firstName}!
        </Text>
        <Text
          selectable={false}
          allowFontScaling={false}
          style={styles.question}
        >
          Are you a ...?
        </Text>
        <TouchableOpacity>
          <Text
            selectable={false}
            allowFontScaling={false}
            style={styles.options}
          >
            Student
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            selectable={false}
            allowFontScaling={false}
            style={styles.options}
          >
            Tutor
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F5A43"
  },
  greeting: {
    marginTop: 30,
    alignSelf: "flex-start",
    color: "white",
    fontSize: 20,
    marginLeft: 15,
    fontFamily: "roboto"
  },
  question: {
    alignSelf: "center",
    fontSize: 20,
    color: "#FDF760",
    fontFamily: "roboto"
  },
  options: {
    color: "white",
    fontSize: 20,
    alignSelf: "center",
    fontFamily: "roboto"
  }
});

//justifySelf
//oval
//blueishgreen
//space-around
