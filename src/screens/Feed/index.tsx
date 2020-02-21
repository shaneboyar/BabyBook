import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { Card } from '@components';

const stubImage = {
  source: { uri: 'https://placebear.com/500/1500' },
  height: 1500,
  width: 500,
};

export default (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Card
        imageData={stubImage}
        title="Test"
        milestone="A milestone"
        date={new Date()}
      />
    </View>
  );
};
