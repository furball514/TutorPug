import React from 'react';
import { Text, Platform, TouchableOpacity } from 'react-native';

export default class TutorForm extends React.Component {
  static navigationOptions = {
    headerRight:
      Platform.OS === 'ios'
        ? <TouchableOpacity>
            <Text
              selectable={false}
              allowFontScaling={false}
              style={{
                color: '#5856d6',
                fontWeight: '600',
                marginRight: 15,
                marginTop: 3,
                fontSize: 17,
              }}>
              Done
            </Text>
          </TouchableOpacity>
        : null,
  };

  render() {
    return <Text> tutor form</Text>;
  }
}

//forms - recommended , optional , required

/*//student
*firstName
*lastName
*dp
*geocode
*age
*gender
*grade
*subject
*tags
*number
*email
*/

/*//tutor
*firstName
*lastName
*dp
*geocode , teaching point
*age
*gender
*education
*tags
*number
*email
*website
*about/bio
*certificate
*/
