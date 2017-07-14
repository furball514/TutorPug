import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class HomeScreen extends React.Component {
  state = {
    modalVisible: false
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigate("License")}>
          <Text
            allowFontScaling={false}
            selectable={false}
            style={styles.license}
          >
            LICENSE
          </Text>
        </TouchableOpacity>
        <Image
          source={require("./../assets/icons/loading.png")}
          style={styles.logo}
        />
        <SignUp />
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => <SignIn visible={this.state.modalVisible} />}
          >
            <Text
              selectable={false}
              allowFontScaling={false}
              style={styles.signInText}
            >
              Already have an account? Sign In.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class SignUp extends React.Component {
  render() {
    return (
      <View style={styles.signup}>
        <TouchableOpacity style={styles.fbButton}>
          <Ionicons
            name="logo-facebook"
            color="white"
            size={32}
            style={styles.icons}
          />
          <Text
            style={styles.signupText}
            allowFontScaling={false}
            selectable={false}
          >
            Sign up with Facebook
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gButton}>
          <Ionicons
            name="logo-google"
            color="white"
            size={28}
            style={styles.icons}
          />
          <Text
            style={styles.signupText}
            allowFontScaling={false}
            selectable={false}
          >
            Sign up with Google
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class SignIn extends React.Component {
  state = {
    visible: false
  };

  componentWillMount() {
    this.setState({ visible: this.props.visible });
  }

  setModalVisible(visible) {
    this.setState({ visible });
  }

  render() {
    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.state.visible}
      >
        <View style={{ marginTop: 22 }}>
          <View>
            <Text>Hello World!</Text>
            <TouchableOpacity
              onPress={() => {
                this.setModalVisible(!this.state.visible);
              }}
            >
              <Text>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F5A43"
  },
  logo: {
    marginTop: 100,
    width: null,
    resizeMode: "contain",
    height: 78
  },
  license: {
    marginTop: 30,
    alignSelf: "flex-end",
    color: "white",
    fontSize: 15,
    marginRight: 9,
    fontWeight: "normal",
    fontFamily: "roboto"
  },
  signInText: {
    alignSelf: "center",
    fontSize: 15,
    color: "#FDF760",
    fontWeight: "normal",
    fontFamily: "roboto"
  },
  signup: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 80
  },
  signupText: {
    color: "white",
    fontSize: 23,
    fontFamily: "roboto",
    padding: 5
  },
  fbButton: {
    marginBottom: 10,
    backgroundColor: "#3b5998",
    height: 40,
    width: 270,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5
  },
  gButton: {
    backgroundColor: "#dd4b39",
    height: 37,
    width: 274,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5
  },
  icons: { padding: 6, marginBottom: 2 },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 50
  }
});

//fix modal