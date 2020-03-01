import React, { useContext } from 'react';
import { FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { Card, Text } from '@components';
import styles from './styles';
import { useQuery } from '@apollo/react-hooks';
import { UserContext } from '@utils';
import { GET_FAVORITES } from '@gql';

export default (): JSX.Element => {
  const user = useContext(UserContext);
  const { loading, error, data } = useQuery(GET_FAVORITES, {
    variables: { UserId: user.id },
  });

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    console.log('error: ', error);
    return <Text>Error</Text>;
  }

  if (data) {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={{ alignSelf: 'stretch', marginBottom: 64 }}
          data={data.userFavorites}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          renderItem={({
            item: { id, uri, metadata, preview, favoriteUserIds },
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
      </SafeAreaView>
    );
  }
};
