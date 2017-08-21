import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SecureStore } from 'expo';
import { apiURL } from '../util/links';

export default class SignupView extends React.Component {
  state = {
    data: {},
    token: '',
    appReady: false,
  };

  async componentWillMount() {
    try {
      const appReady = true;
      const token = await SecureStore.getValueWithKeyAsync('TOKEN');
      const response = await fetch(`${apiURL}/getAll`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      this.setState({ data, token, appReady });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return this.state.appReady
      ? <View style={styles.container}>
          <Text selectable={false} allowFontScaling={false} style={styles.greeting}>
            Hi, {this.state.data.firstName}!
          </Text>
          <Text selectable={false} allowFontScaling={false} style={styles.question}>
            Are you a ... ?
          </Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigate('Sform', {
                  data: this.state.data,
                  token: this.state.token,
                })}>
              <Text selectable={false} allowFontScaling={false} style={styles.options}>
                Student
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigate('Tform', {
                  data: this.state.data,
                  token: this.state.token,
                })}>
              <Text selectable={false} allowFontScaling={false} style={styles.options}>
                Tutor
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      : null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F5A43',
  },
  greeting: {
    marginTop: 30,
    alignSelf: 'flex-start',
    color: 'white',
    fontSize: 25,
    marginLeft: 15,
    fontFamily: 'roboto',
  },
  question: {
    alignSelf: 'center',
    fontSize: 25,
    color: '#FDF760',
    fontFamily: 'roboto',
    marginTop: 115,
  },
  optionsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 105,
  },
  button: {
    backgroundColor: '#00796b',
    justifyContent: 'center',
    height: 60,
    width: 64,
    borderRadius: 50,
    transform: [{ scaleX: 2 }],
  },
  options: {
    color: 'white',
    fontSize: 14,
    alignSelf: 'center',
    fontFamily: 'roboto',
  },
});

//style
//errorhandling
