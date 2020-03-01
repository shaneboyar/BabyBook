import React, { useState } from 'react';
import { AppLoading } from 'expo';
import * as Location from 'expo-location';
import * as Font from 'expo-font';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider as PaperProvider } from 'react-native-paper';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackNavigator } from '@navigators';
import { getPushToken, storeData, retrieveData, UserContext } from '@utils';

const client = new ApolloClient({
  link: createUploadLink({
    uri:
      process.env.NODE_ENV === 'development'
        ? 'http://11d24287.ngrok.io'
        : 'https://baby-book-server.herokuapp.com',
  }),
  cache: new InMemoryCache(),
});

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  const setupApp = async () => {
    const storedUser = await retrieveData('user');
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
        <PaperProvider>
          <RootStackNavigator />
        </PaperProvider>
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
