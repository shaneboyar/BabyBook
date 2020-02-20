import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { FeedScreen, FavoritesScreen, CameraScreen } from '@screens';
import {
  BottomTabNavigationOptions,
  BottomTabBarOptions,
} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { softPurple, lightGray } from '@colors';
import { Routes } from '@navigators';

const { Navigator, Screen } = createBottomTabNavigator();

const tabBarOptions: BottomTabBarOptions = {
  activeTintColor: softPurple,
  style: {
    backgroundColor: lightGray,
  },
};

const screenOptions = ({ route }): BottomTabNavigationOptions => ({
  tabBarIcon: ({ focused }) => {
    switch (route.name) {
      case Routes.Camera: {
        return <Feather name="camera" size={36} color={softPurple} />;
      }
      case Routes.Favorites: {
        return (
          <Entypo
            name={focused ? 'heart' : 'heart-outlined'}
            size={24}
            color={softPurple}
          />
        );
      }
      case Routes.Feed: {
        return (
          <MaterialCommunityIcons
            name={focused ? 'layers' : 'layers-outline'}
            size={24}
            color={softPurple}
          />
        );
      }
    }
  },
});

export default () => (
  <Navigator
    tabBarOptions={tabBarOptions}
    screenOptions={screenOptions}
    initialRouteName={Routes.Feed}>
    <Screen name="Favorites" component={FavoritesScreen} />
    <Screen name="Camera" component={CameraScreen} />
    <Screen name="Feed" component={FeedScreen} />
  </Navigator>
);
