import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {FC} from 'react';
import {Image} from '@rneui/base';
import Icon from 'react-native-vector-icons/EvilIcons';

interface HouseListingProps {
  id: number;
  category: string;
  price: number;
  location: string;
  place: string;
  onPress: (id: number) => void;
  image: any;
}

const HouseListing: FC<HouseListingProps> = ({
  id,
  category,
  price,
  location,
  place,
  onPress,
  image,
}) => {
  return (
    // @ts-ignore
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={image ? image : require('../../assets/houses/2.jpeg')}
        style={styles.image}
        resizeMode={'cover'}
      />

      <View style={{flexDirection: 'row', margin: 10}}>
        <Text
          style={{flex: 2, fontWeight: '700', color: 'black', fontSize: 16}}>
          {category}
        </Text>
        <Text>
          <Text style={styles.textView}>M {price}</Text>/ Month
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginLeft: 10,
          alignItems: 'center',
          marginBottom: 15,
        }}>
        <Icon name="location" color={'blue'} size={20} />
        <Text>
          {location}, {place}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  image: {
    height: 200,
    width: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  textView: {
    flex: 1,
    fontWeight: '700',
    color: 'black',
  },
});

export default HouseListing;
