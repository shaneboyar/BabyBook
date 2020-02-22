/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { AppLoading, SplashScreen } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigator } from '@navigators';
import * as Location from 'expo-location';
import * as Font from 'expo-font';

const setupApp = async () => {
  await Location.requestPermissionsAsync();
  await Font.loadAsync({
    'open-sans-light': require('./assets/fonts/OpenSans-Light.ttf'),
    'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans-semi-bold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
    'open-sans-extra-bold': require('./assets/fonts/OpenSans-ExtraBold.ttf'),
  });
};

export default function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <AppLoading
        startAsync={setupApp}
        onFinish={() => {
          SplashScreen.hide();
          setLoading(false);
        }}
        onError={console.warn}
        autoHideSplash={false}
      />
    );
  }
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
