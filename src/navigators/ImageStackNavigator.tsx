import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ImageScreen } from '@screens';
import { Routes } from '@routes';

const { Navigator, Screen } = createStackNavigator();

export default () => (
  <Navigator headerMode="none">
    <Screen name={Routes.ImageScreen} component={ImageScreen} />
  </Navigator>
);
