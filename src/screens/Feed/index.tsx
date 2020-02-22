import React from 'react';
import { FlatList, SafeAreaView, Dimensions } from 'react-native';
import { Card } from '@components';
import styles from './styles';

const { height, width } = Dimensions.get('window');

const stubImage = {
  source: { uri: `https://placebear.com/${width}/${height}` },
  height,
  width,
};

const stubCards = [
  {
    key: '0',
    imageData: stubImage,
    title: 'Test',
    milestone: 'A Milestone',
    date: new Date(),
  },
  {
    key: '1',
    imageData: stubImage,
    title: 'Test',
    milestone: 'A Milestone',
    date: new Date(),
  },
  {
    key: '2',
    imageData: stubImage,
    title: 'Test',
    milestone: 'A Milestone',
    date: new Date(),
  },
  {
    key: '3',
    imageData: stubImage,
    title: 'Test',
    milestone: 'A Milestone',
    date: new Date(),
  },
  {
    key: '4',
    imageData: stubImage,
    title: 'Test',
    milestone: 'A Milestone',
    date: new Date(),
  },
  {
    key: '5',
    imageData: stubImage,
    title: 'Test',
    milestone: 'A Milestone',
    date: new Date(),
  },
  {
    key: '6',
    imageData: stubImage,
    title: 'Test',
    milestone: 'A Milestone',
    date: new Date(),
  },
];

export default (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{ alignSelf: 'stretch', marginBottom: 64 }}
        data={stubCards}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: { key, imageData, title, milestone, date } }) => (
          <Card
            key={key}
            imageData={imageData}
            title={title}
            milestone={milestone}
            date={date}
            containerStyle={{ marginBottom: 16 }}
          />
        )}
      />
    </SafeAreaView>
  );
};
