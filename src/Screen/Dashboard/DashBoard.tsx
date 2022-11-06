import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootTabs';
import {Tab, TabView} from '@rneui/base';
import {houses} from '../../Database/houses';
import NearBy from '../../components/NearBy';

const DashBoard = () => {
  const {goBack, navigate} =
    useNavigation<StackNavigationProp<RootStackParamList, 'AppTabs'>>();
  const routeToAddHouse = useCallback(() => navigate('AddHouse'), []);
  const [index, setIndex] = React.useState(0);
  const [user, setUser] = useState({});
  const [requests, setRequests] = useState({});

  const getUser = async () => {
    const u = await AsyncStorage.getItem('users');
    // @ts-ignore
    setUser(JSON.parse(u));
  };

  const getRequests = async () => {
    const y = houses.filter((house, _i) => {
      // @ts-ignore
      return house.landlord === user?.Email;
    });
    console.log(y[0].requesters);
  };

  const nearByData = houses.filter((house, _i) => {
    // @ts-ignore
    return house.landlord === user?.Email;
  });

  useEffect(() => {
    getRequests();
    getUser();
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 20,
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <TouchableOpacity
            onPress={goBack}
            style={{
              backgroundColor: '#6153CC',
              alignItems: 'center',
              justifyContent: 'center',

              marginTop: 20,
              height: 50,
              borderRadius: 5,
              flex: 1,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '500',
              }}>
              Listings
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
          }}>
          <TouchableOpacity
            onPress={routeToAddHouse}
            style={{
              width: 50,
              backgroundColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'flex-end',
              marginTop: 20,
              height: 50,
              borderRadius: 5,
            }}>
            <Icon name="add" size={30} />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          marginLeft: 20,
          marginRight: 20,
        }}>
        <Tab
          value={index}
          onChange={e => setIndex(e)}
          indicatorStyle={{
            backgroundColor: 'white',
            height: 1,
          }}
          style={{
            backgroundColor: 'white',
          }}
          variant="primary">
          <Tab.Item
            title="My Listing"
            titleStyle={{fontSize: 12, color: 'black'}}
          />
          <Tab.Item
            title="Requests"
            titleStyle={{fontSize: 12, color: 'black'}}
          />
          <Tab.Item
            title="Approved"
            titleStyle={{fontSize: 12, color: 'black'}}
          />
        </Tab>

        <TabView value={index} onChange={setIndex} animationType="spring">
          <TabView.Item style={{width: '100%'}}>
            <View>
              <Text>{nearByData.length}</Text>
              {nearByData.map((h, i) => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <Image
                    source={require('../../assets/houses/2.jpeg')}
                    style={{
                      flex: 1,
                      width: 50,
                      height: 70,
                    }}
                  />

                  <View
                    style={{
                      flex: 2,
                      flexDirection: 'column',
                      marginLeft: 10,
                    }}>
                    <Text
                      style={{
                        fontWeight: '700',
                      }}>
                      {h.category}
                    </Text>
                    <Text>@{h.place}</Text>
                    <Text>M {h.price}</Text>
                  </View>
                </View>
              ))}
            </View>
          </TabView.Item>
          <TabView.Item style={{backgroundColor: 'blue', width: '100%'}}>
            <Text>Favorite</Text>
          </TabView.Item>
          <TabView.Item style={{backgroundColor: 'green', width: '100%'}}>
            <Text>Cart</Text>
          </TabView.Item>
        </TabView>
      </View>
    </SafeAreaView>
  );
};

export default DashBoard;

const styles = StyleSheet.create({});
