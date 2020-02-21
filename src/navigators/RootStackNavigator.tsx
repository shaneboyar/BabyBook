import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from '@routes';
import MainTabNavigator from './MainTabNavigator';
import CameraStackNavigator from './CameraStackNavigator';

const { Navigator, Screen } = createStackNavigator();

export default () => (
  <Navigator mode="modal">
    <Screen
      name={Routes.Main}
      component={MainTabNavigator}
      options={{ headerShown: false }}
    />
    <Screen
      name={Routes.Camera}
      component={CameraStackNavigator}
      options={{ headerShown: false, header: null }}
    />
  </Navigator>
);
