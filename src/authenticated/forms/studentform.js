import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Platform,
  Picker,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient, ImagePicker, MapView, Location } from 'expo';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { retro, aubergine } from '../../util/mapStyles';

const { width, height } = Dimensions.get('window');

export default class StudentForm extends React.Component {
  state = {
    location: '',
    appReady: false,
    addressInput: false,
    visibleModal: false,
    imageError: false,
    locationPicker: false,
    agePicker: false,
    genderPicker: false,
    firstName: '',
    lastName: '',
    age: '10',
    gender: null,
    dp: '',
    geocode: {
      latitude: 0,
      longitude: 0,
    },
    landmarks: '',
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

  async componentWillMount() {
    const { params } = this.props.navigation.state;
    await Location.setApiKey(params.data.apikey);
    if (params.permissionStatus) {
      const geocode = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      const locationData = await Location.reverseGeocodeAsync({
        latitude: geocode.coords.latitude,
        longitude: geocode.coords.longitude,
      });
      const location = `${locationData[0].name}, ${locationData[0].street}, ${locationData[0]
        .city}-${locationData[0].postalCode}, ${locationData[0].region}, ${locationData[0]
        .country}`;
      this.setState({
        firstName: params.data.data.firstName,
        lastName: params.data.data.lastName,
        dp: params.data.data.dp,
        geocode: geocode.coords,
        appReady: true,
        location,
      });
    } else {
      this.setState({
        firstName: params.data.data.firstName,
        lastName: params.data.data.lastName,
        dp: params.data.data.dp,
        appReady: true,
      });
    }
  }

  async pickImage() {
    const imageReturned = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      exif: true,
    });
    if (!imageReturned.cancelled) {
      this.setState({ dp: `data:image/jpg;base64,${imageReturned.base64}` });
    }
    this.toggleModal(false);
  }

  async takePhoto() {
    const imageReturned = await ImagePicker.launchCameraAsync({
      base64: true,
      exif: true,
    });
    if (!imageReturned.cancelled) {
      this.setState({ dp: `data:image/jpg;base64,${imageReturned.base64}` });
    }
    this.toggleModal(false);
  }

  toggleModal(visibleModal) {
    this.setState({ visibleModal });
  }

  render() {
    const { params } = this.props.navigation.state;
    const ASPECT_RATIO = width / height;
    return this.state.appReady
      ? <KeyboardAwareScrollView>
          <View style={[styles.border, { marginTop: 40 }]} />
          <TouchableOpacity style={styles.section} onPress={() => this.toggleModal(true)}>
            <Text style={styles.label}>
              <Text selectable={false} allowFontScaling={false}>
                Profile Picture
              </Text>
              <Text selectable={false} allowFontScaling={false} style={styles.required}>
                *
              </Text>
            </Text>
            <View style={{ marginRight: 20 }}>
              <Image
                style={styles.dp}
                source={
                  this.state.imageError
                    ? require('../../assets/icons/dp.png')
                    : { uri: this.state.dp }
                }
                onError={() => this.setState({ imageError: true })}
                defaultSource={require('../../assets/icons/dp.png')}
              />
              <Text allowFontScaling={false} selectable={false} style={styles.edit}>
                Edit
              </Text>
            </View>
          </TouchableOpacity>
          <View style={[styles.border, { marginBottom: 40 }]} />

          <Text allowFontScaling={false} selectable={false} style={styles.title}>
            BASIC INFO
          </Text>
          <View style={styles.border} />
          <View style={styles.section}>
            <Text style={styles.label}>
              <Text allowFontScaling={false} selectable={false}>
                First Name
              </Text>
              <Text allowFontScaling={false} selectable={false} style={styles.required}>
                *
              </Text>
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
            <Text style={styles.label}>
              <Text allowFontScaling={false} selectable={false}>
                Last Name
              </Text>
              <Text allowFontScaling={false} selectable={false} style={styles.required}>
                *
              </Text>
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
            <Text style={styles.label}>
              <Text selectable={false} allowFontScaling={false}>
                Age
              </Text>
              <Text selectable={false} allowFontScaling={false} style={styles.required}>
                *
              </Text>
            </Text>
            <Text allowFontScaling={false} selectable={false} style={styles.text}>
              {this.state.age}
            </Text>
          </TouchableOpacity>
          {this.state.agePicker && !this.state.genderPicker ? null : <View style={styles.border} />}
          {this.state.agePicker && !this.state.genderPicker
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
          {this.state.genderPicker && !this.state.agePicker
            ? null
            : <View style={[styles.border, { marginBottom: 40 }]} />}
          {this.state.genderPicker && !this.state.agePicker
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
          <TouchableOpacity
            style={styles.section}
            onPress={() => this.setState({ locationPicker: true })}>
            <Text style={styles.label}>
              <Text selectable={false} allowFontScaling={false}>
                Location
              </Text>
              <Text selectable={false} allowFontScaling={false} style={styles.required}>
                *
              </Text>
            </Text>
            <Text
              allowFontScaling={false}
              selectable={false}
              style={[styles.textInput, { height: null, fontSize: 20 }]}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {this.state.location}
            </Text>
          </TouchableOpacity>
          <View style={styles.border} />
          <TouchableOpacity
            style={styles.section}
            onPress={() => this.setState({ addressInput: !this.state.addressInput })}>
            <Text style={styles.label}>
              <Text allowFontScaling={false} selectable={false}>
                Landmarks
              </Text>
              <Text allowFontScaling={false} selectable={false} style={styles.recommended}>
                *
              </Text>
            </Text>
            <Text
              allowFontScaling={false}
              selectable={false}
              style={[styles.textInput, { height: null, fontSize: 20 }]}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {this.state.addressInput ? null : this.state.landmarks}
            </Text>
          </TouchableOpacity>
          {this.state.addressInput ? null : <View style={[styles.border, { marginBottom: 40 }]} />}
          {this.state.addressInput
            ? <View style={{ height: 125 }}>
                <TextInput
                  style={styles.addressInput}
                  multiline
                  value={this.state.landmarks}
                  maxLength={100}
                  placeholder="landmarks / address details or clarifications"
                  placeholderTextColor="#8a8a92"
                  returnKeyType="next"
                  selectionColor="#FDF760"
                  onChangeText={landmarks => this.setState({ landmarks })}
                />
                <View style={[styles.border, { marginBottom: 40 }]} />
              </View>
            : null}

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

          <View style={[styles.border, { marginBottom: 10 }]} />
          <Text allowFontScaling={false} selectable={false} style={styles.helpText}>
            {`Fields marked with: 
        `}
            <Text allowFontScaling={false} selectable={false} style={styles.required}>
              *
            </Text>
            {`  are required
        `}
            <Text allowFontScaling={false} selectable={false} style={styles.recommended}>
              *
            </Text>
            {`  are recommended                         `}
            {'               Other fields are optional.'}
          </Text>
          <Modal
            isVisible={this.state.visibleModal}
            style={styles.modal}
            backdropOpacity={0.3}
            animationInTiming={200}
            animationOutTiming={200}
            onBackdropPress={() => this.toggleModal(false)}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={() => this.takePhoto()} style={styles.button}>
                <Ionicons
                  name="ios-camera-outline"
                  color="blue"
                  size={40}
                  style={[styles.center, { marginLeft: 20 }]}
                />
                <Text
                  allowFontScaling={false}
                  selectable={false}
                  style={[styles.center, styles.text]}>
                  Camera
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.pickImage()} style={styles.button}>
                <Ionicons
                  name="ios-photos-outline"
                  color="blue"
                  size={35}
                  style={[styles.center, { marginLeft: 20 }]}
                />
                <Text
                  allowFontScaling={false}
                  selectable={false}
                  style={[styles.center, styles.text]}>
                  Photo Library
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.cancelButton} onPress={() => this.toggleModal(false)}>
              <Text style={styles.cancelText} allowFontScaling={false} selectable={false}>
                Cancel
              </Text>
            </TouchableOpacity>
          </Modal>
          <Modal
            isVisible={this.state.locationPicker}
            style={{ flex: 1 }}
            backdropOpacity={0.3}
            animationIn="bounceIn"
            animationOut="slideOutDown">
            <View
              style={{
                flex: 1,
                backgroundColor: '#edf0f5',
              }}>
              <View
                style={{
                  alignSelf: 'stretch',
                  height: 40,
                  backgroundColor: '#eff0f5',
                }}>
                <TouchableOpacity onPress={() => this.setState({ locationPicker: false })}>
                  <Text
                    selectable={false}
                    allowFontScaling={false}
                    style={{
                      color: '#5856d6',
                      fontWeight: '600',
                      marginRight: 13,
                      marginTop: 10,
                      fontSize: 19,
                      textAlign: 'right',
                    }}>
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
              <GooglePlacesAutocomplete
                placeholder="Search For Places"
                autoFocus={false}
                returnKeyType="search"
                listViewDisplayed="auto"
                fetchDetails
                renderDescription={row => row.description}
                onPress={(data, details = null) => {
                  this.setState({
                    location: data.description,
                    geocode: {
                      latitude: details.geometry.location.lat,
                      longitude: details.geometry.location.lng,
                    },
                  });
                }}
                getDefaultValue={() => this.state.location}
                query={{
                  key: params.data.apikey,
                  language: 'en',
                }}
                styles={{
                  description: {
                    fontFamily: 'roboto',
                  },
                  textInput: {
                    fontFamily: 'roboto',
                  },
                }}
                debounce={200}
                nearbyPlacesAPI="GooglePlacesSearch"
              />
            </View>
            <MapView
              style={{
                flex: 1,
              }}
              region={{
                latitude: this.state.geocode.latitude,
                longitude: this.state.geocode.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0922 * ASPECT_RATIO,
              }}
              loadingEnabled
              provider={MapView.PROVIDER_GOOGLE}
              customMapStyle={returnMapStyle()}>
              <MapView.Marker
                coordinate={{
                  latitude: this.state.geocode.latitude,
                  longitude: this.state.geocode.longitude,
                }}
              />
            </MapView>
          </Modal>
        </KeyboardAwareScrollView>
      : <View style={styles.spinner}>
          <ActivityIndicator size="large" color="#0F5A43" />
        </View>;
  }
}

