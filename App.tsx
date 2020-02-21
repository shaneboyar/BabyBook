/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigator } from '@navigators';
import * as Location from 'expo-location';
import * as Font from 'expo-font';

export default function App() {
  Location.requestPermissionsAsync();
  Font.loadAsync({
    'open-sans-light': require('./assets/fonts/OpenSans-Light.ttf'),
    'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans-semi-bold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
    'open-sans-extra-bold': require('./assets/fonts/OpenSans-ExtraBold.ttf'),
  });
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
