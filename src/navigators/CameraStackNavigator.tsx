import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CameraScreen } from '@screens';

const { Navigator, Screen } = createStackNavigator();

export default () => (
  <Navigator headerMode="none">
    <Screen name={'Foo'} component={CameraScreen} />
  </Navigator>
);