const returnGender = gender => {
  if (gender == null) {
    return 'Leave blank';
  } else return `${gender.charAt(0).toUpperCase()}${gender.slice(1)}`;
};

const returnMapStyle = () => {
  const hr = new Date().getHours();
  return hr < 18 && hr > 4 ? retro : aubergine;
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
    marginLeft: 20,
    fontWeight: '500',
    color: '#0F5A43',
    fontSize: 24,
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
    borderRadius: 22,
    height: 44,
    width: 44,
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
  modal: {
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 14,
    marginBottom: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  cancelButton: {
    backgroundColor: 'white',
    borderRadius: 14,
  },
  cancelText: {
    padding: 10,
    textAlign: 'center',
    color: '#5856d6',
    fontSize: 24,
    fontWeight: '600',
    backgroundColor: 'transparent',
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
  required: {
    color: '#ff3b30',
  },
  recommended: {
    color: '#2042a6',
  },
  edit: {
    color: 'blue',
    alignSelf: 'center',
    marginTop: 1,
    fontSize: 10,
  },
  helpText: {
    fontSize: 13,
    marginLeft: 90,
  },
  button: {
    height: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 0.3,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  center: {
    alignSelf: 'center',
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  addressInput: {
    flex: 1,
    fontFamily: 'roboto',
    fontSize: 22,
    marginHorizontal: 20,
  }
});

//picker bugs
//erroralert
//scrollindicator
//validate
//focus,touchable
//inputs , defaults
//style
//modal, props
//fs modal location
// students,tutors - map
//repermission
//mapview controls - [location,]
//unmount caching
//clear input
// no inline styles

