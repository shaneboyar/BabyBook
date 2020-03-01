import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from '@routes';
import { UserContext } from '@utils';
import { Login } from '@screens';
import MainTabNavigator from './MainTabNavigator';
import CameraStackNavigator from './CameraStackNavigator';
import ImageStackNavigator from './ImageStackNavigator';

const { Navigator, Screen } = createStackNavigator();

export default () => {
  const { name } = useContext(UserContext);
  return (
    <Navigator
      mode="modal"
      initialRouteName={name ? Routes.Main : Routes.Login}>
      <Screen
        name={Routes.Main}
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      <Screen
        name={Routes.Login}
        component={Login}
        options={{ headerShown: false }}
      />
      <Screen
        name={Routes.Camera}
        component={CameraStackNavigator}
        options={{ headerShown: false, header: null }}
      />
      <Screen
        name={Routes.ImageStack}
        component={ImageStackNavigator}
        options={{ headerShown: false, header: null }}
      />
    </Navigator>
  );
};
