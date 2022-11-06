import {
  View,
  Text,
  Image,
  Button,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Formik} from 'formik';
import TextInput from '../../components/TextInput/TextInput';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const {navigate} =
    useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>();
  const [loading, setLoading] = useState<boolean>(false);

  const routeToRegister = useCallback(() => navigate('Register'), []);

  const checkUser = async () => {
    const user = await AsyncStorage.getItem('user');
    if (user !== null) navigate('AppTabs');
  };

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

  useEffect(() => {
    checkUser();
  });
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
      }}>
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
          initialValues={{email: '', password: ''}}
          onSubmit={values => {
            login(values.email, values.password);
          }}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View>
              <TextInput
                onChange={handleChange('email')}
                icon={'envelope'}
                placeholder={'Email'}
                value={values.email}
                onBlur={handleBlur('email')}
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
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    fontWeight: '500',
                  }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text>Don't have Account?</Text>
          <TouchableOpacity
            onPress={routeToRegister}
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
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
