import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SearchBar} from '@rneui/themed';
import {Card} from '@rneui/themed';
import HomeCard from '../../components/HomeCard';
import colors from '../../styles/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import I from 'react-native-vector-icons/MaterialCommunityIcons';
import IC from 'react-native-vector-icons/FontAwesome';
import sizes from '../../styles/sizes';
import NearBy from '../../components/NearBy';
import {houses} from '../../Database/houses';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootTabs';
import {StackActionHelpers, useNavigation} from '@react-navigation/native';
import TopRates from '../../components/TopRates';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '../../@types/interfaces';

const Home = () => {
  const {navigate} =
    useNavigation<StackNavigationProp<RootStackParamList, 'AppTabs'>>();

  const [user, setUser] = useState<User>();
  const getUser = async () => {
    const user = await AsyncStorage.getItem('users');
    // @ts-ignore
    setUser(JSON.parse(user));
  };
  const nearByData = houses.filter((house, _i) => {
    return house.location === user?.location;
  });

  const top = houses.sort(function (a, b) {
    return a.rating - b.rating;
  });

  const onPress = useCallback((category: string) => {
    // @ts-ignore
    navigate('Houses', {
      category,
    });
  }, []);

  useEffect(() => {
    getUser();
  });

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.gray5,
        height: '100%',
        padding: 10,
      }}>
      <SearchBar
        lightTheme
        showCancel
        round
        containerStyle={styles.SearchBar}
        placeholder="Where are you going?"
      />
      <ScrollView
        style={{
          marginBottom: 50,
        }}>
        <View style={styles.CardContainer}>
          <HomeCard
            category="Hotel"
            Icon={<Icon name="hotel" size={sizes.md} color={'blue'} />}
            available={154}
            onPress={() => onPress('hotel')}
          />
          <HomeCard
            category="Duplex"
            Icon={<IC name="medium" size={sizes.md} color={'blue'} />}
            available={48}
            onPress={() => onPress('duplex')}
          />
        </View>

        <View style={styles.CardContainer}>
          <HomeCard
            category="One Room"
            Icon={<Icon name="single-bed" size={sizes.md} color={'blue'} />}
            available={154}
            onPress={() => onPress('single')}
          />
          <HomeCard
            category="Two Room"
            Icon={<I name="bed-double" size={sizes.md} color={'blue'} />}
            available={48}
            onPress={() => onPress('double')}
          />
        </View>

        <Text
          style={{
            marginLeft: 10,
            marginTop: 20,
            fontWeight: '700',
          }}>
          Nearby
        </Text>

        <FlatList
          data={nearByData.slice(0, 4)}
          renderItem={({item}) => <NearBy {...item} />}
          numColumns={2}
        />

        <Text
          style={{
            marginLeft: 10,
            marginTop: 20,
            fontWeight: '700',
          }}>
          Top Rated
        </Text>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={top.slice(0, 5)}
          renderItem={({item}) => (
            <TopRates {...item} onPress={() => console.log('pressed')} />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  SearchBar: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  CardContainer: {
    flexDirection: 'row',
    flex: 2,
  },
});
