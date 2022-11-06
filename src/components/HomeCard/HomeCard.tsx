import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, {
  ElementType,
  FC,
  ReactComponentElement,
  ReactElement,
  ReactNode,
} from 'react';
import {Card} from '@rneui/themed';
import sizes from '../../styles/sizes';
import colors from '../../styles/colors';
import TextV2 from '../TextV2';

interface HomeCardProps {
  category: string;
  available: number;
  Icon: ReactNode;
  onPress: (category: string) => void;
}
const HomeCard: FC<HomeCardProps> = ({onPress, category, available, Icon}) => {
  return (
    // @ts-ignore
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.cardStyle}>
        <View style={styles.icon}>{Icon}</View>

        <View style={styles.textView}>
          <Text
            style={{
              fontWeight: '700',
            }}>
            {category}
          </Text>
          <Text>{available} items</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 70,
    marginHorizontal: 10,
    marginTop: 20,
    maxWidth: '50%',
  },
  cardStyle: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: 'transparent',
    borderRadius: 5,
    padding: 15,
    backgroundColor: colors.white,
  },
  icon: {
    flex: 1,
    marginRight: 10,
  },
  textView: {
    flexDirection: 'column',
    flex: 2,
    marginVertical: 0,
  },
});

export default HomeCard;
