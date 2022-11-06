import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';

interface NearByProps {
  category: string;
  image: string;
  place: string;
}
export const NearBy: FC<NearByProps> = ({category, image, place}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageView}>
        <Image
          // @ts-ignore
          source={image}
          resizeMode={'cover'}
          style={{
            width: 60,
            height: 60,
          }}
        />
      </View>

      <View style={styles.imageView}>
        <Text
          style={{
            fontWeight: '700',
          }}>
          {category}
        </Text>
        <Text>@{place}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    flex: 1,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageView: {
    flex: 1,
  },
});
