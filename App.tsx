import React, { useState } from 'react';
import { AppLoading, SplashScreen } from 'expo';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigator } from '@navigators';
import { getPushToken, storeData, retrieveData } from '@utils';
import * as Location from 'expo-location';
import * as Font from 'expo-font';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
});

function App() {
  const [loading, setLoading] = useState(true);

  const setupApp = async () => {
    const storedUUID = await retrieveData('uuid');
    if (!storedUUID) {
      console.log('No uuid found. Fetching and storing locally');
      const uuid = await getPushToken();
      await storeData('uuid', uuid);
    }
    await Location.requestPermissionsAsync();
    await Font.loadAsync({
      'open-sans-light': require('./assets/fonts/OpenSans-Light.ttf'),
      'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
      'open-sans-semi-bold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
      'open-sans-extra-bold': require('./assets/fonts/OpenSans-ExtraBold.ttf'),
    });
  };

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

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default ApolloApp;
