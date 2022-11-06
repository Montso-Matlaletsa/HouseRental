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
  rating: number;
}

const TopRates: FC<HouseListingProps> = ({
  id,
  category,
  price,
  location,
  place,
  onPress,
  image,
  rating,
}) => {
  return (
    // @ts-ignore
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={image} style={styles.image} resizeMode={'cover'} />

      <View style={{flexDirection: 'row', margin: 10}}>
        <Text>
          <Text style={styles.textView}>M {price}</Text>/ Month
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
    width: 200,
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

export default TopRates;
