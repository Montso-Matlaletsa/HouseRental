import {
  Alert,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/EvilIcons';
import {houses} from '../../Database/houses';
import {RootStackParamList} from '../../navigation/RootTabs';
import {ScrollView} from 'react-native-gesture-handler';
import colors from '../../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

// @ts-ignore
const House = ({route}) => {
  const {navigate, goBack} =
    useNavigation<StackNavigationProp<RootStackParamList, 'Houses'>>();
  const {id} = route.params;
  const [user, setUser] = useState({});

  const getUser = async () => {
    const u = await AsyncStorage.getItem('users');
    // @ts-ignore
    setUser(JSON.parse(u));
  };
  const house = houses.filter((house, _i) => {
    return house.id === id;
  });

  // reserve house
  const reserve = useCallback(async () => {
    const myReserve = await AsyncStorage.getItem('reservations');
    // @ts-ignore
    houses[0].requesters.push(user.Email);

    if (!myReserve) {
      await AsyncStorage.setItem('reservations', JSON.stringify(house));
      Alert.alert('House Reserved, We wil let the owner you are interested!!');
      return;
    }

    let rev = JSON.parse(myReserve);
    // @ts-ignore
    const h = rev.filter((house, _i) => {
      return house.id === id;
    });
    if (h.length > 0) {
      Alert.alert('House is reserved already!');
      return;
    }
    rev.push(house);
    await AsyncStorage.setItem('reservations', JSON.stringify(rev));
    Alert.alert('House Reserved, We wil let the owner you are interested!!');
  }, []);

  useEffect(() => {
    getUser();
  });

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      <ImageBackground
        source={
          house[0].image
            ? house[0].image
            : require('../../assets/houses/2.jpeg')
        }
        style={styles.imageBg}>
        <Pressable style={styles.icon} onPress={goBack}>
          <Icon name="close" color={'black'} size={30} />
        </Pressable>
      </ImageBackground>

      <View
        style={{
          margin: 10,
        }}>
        <Text
          style={{
            fontWeight: '900',
            fontSize: 20,
          }}>
          {house[0].category}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
            marginTop: 10,
          }}>
          <Icon name="location" color={'blue'} size={20} />
          <Text>
            {house[0].location}, {house[0].place}
          </Text>
        </View>

        <Text
          style={{
            color: 'gray',
          }}>
          {house[0].description}
        </Text>
      </View>

      <View
        style={{
          width: '100%',
          height: 70,
          bottom: 20,
          position: 'absolute',
          flexDirection: 'row',
          margin: 10,
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}>
          <Text>
            <Text style={styles.textView}>M {house[0].price}</Text>/ Month
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon name="star" color={'#6153CC'} size={20} />
            <Text> {house[0].rating}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={reserve}
          style={{
            backgroundColor: '#6153CC',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
            marginRight: 40,
            borderRadius: 5,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: '500',
            }}>
            Reserve
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default House;

const styles = StyleSheet.create({
  icon: {
    marginTop: 10,
    marginLeft: 10,
  },
  imageBg: {
    height: 300,
    width: '100%',
  },
  textView: {
    flex: 1,
    fontWeight: '700',
    color: 'black',
  },
});
