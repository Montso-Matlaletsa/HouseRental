import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/EvilIcons';
import colors from '../../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useNavigation,
  NavigationHelpersContext,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootTabs';

export default function Profile() {
  const [user, setUser] = useState({
    Full_Name: '',
    Email: '',
    location: '',
  });
  const [reservations, setReservations] = useState<number>(0);
  const {navigate} =
    useNavigation<StackNavigationProp<RootStackParamList, 'AppTabs'>>();

  const routeToDashBoard = useCallback(() => navigate('Dashboard'), []);

  const getReservations = async () => {
    const myRes = await AsyncStorage.getItem('reservations');
    const res = myRes != null ? JSON.parse(myRes).length : 0;
    // @ts-ignore
    setReservations(res);
  };

  const getUser = async () => {
    const storage = await AsyncStorage.getItem('user');
    const user = storage !== null ? storage : null;

    if (user === null) {
      navigate('Login');
      return;
    }
    setUser(JSON.parse(user));
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
  };

  useEffect(() => {
    getUser();
    getReservations();
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: '100%',
      }}>
      <Image
        source={require('../../assets/profile.jpeg')}
        style={{
          height: 200,
          width: '90%',
          alignSelf: 'center',
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          marginLeft: 20,
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Icon name={'user'} color={'#6153CC'} size={30} />
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
          }}>
          {user?.Full_Name}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginLeft: 20,
          marginTop: 10,
          alignItems: 'center',
        }}>
        <Icon name={'envelope'} color={'#6153CC'} size={30} />
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
          }}>
          {user.Email}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginLeft: 20,
          marginTop: 10,
          alignItems: 'center',
        }}>
        <Icon name={'location'} color={'#6153CC'} size={30} />
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
          }}>
          {user.location}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: colors.gray3,
          height: 70,
          margin: 20,
          flexDirection: 'column',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              flex: 1,
              textAlign: 'center',
              marginTop: 5,
            }}>
            Reservations
          </Text>

          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              flex: 1,
              textAlign: 'center',
              marginTop: 5,
            }}>
            Approved
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '900',
              flex: 1,
              textAlign: 'center',
              marginTop: 5,
              color: '#6153CC',
            }}>
            {reservations}
          </Text>

          <Text
            style={{
              fontSize: 20,
              fontWeight: '900',
              flex: 1,
              textAlign: 'center',
              marginTop: 5,
              color: '#6153CC',
            }}>
            0
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={routeToDashBoard}
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
          Seller Dashboard
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={logout}
        style={{
          backgroundColor: 'red',
          marginLeft: 20,
          marginRight: 20,
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
          borderRadius: 5,
          position: 'absolute',
          bottom: 100,
          width: '90%',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: '500',
          }}>
          Logout
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
