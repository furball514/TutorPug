import React from 'react';
import { StyleSheet, Text, View, WebView } from 'react-native';
import { WebBrowser } from 'expo';

export default class LicenseView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.info} accessible>
          <Text allowFontScaling={false} selectable={false} style={styles.text}>
            This App's Source Code Is Publicly Viewable On{' '}
            <Text
              onPress={async () =>
                await WebBrowser.openBrowserAsync(
                  'https://github.com/furball514/TutorPug'
                ).catch(err => console.error(err))}
              style={styles.link}
              allowFontScaling={false}
              selectable={false}>
              Github.
            </Text>
          </Text>
          <Text allowFontScaling={false} style={styles.text} selectable={false}>
            This App Is Licensed Under
            <Text selectable allowFontScaling={false}>
              {' '}The Microsoft Reference Source License.
            </Text>
          </Text>
        </View>
        <WebView
          source={{
            uri: 'https://github.com/furball514/TutorPug/blob/master/LICENSE',
          }}
          style={styles.webview}
          startInLoadingState
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  info: {
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    fontFamily: 'roboto',
    fontSize: 20,
    marginLeft: 7,
  },
  link: {
    textDecorationLine: 'underline',
    color: 'blue',
    fontFamily: 'roboto',
  },
  webview: {
    alignSelf: 'stretch',
    height: 900,
  },
});

//modal
