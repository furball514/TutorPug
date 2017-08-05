import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Linking,
  AsyncStorage
} from "react-native";
import { WebBrowser } from "expo";
import { Ionicons } from "@expo/vector-icons";
import { authenticationURL } from "../util/links";
import Modal from "react-native-modal";

export default class HomeScreen extends React.Component {
  state = {
    visibleModal: false
  };

  toggleModal(visibleModal) {
    this.setState({ visibleModal });
  }

  render() {
    const { navigate } = this.props.navigation;
    const iosDismiss = (
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => this.toggleModal(false)}
      >
        <Text
          style={styles.cancelText}
          allowFontScaling={false}
          selectable={false}
        >
          Cancel
        </Text>
      </TouchableOpacity>
    );
    const androidDismiss = (
      <View style={styles.cancelButton}>
        <Text
          style={styles.cancelText}
          allowFontScaling={false}
          selectable={false}
          onPress={() => this.toggleModal(false)}
        >
          Cancel
        </Text>
      </View>
    );
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

        <SignUp
          navigation={this.props.navigation}
          modalOpen={this.state.visibleModal}
        />

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => this.toggleModal(true)}>
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
            <SignIn
              navigation={this.props.navigation}
              toggleModal={this.toggleModal.bind(this)}
            />
          </View>
          {Platform.OS === "ios" ? iosDismiss : androidDismiss}
        </Modal>
      </View>
    );
  }
}

class SignUp extends React.Component {
  componentDidMount() {
    Linking.addEventListener("url", this._handleRedirect);
  }

  _handleRedirect = async ({ url }) => {
    const { navigate } = this.props.navigation;
    WebBrowser.dismissBrowser();
    let token = url.split("/+redirect/?user=")[1];
    let formatted;
    if (token)
      try {
        let end = decodeURIComponent(token).lastIndexOf("}") + 1;
        formatted = JSON.parse(
          decodeURIComponent(token)
            .slice(0, end)
            .replace("#", "")
            .replace("undefined", "")
            .replace("%", "")
        );
      } catch (error) {
        console.log(decodeURIComponent(token));
      } finally {
        try {
          try {
            await AsyncStorage.setItem("TOKEN", formatted.token);
          } catch (error) {
            console.error(error);
          }
          if (formatted.status === "signin") {
            navigate("Signedin");
          } else if (formatted.status === "signup") {
            navigate("Signup");
          }
        } catch (error) {
          console.error(error);
        }
      }
  };

  authenticate = async provider => {
    await WebBrowser.openBrowserAsync(`${authenticationURL}${provider}`);
  };

