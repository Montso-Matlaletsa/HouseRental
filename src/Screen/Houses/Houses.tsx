import {View, Text, StyleSheet, Pressable, FlatList} from 'react-native';
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
const Houses = () => {
  const {navigate, goBack} =
    useNavigation<StackNavigationProp<RootStackParamList, 'Houses'>>();
  const route = useRoute();
  // @ts-ignore
  const {category} = route.params;

  const list = houses.filter((house, _i) => {
    if (!category) return house;
    return house.category === category;
  });

  const routeToHouse = useCallback((id: number) => {
    // @ts-ignore
    navigate('House', {
      id,
    });
  }, []);

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.gray,
      }}>
      <Pressable style={styles.icon} onPress={goBack}>
        <Icon name="close" color={'black'} size={30} />
      </Pressable>
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
    </View>
  );
};

export default Houses;

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
