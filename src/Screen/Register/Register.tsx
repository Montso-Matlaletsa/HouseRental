import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/EvilIcons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootTabs';
import {Formik} from 'formik';
import TextInput from '../../components/TextInput/TextInput';
import SelectDropdown from 'react-native-select-dropdown';
import {User} from '../../@types/interfaces';
import users from '../../Database/users.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = () => {
  const {navigate, goBack} =
    useNavigation<StackNavigationProp<RootStackParamList, 'Register'>>();
  const countries = [
    'Leribe',
    'Maseru',
    'Berea',
    'Mafeteng',
    'Butha-Buthe',
    'Thaba-Tseka',
    'Mokhotlong',
    'Quthing',
    'Qachas Nek',
  ];
  const [location, setLocation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (email: string, password: string) => {
    const storage = await AsyncStorage.getItem('users');
    const users = storage != null ? JSON.parse(storage) : null;

    if (users !== null) {
      if (users.Email !== email) {
        Alert.alert('Incorrect Credentials, Please try again!');
        setLoading(false);
        return;
      }

      if (users.password !== password) {
        Alert.alert('Incorrect Credentials, Please try again!');
        setLoading(false);
        return;
      }

      await AsyncStorage.setItem('user', JSON.stringify(users));
      setLoading(false);
      navigate('AppTabs');
    }
  };

  const register = async (user: User) => {
    setLoading(true);
    if (!user.Full_Name) {
      Alert.alert('Please Enter all fields');
      setLoading(false);
      return;
    }
    try {
      const users = JSON.stringify(user);
      await AsyncStorage.mergeItem('users', users);
      const u = await AsyncStorage.getItem('users');

      login(user.Email, user.password);
    } catch (err) {
      console.log({err});
      setLoading(false);
    }
  };
  return (
    <ScrollView
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      <Pressable style={styles.icon} onPress={goBack}>
        <Icon name="chevron-left" color={'black'} size={40} />
      </Pressable>

      <Text
        style={{
          textAlign: 'center',
          fontSize: 25,
          fontWeight: '700',
        }}>
        House Rental
      </Text>
      <Image
        source={require('../../assets/2.jpeg')}
        style={{
          height: 200,
          width: '90%',
          margin: 10,
          alignSelf: 'center',
          marginBottom: 50,
        }}
      />
      <KeyboardAvoidingView>
        <Formik
          initialValues={{email: '', password: '', names: ''}}
          onSubmit={values => {
            const {names, email, password} = values;
            register({
              Full_Name: names,
              Email: email,
              password,
              location,
            });
          }}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View>
              <TextInput
                onChange={handleChange('names')}
                icon={'user'}
                placeholder={'Full Names'}
                value={values.names}
                onBlur={handleBlur('names')}
              />
              <TextInput
                onChange={handleChange('email')}
                icon={'envelope'}
                placeholder={'Email'}
                value={values.email}
                onBlur={handleBlur('email')}
              />

              <SelectDropdown
                searchPlaceHolder="District"
                dropdownIconPosition="right"
                renderDropdownIcon={() => (
                  <Icon name={'chevron-down'} color={'#6153CC'} size={35} />
                )}
                data={countries}
                onSelect={(selectedItem, index) => {
                  setLocation(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                buttonStyle={{
                  width: '90%',
                  marginLeft: 20,
                  marginRight: 20,
                  borderColor: '#6153CC',
                  marginBottom: 10,
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderRadius: 5,
                }}
              />

              <TextInput
                onChange={handleChange('password')}
                icon={'lock'}
                placeholder={'Password'}
                secure
                value={values.password}
                onBlur={handleBlur('password')}
              />

              <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  backgroundColor: '#6153CC',
                  marginLeft: 20,
                  marginRight: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 50,
                  borderRadius: 5,
                }}>
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      fontWeight: '500',
                    }}>
                    Register
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 50,
          }}>
          <Text>Already have Account?</Text>
          <TouchableOpacity
            onPress={goBack}
            style={{
              marginLeft: 10,
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              borderRadius: 5,
            }}>
            <Text
              style={{
                color: '#6153CC',
                fontSize: 17,
                fontWeight: '500',
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  icon: {
    width: '100%',
    marginTop: 10,
    marginLeft: 10,
  },
});
