import {NavigationContainer} from '@react-navigation/native';
import React, {FC} from 'react';
import Houses from '../Screen/Houses';
import spaces from '../styles/spaces';
import AppTabs from './AppTabs';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import House from '../Screen/House';
import Login from '../Screen/Login';
import Register from '../Screen/Register';
import DashBoard from '../Screen/Dashboard';
import AddHouse from '../Screen/AddHouse';

export type RootStackParamList = {
  AppTabs: undefined;
  Houses: undefined;
  House: undefined;
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
  AddHouse: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const RootTabs: FC = () => {
  //

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={'Login'}
        screenOptions={{
          headerShown: false,
          headerTransparent: true,
          headerLeftContainerStyle: {
            marginHorizontal: spaces.md,
          },
          headerRightContainerStyle: {
            marginHorizontal: spaces.md,
          },
        }}>
        {/* // Root of the App */}
        <RootStack.Screen
          component={AppTabs}
          name="AppTabs"
          options={{
            ...TransitionPresets.ModalPresentationIOS,
            presentation: 'transparentModal',
          }}
        />
        <RootStack.Screen
          component={Houses}
          options={{
            ...TransitionPresets.ModalPresentationIOS,
            presentation: 'transparentModal',
          }}
          name="Houses"
        />
        <RootStack.Screen
          component={House}
          options={{
            ...TransitionPresets.ModalPresentationIOS,
            presentation: 'transparentModal',
          }}
          name="House"
        />

        <RootStack.Screen
          component={AddHouse}
          options={{
            ...TransitionPresets.ModalPresentationIOS,
            presentation: 'transparentModal',
          }}
          name="AddHouse"
        />

        <RootStack.Screen component={Login} name="Login" />
        <RootStack.Screen
          component={Register}
          options={{
            ...TransitionPresets.ModalPresentationIOS,
            presentation: 'card',
          }}
          name="Register"
        />
        <RootStack.Screen component={DashBoard} name="Dashboard" />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootTabs;
