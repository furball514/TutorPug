import React from 'react';
import Sentry from 'sentry-expo';
import { Text, TouchableOpacity, Platform } from 'react-native';
import { AppLoading, SecureStore } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './home/homescreen';
import LicenseView from './home/license';
import { SignedIn } from './authenticated/signedin';
import SignupView from './authenticated/signup';
import StudentForm from './authenticated/forms/studentform';
import TutorForm from './authenticated/forms/tutorform';
import { apiURL } from './util/links';
import cacheAssetsAsync from './util/cacheAssets';

Sentry.config('https://a91c8897643140638ddfd686dbf42476@sentry.io/189285').install();

class App extends React.Component {
  componentWillMount() {
    if (!this.props.signedin)
      try {
        SecureStore.deleteValueWithKeyAsync('TOKEN');
        console.log('deleted');
      } catch (error) {
        console.error(error);
      }
  }

  render() {
    const Root = StackNavigator(
      {
        Home: {
          screen: HomeScreen,
          header: null,
          navigationOptions: {
            header: null,
          },
        },
        License: {
          screen: LicenseView,
          navigationOptions: ({ navigation }) => ({
            headerLeft:
              Platform.OS === 'ios'
                ? <TouchableOpacity
                    accessible
                    accessibilityLabel={'dismiss'}
                    onPress={() => navigation.goBack()}>
                    <Ionicons
                      name="ios-close"
                      color="blue"
                      size={40}
                      style={{ marginLeft: 16, marginTop: 5 }}
                    />
                  </TouchableOpacity>
                : <TouchableOpacity
                    accessible
                    accessibilityLabel={'dismiss'}
                    onPress={() => navigation.goBack()}>
                    <Ionicons
                      name="md-close"
                      size={32}
                      color="white"
                      style={{ marginLeft: 20, marginTop: 20 }}
                    />
                  </TouchableOpacity>,
            headerTitle:
              Platform.OS === 'ios'
                ? <Text
                    allowFontScaling={false}
                    selectable={false}
                    style={{ fontFamily: 'roboto' }}>
                    LICENSE
                  </Text>
                : <Text
                    selectable={false}
                    style={{
                      fontWeight: '400',
                      color: 'white',
                      fontSize: 25,
                      marginLeft: 30,
                      textAlign: 'left',
                      marginTop: 20,
                    }}>
                    License
                  </Text>,
            headerStyle:
              Platform.OS === 'ios'
                ? { backgroundColor: 'white' }
                : {
                    backgroundColor: '#00897b',
                    elevation: 4,
                    height: 80,
                  },
            headerPressColorAndroid: 'white',
          }),
        },
        Signedin: {
          screen: SignedIn,
          header: null,
          navigationOptions: {
            gesturesEnabled: false,
            header: null,
          },
        },
        Signup: {
          screen: SignupView,
          header: null,
          navigationOptions: {
            gesturesEnabled: false,
            header: null,
          },
        },
        Sform: {
          screen: StudentForm,
          navigationOptions: ({ navigation }) => ({
            headerLeft:
              Platform.OS === 'ios'
                ? <TouchableOpacity
                    accessible
                    accessibilityLabel={'dismiss'}
                    onPress={() => navigation.goBack()}>
                    <Ionicons
                      name="ios-close"
                      color="blue"
                      size={40}
                      style={{ marginLeft: 16, marginTop: 5 }}
                    />
                  </TouchableOpacity>
                : <TouchableOpacity
                    accessible
                    accessibilityLabel={'dismiss'}
                    onPress={() => navigation.goBack()}>
                    <Ionicons
                      name="md-close"
                      size={32}
                      color="white"
                      style={{ marginLeft: 20, marginTop: 20 }}
                    />
                  </TouchableOpacity>,
            headerTitle:
              Platform.OS === 'ios'
                ? <Text
                    allowFontScaling={false}
                    selectable={false}
                    style={{ fontFamily: 'roboto', fontSize: 20 }}>
                    Profile
                  </Text>
                : <Text
                    selectable={false}
                    style={{
                      fontWeight: '400',
                      color: 'white',
                      fontSize: 25,
                      marginLeft: 30,
                      textAlign: 'left',
                      marginTop: 20,
                    }}>
                    Profile
                  </Text>,
            headerStyle:
              Platform.OS === 'ios'
                ? { backgroundColor: 'white' }
                : {
                    backgroundColor: '#00897b',
                    elevation: 4,
                    height: 80,
                  },
            headerPressColorAndroid: 'white',
          }),
        },
        Tform: {
          screen: TutorForm,
          navigationOptions: ({ navigation }) => ({
            headerLeft:
              Platform.OS === 'ios'
                ? <TouchableOpacity
                    accessible
                    accessibilityLabel={'dismiss'}
                    onPress={() => navigation.goBack()}>
                    <Ionicons
                      name="ios-close"
                      color="blue"
                      size={40}
                      style={{ marginLeft: 16, marginTop: 5 }}
                    />
                  </TouchableOpacity>
                : <TouchableOpacity
                    accessible
                    accessibilityLabel={'dismiss'}
                    onPress={() => navigation.goBack()}>
                    <Ionicons
                      name="md-close"
                      size={32}
                      color="white"
                      style={{ marginLeft: 20, marginTop: 20 }}
                    />
                  </TouchableOpacity>,
            headerTitle:
              Platform.OS === 'ios'
                ? <Text
                    allowFontScaling={false}
                    selectable={false}
                    style={{ fontFamily: 'roboto', fontSize: 20 }}>
                    Profile
                  </Text>
                : <Text
                    selectable={false}
                    style={{
                      fontWeight: '400',
                      color: 'white',
                      fontSize: 25,
                      marginLeft: 30,
                      textAlign: 'left',
                      marginTop: 20,
                    }}>
                    Profile
                  </Text>,
            headerStyle:
              Platform.OS === 'ios'
                ? { backgroundColor: 'white' }
                : {
                    backgroundColor: '#00897b',
                    elevation: 4,
                    height: 80,
                  },
            headerPressColorAndroid: 'white',
          }),
        },
      },
      {
        initialRouteName: this.props.signedin ? 'Signedin' : 'Home',
      }
    );
    return <Root />;
  }
}

