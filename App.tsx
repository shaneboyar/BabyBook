import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AppLoading, Notifications } from 'expo';
import * as Location from 'expo-location';
import * as Font from 'expo-font';
import { ApolloProvider, useLazyQuery } from '@apollo/react-hooks';
import { Provider as PaperProvider } from 'react-native-paper';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { RootStackNavigator } from '@navigators';
import { getPushToken, storeData, retrieveData, UserContext } from '@utils';
import { GET_IMAGE } from '@gql';
import { Routes } from '@routes';

const client = new ApolloClient({
  link: createUploadLink({
    uri:
      process.env.NODE_ENV === 'development'
        ? 'http://192.168.108.85:4000'
        : 'https://baby-book-server.herokuapp.com',
  }),
  cache: new InMemoryCache(),
});

function App() {
  const navigator = useRef<NavigationContainerRef>();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [getImage, { data, loading: fetchingPushedImage }] = useLazyQuery(
    GET_IMAGE,
  );

  const handleNotification = useCallback(
    (notification: { data: { imageId: number } }) => {
      getImage({
        variables: { id: notification.data.imageId },
      });
    },
    [getImage],
  );

  useEffect(() => {
    const notificationSub = Notifications.addListener(handleNotification);

    return () => notificationSub.remove();
  }, [handleNotification]);

  useEffect(() => {
    if (!data || !navigator.current) {
      return;
    }

    console.log('data.image: ', data.image.id);

    navigator.current.navigate(Routes.ImageStack, {
      screen: Routes.ImageScreen,
      params: {
        image: data.image,
        from: Routes.Feed,
      },
    });
  }, [data, navigator]);

  const setupApp = async () => {
    const storedUser = await retrieveData('user');
    setUser(storedUser);
    if (!storedUser) {
      console.log('No uuid found. Fetching and storing locally');
      const uuid = await getPushToken();
      await storeData('user', { uuid });
      setUser({ uuid });
    }
    // Notifications.addListener(handleNotification);
    await Location.requestPermissionsAsync();
    await Font.loadAsync({
      'open-sans-light': require('./assets/fonts/OpenSans-Light.ttf'),
      'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
      'open-sans-semi-bold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
      'open-sans-extra-bold': require('./assets/fonts/OpenSans-ExtraBold.ttf'),
    });
  };

  if (loading || fetchingPushedImage || !user) {
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
      <NavigationContainer ref={navigator}>
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
