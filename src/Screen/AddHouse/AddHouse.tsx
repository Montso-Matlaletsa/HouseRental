import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/EvilIcons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootTabs';
import {Formik} from 'formik';
import TextInput from '../../components/TextInput/TextInput';
import SelectDropdown from 'react-native-select-dropdown';
import {House, User} from '../../@types/interfaces';
import users from '../../Database/users.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../styles/colors';
import {houses} from '../../Database/houses';

const AddHouse = () => {
  const {navigate, goBack} =
    useNavigation<StackNavigationProp<RootStackParamList, 'Register'>>();
  const countries = [
    'Leribe',
    'Maseru',
    'Berea',
    'Mafeteng',
    'Butha-Buthe',
    'Thaba-Tseka',
    'Mokhotlong',
    'Quthing',
    'Qachas Nek',
  ];

  const categories = ['Duplex', 'Single Room', 'Double Room', 'Hotel'];
  const [location, setLocation] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState({});

  const getUser = async () => {
    const u = await AsyncStorage.getItem('users');
    // @ts-ignore
    setUser(JSON.parse(u));
  };

  const add = async (house: House) => {
    setLoading(true);
    if (!house.description) {
      Alert.alert('Please Enter all fields');
      setLoading(false);
      return;
    }
    let last = houses[houses.length - 1];
    house.id = last.id + 1;
    console.log('First Leng', houses.length);
    console.log(house.id);

    // @ts-ignore
    houses.push(house);
    console.log('After Leng', houses.length);

    setLoading(false);
  };

  useEffect(() => {
    getUser();
  });
  return (
    <SafeAreaView
      style={{
        height: '100%',
        backgroundColor: colors.gray,
      }}>
      <Pressable style={styles.icon} onPress={goBack}>
        <Icon name="chevron-left" color={'black'} size={40} />
      </Pressable>

      <Text
        style={{
          textAlign: 'center',
          fontSize: 25,
          fontWeight: '700',
          marginBottom: 100,
        }}>
        Add House
      </Text>

      <KeyboardAvoidingView>
        <Formik
          initialValues={{
            price: '',
            place: '',
            status: 'available',
            landlord: '',
            description: '',
            rating: 0,
          }}
          onSubmit={values => {
            const {price, place, status, landlord, description, rating} =
              values;

            add({
              price,
              place,
              status,
              rating,
              description,
              id: parseInt(price + place),
              category,
              location,
              // @ts-ignore
              landlord: user.Email,
              // @ts-ignore
              image: undefined,
            });
          }}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View>
              <TextInput
                onChange={handleChange('price')}
                icon={'credit-card'}
                placeholder={'Price per Month'}
                value={values.price}
                onBlur={handleBlur('price')}
                type={'numeric'}
              />

              <SelectDropdown
                searchPlaceHolder="District"
                dropdownIconPosition="right"
                renderDropdownIcon={() => (
                  <Icon name={'chevron-down'} color={'#6153CC'} size={35} />
                )}
                data={categories}
                onSelect={(selectedItem, index) => {
                  setCategory(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                buttonStyle={{
                  width: '90%',
                  marginLeft: 20,
                  marginRight: 20,
                  borderColor: '#6153CC',
                  marginBottom: 10,
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderRadius: 5,
                }}
              />

              <SelectDropdown
                searchPlaceHolder="District"
                dropdownIconPosition="right"
                renderDropdownIcon={() => (
                  <Icon name={'chevron-down'} color={'#6153CC'} size={35} />
                )}
                data={countries}
                onSelect={(selectedItem, index) => {
                  setLocation(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                buttonStyle={{
                  width: '90%',
                  marginLeft: 20,
                  marginRight: 20,
                  borderColor: '#6153CC',
                  marginBottom: 10,
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderRadius: 5,
                }}
              />

              <TextInput
                onChange={handleChange('place')}
                icon={'location'}
                placeholder={'Place'}
                value={values.place}
                onBlur={handleBlur('place')}
              />
              <TextInput
                onChange={handleChange('description')}
                icon={'pencil'}
                placeholder={'Description'}
                value={values.description}
                onBlur={handleBlur('description')}
                height={80}
                multiline
                lines={10}
              />

              <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  backgroundColor: '#6153CC',
                  marginLeft: 20,
                  marginRight: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 50,
                  borderRadius: 5,
                }}>
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      fontWeight: '500',
                    }}>
                    Add
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddHouse;

const styles = StyleSheet.create({
  icon: {
    width: '100%',
    marginTop: 10,
    marginLeft: 10,
  },
});
