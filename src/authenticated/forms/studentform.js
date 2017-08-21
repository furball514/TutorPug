import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Platform,
  ScrollView,
  Picker,
  Image,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient, ImagePicker } from 'expo';

export default class StudentForm extends React.Component {
  state = {
    imageError: false,
    agePicker: false,
    genderPicker: false,
    firstName: '',
    lastName: '',
    age: '10',
    gender: null,
    dp: '',
  };

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
                marginRight: 13,
                marginTop: 3,
                fontSize: 19,
              }}>
              Done
            </Text>
          </TouchableOpacity>
        : null,
  };

  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState({
      firstName: params.data.firstName,
      lastName: params.data.lastName,
      dp: params.data.dp,
    });
  }

  async pickImage() {
    const imageReturned = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      exif: true,
    });
    if (!imageReturned.cancelled) {
      this.setState({ dp: `data:image/jpg;base64,${imageReturned.base64}` });
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={[styles.border, { marginTop: 40 }]} />
        <TouchableOpacity style={styles.section} onPress={() => this.pickImage()}>
          <Text selectable={false} allowFontScaling={false} style={styles.label}>
            Profile Picture
          </Text>
          <Image
            style={styles.dp}
            source={
              this.state.imageError ? require('../../assets/icons/app.png') : { uri: this.state.dp }
            }
            onError={() => this.setState({ imageError: true })}
            defaultSource={require('../../assets/icons/app.png')}
          />
          <Text allowFontScaling={false} selectable={false}>
            Edit
          </Text>
        </TouchableOpacity>
        <View style={[styles.border, { marginBottom: 40 }]} />

        <Text allowFontScaling={false} selectable={false} style={styles.title}>
          BASIC INFO
        </Text>
        <View style={styles.border} />
        <View style={styles.section}>
          <Text selectable={false} allowFontScaling={false} style={styles.label}>
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
          <Text selectable={false} allowFontScaling={false} style={styles.label}>
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
        <TouchableOpacity
          style={styles.section}
          onPress={() => this.setState({ agePicker: !this.state.agePicker })}>
          <Text selectable={false} allowFontScaling={false} style={styles.label}>
            Age
          </Text>
          <Text allowFontScaling={false} selectable={false} style={styles.text}>
            {this.state.age}
          </Text>
        </TouchableOpacity>
        {this.state.agePicker ? null : <View style={styles.border} />}
        {this.state.agePicker
          ? <LinearGradient colors={['white', '#FDF760']}>
              <Picker
                style={styles.picker}
                itemStyle={styles.pickerItem}
                selectedValue={this.state.age}
                onValueChange={(itemValue, itemIndex) => this.setState({ age: itemValue })}>
                <Picker.Item label="10" value="10" />
                <Picker.Item label="11" value="11" />
              </Picker>
              <View style={styles.border} />
            </LinearGradient>
          : null}
        <TouchableOpacity
          style={styles.section}
          onPress={() => this.setState({ genderPicker: !this.state.genderPicker })}>
          <Text selectable={false} allowFontScaling={false} style={styles.label}>
            Gender
          </Text>
          <Text allowFontScaling={false} selectable={false} style={styles.text}>
            {returnGender(this.state.gender)}
          </Text>
        </TouchableOpacity>
        {this.state.genderPicker ? null : <View style={[styles.border, { marginBottom: 40 }]} />}
        {this.state.genderPicker
          ? <View>
              <LinearGradient colors={['white', '#FDF760']}>
                <Picker
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  selectedValue={this.state.gender}
                  onValueChange={(itemValue, itemIndex) => this.setState({ gender: itemValue })}>
                  <Picker.Item label="Female" value="female" />
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Leave blank" value={null} />
                </Picker>
              </LinearGradient>
              <View style={[styles.border, { marginBottom: 40 }]} />
            </View>
          : null}

        <Text allowFontScaling={false} selectable={false} style={styles.title}>
          LOCATION
        </Text>
        <View style={styles.border} />
        <View style={styles.section}>
          <Text selectable={false} allowFontScaling={false} style={styles.label}>
            Location
          </Text>
          <Text allowFontScaling={false}>required</Text>
        </View>
        <View style={[styles.border, { marginBottom: 40 }]} />

        <Text allowFontScaling={false} selectable={false} style={styles.title}>
          EDUCATION
        </Text>
        <View style={styles.border} />
        <View style={styles.section} />
        <View style={[styles.border, { marginBottom: 40 }]} />

        <Text allowFontScaling={false} selectable={false} style={styles.title}>
          CONTACT
        </Text>
        <View style={styles.border} />
        <View style={styles.section} />
        <View style={[styles.border, { marginBottom: 40 }]} />
      </ScrollView>
    );
  }
}

const returnGender = gender => {
  if (gender == null) {
    return 'Leave blank';
  } else return `${gender.charAt(0).toUpperCase()}${gender.slice(1)}`;
};

const styles = StyleSheet.create({
  section: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 65,
    alignItems: 'center',
  },
  label: {
    fontWeight: '500',
    color: '#0F5A43',
    fontSize: 24,
    marginLeft: 20,
  },
  title: {
    color: '#8a8a92',
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 5,
    marginLeft: 20,
  },
  textInput: {
    fontFamily: 'roboto',
    textAlign: 'right',
    fontSize: 22,
    height: 40,
    width: 140,
    alignSelf: 'center',
    marginRight: 20,
  },
  dp: {
    marginRight: 20,
    borderRadius: 23,
    height: 46,
    width: 46,
    borderColor: '#8a8a92',
    borderWidth: 1,
  },
  picker: {
    height: 125,
    justifyContent: 'center',
  },
  pickerItem: {
    fontSize: 30,
    color: '#0F5A43',
    fontWeight: '500',
  },
  border: {
    borderBottomWidth: 0.3,
    borderBottomColor: 'black',
  },
  text: {
    fontFamily: 'roboto',
    fontSize: 20,
    marginRight: 20,
  },
});

//picker bugs
//erroralert
//scrollindicator, keyboard
//validate
//focus,touchable
//inputs , defaults
//style
