import React, { useContext } from 'react';
import { FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { Card, Text } from '@components';
import { useQuery } from '@apollo/react-hooks';
import { UserContext } from '@utils';
import { GET_ALL_IMAGES } from '@gql';
import styles from './styles';
import { Routes } from '@routes';
import { RouteProp } from '@react-navigation/native';

interface FeedRouteParams {
  refresh: boolean;
}

type FeedRouteProps = RouteProp<Record<string, FeedRouteParams>, Routes.Feed>;

export default (): JSX.Element => {
  const user = useContext(UserContext);
  const { loading, error, data } = useQuery(GET_ALL_IMAGES);

  const renderList = () => {
    if (loading && !data) {
      return <ActivityIndicator />;
    }

    if (error) {
      console.log('error: ', error);
      return <Text>Error</Text>;
    }

    if (data) {
      return (
        <FlatList
          style={{ alignSelf: 'stretch', marginBottom: 64 }}
          data={data.images}
          refreshing={loading}
          showsVerticalScrollIndicator={false}
          keyExtractor={image => `${image.id}-${image.favoriteUserIds.join()}`}
          renderItem={({
            item: { id, uri, preview, metadata, favoriteUserIds },
          }) => (
            <Card
              ImageId={id}
              uri={uri}
              preview={preview}
              metadata={metadata}
              favorited={favoriteUserIds.includes(user.id)}
              containerStyle={{ marginBottom: 16 }}
            />
          )}
        />
      );
    }
  };

  return <SafeAreaView style={styles.container}>{renderList()}</SafeAreaView>;
};
