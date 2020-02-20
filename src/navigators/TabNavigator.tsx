import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FeedScreen, FavoritesScreen, CameraScreen } from '@screens';
import {
  // BottomTabNavigationOptions,
  BottomTabBarOptions,
} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { softPurple, lightGray } from '@colors';

const { Navigator, Screen } = createBottomTabNavigator();

const tabBarOptions: BottomTabBarOptions = {
  activeTintColor: softPurple,
  style: {
    backgroundColor: lightGray,
  },
};

// const screenOptions = ({ route }) => ({} as BottomTabNavigationOptions);

export default () => (
  <Navigator tabBarOptions={tabBarOptions}>
    <Screen name="Favorites" component={FavoritesScreen} />
    <Screen name="Camera" component={CameraScreen} />
    <Screen name="Feed" component={FeedScreen} />
  </Navigator>
);
