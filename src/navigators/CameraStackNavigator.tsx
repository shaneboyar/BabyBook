import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CameraScreen, PreviewScreen } from '@screens';
import { Routes } from '@routes';

const { Navigator, Screen } = createStackNavigator();

export default () => (
  <Navigator headerMode="none">
    <Screen name={Routes.CameraCapture} component={CameraScreen} />
    <Screen name={Routes.Preview} component={PreviewScreen} />
  </Navigator>
);