export default class AppView extends React.Component {
  state = {
    appIsReady: false,
    signedin: false,
  };

  async _loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        images: [
          require('./assets/icons/loading.png'),
          require('./assets/icons/dp.png'),
          require('./assets/icons/studentMarker.png'),
          require('./assets/icons/tutorMarker.png'),
          require('./assets/icons/flag-blue.png'),
        ],
        fonts: [Ionicons.font, { roboto: require('./assets/fonts/Roboto-Regular.ttf') }],
      });
    } catch (e) {
      console.log(e.message);
    } finally {
      this.setState({ appIsReady: true });
    }
  }

  async _isSignedin() {
    try {
      const token = await SecureStore.getValueWithKeyAsync('TOKEN');
      const response = await fetch(`${apiURL}/expiryCheck`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const expiryCheck = await response.text();
      if (token !== null && expiryCheck === 'success') {
        this.setState({ signedin: true });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async componentWillMount() {
    try {
      await this._isSignedin();
    } catch (error) {
      console.error(error);
    } finally {
      this._loadAssetsAsync();
    }
  }

  render() {
    return this.state.appIsReady ? <App signedin={this.state.signedin} /> : <AppLoading />;
  }
}

//android, v , toast,md,-form
//orient
//access
//~student~ /-type tutor
//selectable
//actionsheet
//platformcolor
//apiendpoint
//style
//perform
//best p,clean
//expiry
//clipboard
//links
//statusbarheight
//statusbar
//svg
//imgur
//googplaces fontscaling

//log err
//sentry
//homescreen space - ios, &nbsp; -a, style
//links
//uri
//jwt
//invariant
