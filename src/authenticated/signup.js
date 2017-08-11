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
          Are you a ... ?
        </Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.button}>
            <Text
              selectable={false}
              allowFontScaling={false}
              style={styles.options}
            >
              Student
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text
              selectable={false}
              allowFontScaling={false}
              style={styles.options}
            >
              Tutor
            </Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 25,
    color: "#FDF760",
    fontFamily: "roboto",
    marginTop: 100
  },
  optionsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 80
  },
  button: {
    backgroundColor: "green",
    justifyContent: "center",
    height: 60,
    width: 64,
    borderRadius: 50,
    transform: [{ scaleX: 2 }]
  },
  options: {
    color: "white",
    fontSize: 14,
    alignSelf: "center",
    fontFamily: "roboto"
  }
});

//blueishgreen
//hr
//layout
//style