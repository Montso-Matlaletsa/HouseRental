import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {useCallback} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/RootTabs';
import {StackNavigationProp} from '@react-navigation/stack';
import {SearchBar} from '@rneui/themed';
import Icon from 'react-native-vector-icons/EvilIcons';
import HouseListing from '../../components/HouseListing/HouseListing';
import colors from '../../styles/colors';
import {houses} from '../../Database/houses';
// @ts-ignore
const Explore = () => {
  const {navigate, goBack} =
    useNavigation<StackNavigationProp<RootStackParamList, 'AppTabs'>>();

  const list = houses;

  const routeToHouse = useCallback((id: number) => {
    // @ts-ignore
    navigate('House', {
      id,
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.gray5,
        height: '100%',
        padding: 10,
        marginBottom: 50,
      }}>
      <SearchBar
        lightTheme
        showCancel
        round
        containerStyle={styles.SearchBar}
        placeholder="Where are you going?"
      />

      <FlatList
        data={list}
        renderItem={({item}) => (
          <HouseListing {...item} onPress={() => routeToHouse(item.id)} />
        )}
      />
    </SafeAreaView>
  );
};

export default Explore;

const styles = StyleSheet.create({
  SearchBar: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  icon: {
    width: '100%',
    marginTop: 10,
    marginLeft: 10,
  },
});
