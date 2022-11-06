import * as React from 'react';
import {Platform, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {BlurView as RNCBlurView} from '@react-native-community/blur';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import spaces from '../styles/spaces';
import colors from '../styles/colors';
import TabIcon from '../components/TabIcon';
import Icon from 'react-native-vector-icons/Fontisto';
import I from 'react-native-vector-icons/MaterialIcons';
import IC from 'react-native-vector-icons/Ionicons';
import Explore from '../Screen/Explore';
import Profile from '../Screen/Profile';
import Home from '../Screen/Home';

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tabs = createBottomTabNavigator();

export default function AppTabs() {
  const safeArea = useSafeAreaInsets();
  return (
    <Tabs.Navigator
      safeAreaInsets={{
        bottom: safeArea.bottom ? safeArea.bottom : 16,
        left: 16,
      }}
      initialRouteName={'Home'}
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderWidth: 0,
          elevation: 0,
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          overflow: 'visible',
        },
        headerShown: false,
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: colors.black,
        tabBarShowLabel: false,
      }}
      tabBar={props => {
        const {index} = props.state;

        return (
          <>
            {Platform.OS === 'ios' ? (
              <RNCBlurView
                blurAmount={10}
                // @ts-ignore
                blurRadius={25}
                blurType="regular"
                overlayColor="transparent"
                style={{
                  position: 'absolute',
                  overflow: 'visible',
                  opacity: 1,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: (safeArea.bottom ? safeArea.bottom : spaces.md) + 54,
                }}
              />
            ) : (
              <View
                style={{
                  backgroundColor: 'white',
                  position: 'absolute',
                  overflow: 'visible',
                  opacity: index === 4 ? 0.9 : 0.9,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: (safeArea.bottom ? safeArea.bottom : spaces.md) + 44,
                }}
              />
            )}
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <BottomTabBar {...props} />
          </>
        );
      }}>
      <Tabs.Screen
        component={Home}
        name="Home"
        options={{
          tabBarIcon: ({focused, color}) => (
            <TabIcon color={color} focused={focused} name="Home">
              <Icon name="home" size={20} />
            </TabIcon>
          ),
        }}
      />

      <Tabs.Screen
        component={Explore}
        name="Explore"
        options={{
          tabBarIcon: ({focused, color}) => (
            <TabIcon color={color} focused={focused} name="Explore">
              <I name="explore" size={20} />
            </TabIcon>
          ),
        }}
      />

      <Tabs.Screen
        component={Profile}
        name="Profile"
        options={{
          tabBarIcon: ({focused, color}) => (
            <TabIcon color={color} focused={focused} name="Profile">
              <IC name="person-circle-outline" size={20} />
            </TabIcon>
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
