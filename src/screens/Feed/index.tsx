import React, { useContext } from 'react';
import { FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { Card, Text } from '@components';
import { useQuery } from '@apollo/react-hooks';
import { UserContext } from '@utils';
import { GET_ALL_IMAGES } from '@gql';
import styles from './styles';

export default (): JSX.Element => {
  const user = useContext(UserContext);
  const { loading, error, data } = useQuery(GET_ALL_IMAGES);

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
          data={data.images}
          showsVerticalScrollIndicator={false}
          keyExtractor={image => `${image.id}`}
          renderItem={({ item: { id, uri, preview, metadata, likers } }) => (
            <Card
              ImageId={id}
              uri={uri}
              preview={preview}
              metadata={metadata}
              favorited={likers.includes(user.id)}
              containerStyle={{ marginBottom: 16 }}
            />
          )}
        />
      </SafeAreaView>
    );
  }
};
