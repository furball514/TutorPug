import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";

export default class HomeScreen extends React.Component {
  state = {
    visibleModal: false
  };

  setModalVisible(visibleModal) {
    this.setState({ visibleModal });
  }

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
          accessible={true}
          accessibilityLabel="logo"
        />

        <SignUp />

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => this.setState({ visibleModal: true })}
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

        <Modal isVisible={this.state.visibleModal} style={styles.modal}>
          <View style={styles.modalContent}>
            <SignIn />
          </View>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => this.setState({ visibleModal: false })}
          >
            <Text style={styles.cancelText} allowFontScaling={false}>
              Cancel
            </Text>
          </TouchableOpacity>
        </Modal>
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
  render() {
    return (
      <View style={styles.signin}>
        <TouchableOpacity style={styles.lightFbButton}>
          <Ionicons
            name="logo-facebook"
            color="#3b5998"
            size={32}
            style={styles.icons}
          />
          <Text
            style={styles.darkSignupText}
            allowFontScaling={false}
            selectable={false}
          >
            Sign in with Facebook
          </Text>
        </TouchableOpacity>
        <View style={styles.border} />
        <TouchableOpacity style={styles.lightGButton}>
          <Ionicons
            name="logo-google"
            color="#dd4b39"
            size={28}
            style={styles.icons}
          />
          <Text
            style={styles.darkSignupText}
            allowFontScaling={false}
            selectable={false}
          >
            Sign in with Google
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
    padding: 5,
    fontWeight: "normal"
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
  },
  modal: {
    justifyContent: "flex-end"
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 14,
    marginBottom: 20,
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  cancelButton: {
    backgroundColor: "white",
    borderRadius: 14
  },
  cancelText: {
    padding: 10,
    textAlign: "center",
    color: "red",
    fontSize: 24,
    fontWeight: "500",
    backgroundColor: "transparent",
    fontFamily: "roboto"
  },
  signin: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  lightFbButton: {
    marginBottom: 10,
    height: 40,
    width: 270,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5
  },
  lightGButton: {
    height: 37,
    width: 274,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5
  },
  darkSignupText: {
    fontSize: 23,
    fontFamily: "roboto",
    padding: 5,
    fontWeight: "normal"
  },
  border: {
    borderBottomColor: "black",
    borderBottomWidth: 1
  }
});

//g icon
//best p
//border
//background