  componentWillUnmount() {
    try {
      Linking.removeEventListener("url", this._handleRedirect);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    if (this.props.modalOpen)
      Linking.removeEventListener("url", this._handleRedirect);
    return (
      <View style={styles.signup}>
        <TouchableOpacity
          style={styles.fbButton}
          onPress={() => this.authenticate("facebook")}
        >
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
        <TouchableOpacity
          style={styles.gButton}
          onPress={() => this.authenticate("google")}
        >
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
            Sign up with Google{" "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.lnButton}
          onPress={() => this.authenticate("linkedin")}
        >
          <Ionicons
            name="logo-linkedin"
            color="white"
            size={32}
            style={styles.icons}
          />
          <Text
            style={styles.signupText}
            allowFontScaling={false}
            selectable={false}
          >
            Sign up with LinkedIn
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class SignIn extends React.Component {
  componentDidMount() {
    Linking.addEventListener("url", this._handleRedirect);
  }

  _handleRedirect = async ({ url }) => {
    const { navigate } = this.props.navigation;
    WebBrowser.dismissBrowser();
    let token = url.split("/+redirect/?user=")[1];
    let formatted;
    if (token)
      try {
        let end = decodeURIComponent(token).lastIndexOf("}") + 1;
        formatted = JSON.parse(
          decodeURIComponent(token)
            .slice(0, end)
            .replace("#", "")
            .replace("undefined", "")
            .replace("%", "")
        );
      } catch (error) {
        console.log(decodeURIComponent(token));
      } finally {
        try {
          try {
            await AsyncStorage.setItem("TOKEN", formatted.token);
          } catch (error) {
            console.error(error);
          }
          if (formatted.status === "signin") {
            navigate("Signedin");
          } else if (formatted.status === "signup") {
            navigate("Signup");
          }
        } catch (error) {
          console.error(error);
        }
      }
    this.props.toggleModal(false);
  };

  authenticate = async provider => {
    await WebBrowser.openBrowserAsync(`${authenticationURL}${provider}`);
  };

  componentWillUnmount() {
    Linking.removeEventListener("url", this._handleRedirect);
  }

  render() {
    return (
      <View style={styles.signin}>
        {Platform.OS === "ios"
          ? null
          : <Text style={styles.header} selectable={false}>
              {" "}Sign In{" "}
            </Text>}
        <TouchableOpacity
          style={styles.lightFbButton}
          onPress={() => this.authenticate("facebook")}
        >
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
        <TouchableOpacity
          style={styles.lightGButton}
          onPress={() => this.authenticate("google")}
        >
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
            Sign in with Google{" "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.lightLnButton}
          onPress={() => this.authenticate("linkedin")}
        >
          <Ionicons
            name="logo-linkedin"
            color="#0077b5"
            size={28}
            style={styles.icons}
          />
          <Text
            style={styles.darkSignupText}
            allowFontScaling={false}
            selectable={false}
          >
            Sign in with LinkedIn
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
    marginTop: 90,
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
    fontFamily: "roboto"
  },
  signInText: {
    alignSelf: "center",
    fontSize: 15,
    color: "#FDF760",
    fontFamily: "roboto"
  },
  signup: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 60
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
    borderRadius: 5,
    marginRight: 5
  },
  gButton: {
    marginBottom: 10,
    backgroundColor: "#dd4b39",
    height: 40,
    width: 274,
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 5
  },
  lnButton: {
    backgroundColor: "#0077b5",
    height: 40,
    width: 274,
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 5
  },
  icons: { padding: 6, marginBottom: 2 },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 50
  },
  modal:
    Platform.OS === "ios"
      ? {
          justifyContent: "flex-end"
        }
      : null,
  modalContent:
    Platform.OS === "ios"
      ? {
          backgroundColor: "white",
          borderRadius: 14,
          marginBottom: 10,
          padding: 22,
          justifyContent: "center",
          alignItems: "center",
          borderColor: "rgba(0, 0, 0, 0.1)"
        }
      : {
          backgroundColor: "white",
          padding: 22,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#00897b"
        },
  cancelButton:
    Platform.OS === "ios"
      ? {
          backgroundColor: "white",
          borderRadius: 14
        }
      : { backgroundColor: "white" },
  cancelText:
    Platform.OS === "ios"
      ? {
          padding: 10,
          textAlign: "center",
          color: "#5856d6",
          fontSize: 24,
          fontWeight: "600",
          backgroundColor: "transparent"
        }
      : {
          padding: 10,
          textAlign: "right",
          color: "#00897b",
          fontSize: 24,
          fontWeight: "500"
        },
  signin: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center"
  },
  lightFbButton: {
    marginBottom: 10,
    height: 40,
    width: 270,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "black",
    marginRight: 5,
    borderBottomWidth: Platform.OS === "ios" ? 0.1 : 0.5
  },
  lightGButton: {
    marginBottom: 10,
    height: 40,
    width: 270,
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomColor: "black",
    borderBottomWidth: Platform.OS === "ios" ? 0.1 : 0.5
  },
  lightLnButton: {
    height: 40,
    width: 270,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  darkSignupText: {
    fontSize: 23,
    fontFamily: "roboto",
    padding: 5
  },
  header: {
    color: "white",
    backgroundColor: "#00897b",
    textAlign: "left",
    fontWeight: "800"
  }
});

//best p,clean
//background pr
//modal-touchable,dismiss
//style
