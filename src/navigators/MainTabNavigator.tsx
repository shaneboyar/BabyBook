import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { Feather, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { FeedScreen, FavoritesScreen } from '@screens';
import { Routes } from '@routes';
import { softPurple } from '@colors';
import TabNavigator from './TabNavigator';

const { Screen } = createBottomTabNavigator();

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
      case Routes.ImageStack: {
        return null;
      }
    }
  },
});

export default () => (
  <TabNavigator screenOptions={screenOptions} initialRouteName={Routes.Feed}>
    <Screen name={Routes.Favorites} component={FavoritesScreen} />
    <Screen name={Routes.Feed} component={FeedScreen} />
  </TabNavigator>
);
