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
import { LinearGradient, ImagePicker, MapView, Location, Permissions } from 'expo';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import TagInput from '../../util/react-native-tag-input';
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
    gradePicker: false,
    subjectPicker: false,
    tagInput: false,
    mapStyle: retro,
    mapType: 'standard',
    /* to db */
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
    grade: 'Other',
    subject: 'Languages',
    tags: [],
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
        .country}`.replace('undefined', '');
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

  async setLocation(e) {
    const locationData = await Location.reverseGeocodeAsync({
      latitude: e.coordinate.latitude,
      longitude: e.coordinate.longitude,
    });
    const location = `${locationData[0].name}, ${locationData[0].street}, ${locationData[0]
      .city}-${locationData[0].postalCode}, ${locationData[0].region}, ${locationData[0]
      .country}`.replace('undefined', '');
    this.setState({
      geocode: {
        latitude: e.coordinate.latitude,
        longitude: e.coordinate.longitude,
      },
      location,
    });
  }

  async locate() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      const geocode = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      const locationData = await Location.reverseGeocodeAsync({
        latitude: geocode.coords.latitude,
        longitude: geocode.coords.longitude,
      });
      const location = `${locationData[0].name}, ${locationData[0].street}, ${locationData[0]
        .city}-${locationData[0].postalCode}, ${locationData[0].region}, ${locationData[0]
        .country}`.replace('undefined', '');
      this.setState({
        geocode: geocode.coords,
        location,
      });
    }
  }

  render() {
    /* */
    const pickerList = (
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={this.state.age}
        onValueChange={(itemValue, itemIndex) => this.setState({ age: itemValue })}>
        <Picker.Item label="Below 7" value="< 7" />
        <Picker.Item label="7" value="7" />
        <Picker.Item label="8" value="8" />
        <Picker.Item label="9" value="9" />
        <Picker.Item label="10" value="10" />
        <Picker.Item label="11" value="11" />
        <Picker.Item label="12" value="12" />
        <Picker.Item label="13" value="13" />
        <Picker.Item label="14" value="14" />
        <Picker.Item label="15" value="15" />
        <Picker.Item label="16" value="16" />
        <Picker.Item label="17" value="17" />
        <Picker.Item label="18" value="18" />
        <Picker.Item label="19" value="19" />
        <Picker.Item label="20" value="20" />
        <Picker.Item label="21" value="21" />
        <Picker.Item label="22" value="22" />
        <Picker.Item label="23" value="23" />
        <Picker.Item label="24" value="24" />
        <Picker.Item label="25" value="25" />
        <Picker.Item label="26" value="26" />
        <Picker.Item label="27" value="27" />
        <Picker.Item label="28" value="29" />
        <Picker.Item label="30" value="30" />
        <Picker.Item label="31" value="31" />
        <Picker.Item label="32" value="32" />
        <Picker.Item label="33" value="33" />
        <Picker.Item label="34" value="34" />
        <Picker.Item label="35" value="35" />
        <Picker.Item label="36" value="36" />
        <Picker.Item label="37" value="37" />
        <Picker.Item label="38" value="38" />
        <Picker.Item label="39" value="39" />
        <Picker.Item label="40" value="40" />
        <Picker.Item label="41" value="41" />
        <Picker.Item label="42" value="42" />
        <Picker.Item label="43" value="43" />
        <Picker.Item label="44" value="44" />
        <Picker.Item label="45" vale="45" />
        <Picker.Item label="46" value="46" />
        <Picker.Item label="47" value="47" />
        <Picker.Item label="48" value="48" />
        <Picker.Item label="49" value="49" />
        <Picker.Item label="50" value="50" />
        <Picker.Item label="51" value="51" />
        <Picker.Item label="52" value="52" />
        <Picker.Item label="53" value="53" />
        <Picker.Item label="54" value="54" />
        <Picker.Item label="55" value="55" />
        <Picker.Item label="56" value="56" />
        <Picker.Item label="57" value="57" />
        <Picker.Item label="58" value="58" />
        <Picker.Item label="59" value="59" />
        <Picker.Item label="60" value="60" />
        <Picker.Item label="61" value="61" />
        <Picker.Item label="62" value="62" />
        <Picker.Item label="63" value="63" />
        <Picker.Item label="64" value="64" />
        <Picker.Item label="65" value="65" />
        <Picker.Item label="66" value="66" />
        <Picker.Item label="67" value="67" />
        <Picker.Item label="68" value="68" />
        <Picker.Item label="69" value="69" />
        <Picker.Item label="70" value="70" />
        <Picker.Item label="71" value="71" />
        <Picker.Item label="72" value="72" />
        <Picker.Item label="73" value="73" />
        <Picker.Item label="74" value="74" />
        <Picker.Item label="75" value="75" />
        <Picker.Item label="76" value="76" />
        <Picker.Item label="77" value="77" />
        <Picker.Item label="78" value="78" />
        <Picker.Item label="79" value="79" />
        <Picker.Item label="80" value="80" />
        <Picker.Item label="81" value="81" />
        <Picker.Item label="82" value="82" />
        <Picker.Item label="83" value="83" />
        <Picker.Item label="84" value="84" />
        <Picker.Item label="85" value="85" />
        <Picker.Item label="86" value="86" />
        <Picker.Item label="87" value="87" />
        <Picker.Item label="88" value="88" />
        <Picker.Item label="89" value="89" />
        <Picker.Item label="90" value="90" />
        <Picker.Item label="91" value="91" />
        <Picker.Item label="92" value="92" />
        <Picker.Item label="93" value="93" />
        <Picker.Item label="94" value="94" />
        <Picker.Item label="95" value="95" />
        <Picker.Item label="96" value="96" />
        <Picker.Item label="97" value="97" />
        <Picker.Item label="98" value="98" />
        <Picker.Item label="99" value="99" />
        <Picker.Item label="Above 99" value="> 99" />
      </Picker>
    );
    /* */

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
                {pickerList}
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
          <TouchableOpacity
            style={styles.section}
            onPress={() => this.setState({ gradePicker: !this.state.gradePicker })}>
            <Text style={styles.label}>
              <Text selectable={false} allowFontScaling={false}>
                Grade / Year
              </Text>
              <Text selectable={false} allowFontScaling={false} style={styles.required}>
                *
              </Text>
            </Text>
            <Text
              allowFontScaling={false}
              selectable={false}
              style={styles.text}
              onPress={() => this.setState({ gradePicker: !this.state.gradePicker })}>
              {this.state.grade}
            </Text>
          </TouchableOpacity>
          {this.state.gradePicker && !this.state.subjectPicker
            ? null
            : <View style={styles.border} />}
          {this.state.gradePicker && !this.state.subjectPicker
            ? <LinearGradient colors={['white', '#FDF760']}>
                <Picker
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  selectedValue={this.state.grade}
                  onValueChange={(itemValue, itemIndex) => this.setState({ grade: itemValue })}>
                  <Picker.Item label="Grade 1" value="Grade 1" />
                  <Picker.Item label="Grade 2" value="Grade 2" />
                  <Picker.Item label="Grade 3" value="Grade 3" />
                  <Picker.Item label="Grade 4" value="Grade 4" />
                  <Picker.Item label="Grade 5" value="Grade 5" />
                  <Picker.Item label="Grade 6" value="Grade 6" />
                  <Picker.Item label="Grade 7" value="Grade 7" />
                  <Picker.Item label="Grade 8" value="Grade 8" />
                  <Picker.Item label="Grade 9" value="Grade 9" />
                  <Picker.Item label="Grade 10" value="Grade 10" />
                  <Picker.Item label="Grade 11" value="Grade 11" />
                  <Picker.Item label="Grade 12" value="Grade 12" />
                  <Picker.Item label="University Level" value="University Level" />
                  <Picker.Item label="Adult Learner" value="Adult Learner" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
                <View style={styles.border} />
              </LinearGradient>
            : null}
          <TouchableOpacity
            style={styles.section}
            onPress={() => this.setState({ subjectPicker: !this.state.subjectPicker })}>
            <Text style={styles.label}>
              <Text allowFontScaling={false} selectable={false}>
                Subject
              </Text>
              <Text allowFontScaling={false} selectable={false} style={styles.required}>
                *
              </Text>
            </Text>
            <Text allowFontScaling={false} selectable={false} style={styles.text}>
              {this.state.subject}
            </Text>
          </TouchableOpacity>
          {this.state.subjectPicker && !this.state.gradePicker
            ? null
            : <View style={styles.border} />}
          {this.state.subjectPicker && !this.state.gradePicker
            ? <View>
                <LinearGradient colors={['white', '#FDF760']}>
                  <Picker
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    selectedValue={this.state.subject}
                    onValueChange={(itemValue, itemIndex) => this.setState({ subject: itemValue })}>
                    <Picker.Item label="" value="" />
                    <Picker.Item label="" value="" />
                    <Picker.Item label="" value="" />
                  </Picker>
                </LinearGradient>
                <View style={styles.border} />
              </View>
            : null}
          <TouchableOpacity
            style={styles.section}
            onPress={() => this.setState({ tagInput: !this.state.tagInput })}>
            <Text style={styles.label}>
              <Text allowFontScaling={false} selectable={false}>
                Tags
              </Text>
              <Text allowFontScaling={false} selectable={false} style={styles.recommended}>
                *
              </Text>
            </Text>
            <Text
              style={[styles.textInput, { height: null, fontSize: 16, color: 'white' }]}
              numberOfLines={1}
              allowFontScaling={false}
              selectable={false}
              ellipsizeMode="tail">
              {this.state.tags.map((tag, i) =>
                <Text key={i}>
                  <Text style={{ backgroundColor: 'rgba(15,90,67,0.75)' }}>
                    &nbsp;&times;&nbsp;{tag}&nbsp;
                  </Text>
                  &nbsp;,&nbsp;
                </Text>
              )}
            </Text>
          </TouchableOpacity>
          {this.state.tagInput ? null : <View style={[styles.border, { marginBottom: 40 }]} />}
          {this.state.tagInput
            ? <View>
                <TagInput
                  onChange={tags => this.setState({ tags })}
                  value={this.state.tags}
                  inputProps={{
                    style: [
                      styles.addressInput,
                      {
                        fontSize: 22,
                        borderBottomWidth: 0.3,
                        borderBottomColor: 'black',
                      },
                    ],
                    placeholder: 'Tags are separated by commas or spaces',
                    placeholderTextColor: '#8a8a92',
                    placeholderStyle: { fontSize: 14 },
                    selectionColor: '#FDF760',
                  }}
                  tagTextStyle={{
                    fontFamily: 'roboto',
                    fontSize: 18,
                  }}
                  tagColor="rgba(15,90,67,0.75)"
                  tagTextColor="white"
                  tagContainerStyle={{
                    borderRadius: 25,
                  }}
                />
                <Text
                  allowFontScaling={false}
                  style={{
                    alignSelf: 'center',
                    borderTopWidth: 1,
                    borderTopColor: 'black',
                  }}>
                  Example:
                </Text>
                <View style={[styles.border, { marginBottom: 40 }]} />
              </View>
            : null}

          <Text allowFontScaling={false} selectable={false} style={styles.title}>
            CONTACT
          </Text>
          <View style={styles.border} />
          <View style={styles.section}>
            <Text style={styles.label}>
              <Text allowFontScaling={false} selectable={false}>
                Phone Number
              </Text>
              <Text allowFontScaling={false} selectable={false} style={styles.recommended}>
                *
              </Text>
            </Text>
            <TextInput
              style={styles.textInput}
              placeholderTextColor="#8a8a92"
              selectionColor="#FDF760"
            />
          </View>
          <View style={styles.border} />
          <View style={styles.section}>
            <Text style={styles.label}>
              <Text allowFontScaling={false} selectable={false}>
                E-mail
              </Text>
              <Text allowFontScaling={false} selectable={false} style={styles.recommended}>
                *
              </Text>
            </Text>
            <TextInput
              style={styles.textInput}
              placeholderTextColor="#8a8a92"
              selectionColor="#FDF760"
            />
          </View>
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
                placeholder="Search for places..."
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
                latitudeDelta: 0.0922 / 8,
                longitudeDelta: 0.0922 / 8 * ASPECT_RATIO,
              }}
              loadingEnabled
              loadingIndicatorColor="#0F5A43"
              provider={MapView.PROVIDER_GOOGLE}
              showsMyLocationButton={false}
              customMapStyle={aubergine}
              mapType={this.state.mapType}
              onPress={e => this.setLocation(e.nativeEvent)}>
              <MapView.Marker
                title="You"
                coordinate={{
                  latitude: this.state.geocode.latitude,
                  longitude: this.state.geocode.longitude,
                }}
                draggable
                onDragEnd={e => this.setLocation(e.nativeEvent)}>
                <Image
                  source={require('../../assets/icons/flag-blue.png')}
                  style={{ height: 60, width: 60 }}
                />
              </MapView.Marker>
              <TouchableOpacity
                style={[styles.overlays, { right: 108 }]}
                onPress={() => this.locate()}>
                <Ionicons name="ios-locate" color="#02b21f" size={35} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.overlays, { right: 61 }]}>
                <Ionicons name="ios-moon" color="#fa661e" size={35} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.overlays, { right: 12 }]}
                onPress={() =>
                  this.setState({
                    mapType: this.state.mapType === 'standard' ? 'hybrid' : 'standard',
                  })}>
                <Ionicons name="ios-globe" color="#007aff" size={33} />
              </TouchableOpacity>
            </MapView>
          </Modal>
        </KeyboardAwareScrollView>
      : <View style={styles.spinner}>
          <ActivityIndicator size="large" color="#0F5A43" />
        </View>;
  }
}

const returnGender = gender =>
  gender == null ? 'Leave blank' : `${gender.charAt(0).toUpperCase()}${gender.slice(1)}`;

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
  },
  overlays: {
    position: 'absolute',
    bottom: 4,
    opacity: 0.9,
  },
  tag: {
    justifyContent: 'center',
    marginTop: 3,
    marginRight: 3,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 25,
    backgroundColor: 'rgba(15,90,67,0.75)',
  },
});

//picker bugs
//erroralert
//scrollindicator
//validate
//focus,touchable
//inputs , defaults
//styles
//modal, props, style
// students,tutors - map
//permission
//mapview controls - [location,style,maptype], icon,buttons
//undefined
//unmount caching
//clear input
// no inline styles
//disable gestures on modal
//dp in marker
//exif
//picker open
//tag autocomplete

//onpress marker evaluating to onpress view - issue

//taginput, tags, update prs, center, style to tags, focus, typestyle, scroll ,style
//keyboard dismiss

//dark/light keyboard
//oauth prefill
