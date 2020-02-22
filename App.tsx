import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigator } from '@navigators';
import { getPushToken, storeData, retrieveData, UserContext } from '@utils';
import * as Location from 'expo-location';
import * as Font from 'expo-font';
import { AsyncStorage } from 'react-native';

const client = new ApolloClient({
  uri: 'http://192.168.86.48:4000/',
});

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  const setupApp = async () => {
    await AsyncStorage.clear();
    const storedUser = await retrieveData('user');
    console.log('storedUser: ', storedUser);
    setUser(storedUser);
    if (!storedUser) {
      console.log('No uuid found. Fetching and storing locally');
      const uuid = await getPushToken();
      await storeData('user', { uuid });
      setUser({ uuid });
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

  if (loading || !user) {
    return (
      <AppLoading
        startAsync={setupApp}
        onFinish={() => {
          setLoading(false);
        }}
        onError={console.warn}
        autoHideSplash={true}
      />
    );
  }

  return (
    <UserContext.Provider value={{ ...user, setUser }}>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </UserContext.Provider>
  );
}

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default ApolloApp;
