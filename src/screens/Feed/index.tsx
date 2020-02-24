import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { Card, Text } from '@components';
import styles from './styles';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useFocusEffect, useRoute, RouteProp } from '@react-navigation/native';
import { Routes } from '@routes';

type FeedRouteProps = RouteProp<
  Record<
    string,
    {
      refresh: boolean;
    }
  >,
  Routes.Feed
>;

const GET_ALL_IMAGES = gql`
  {
    getAllImages {
      id
      uri
      createdAt
    }
  }
`;

export default (): JSX.Element => {
  const route = useRoute<FeedRouteProps>();
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const { loading, error, data, refetch } = useQuery(GET_ALL_IMAGES, {
    notifyOnNetworkStatusChange: true,
  });

  const refetchImages = useCallback(async () => {
    refetch();
    setShouldRefetch(false);
  }, [refetch]);

  useEffect(() => {
    shouldRefetch && refetchImages();
  }, [refetch, refetchImages, shouldRefetch]);

  useFocusEffect(
    useCallback(() => {
      const refreshParam =
        (route && route.params && route.params.refresh) || false;
      refreshParam && setShouldRefetch(true);
    }, [route]),
  );

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error</Text>;
  }

  if (data) {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={{ alignSelf: 'stretch', marginBottom: 64 }}
          data={data.getAllImages}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item: { uri, metadata, favorited } }) => (
            <Card
              uri={uri}
              metadata={metadata}
              favorited={favorited}
              containerStyle={{ marginBottom: 16 }}
            />
          )}
        />
      </SafeAreaView>
    );
  }
};
