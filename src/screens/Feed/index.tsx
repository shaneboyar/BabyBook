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
    favorited: true,
  },
  {
    key: '1',
    imageData: stubImage,
    title: 'Test',
    milestone: 'A Milestone',
    date: new Date(),
    favorited: false,
  },
  {
    key: '2',
    imageData: stubImage,
    title: 'Test',
    milestone: 'A Milestone',
    date: new Date(),
    favorited: true,
  },
  {
    key: '3',
    imageData: stubImage,
    title: 'Test',
    milestone: 'A Milestone',
    date: new Date(),
    favorited: false,
  },
  {
    key: '4',
    imageData: stubImage,
    title: 'Test',
    milestone: 'A Milestone',
    date: new Date(),
    favorited: false,
  },
  {
    key: '5',
    imageData: stubImage,
    title: 'Test',
    milestone: 'A Milestone',
    date: new Date(),
    favorited: false,
  },
  {
    key: '6',
    imageData: stubImage,
    title: 'Test',
    milestone: 'A Milestone',
    date: new Date(),
    favorited: true,
  },
];

export default (): JSX.Element => (
  <SafeAreaView style={styles.container}>
    <FlatList
      style={{ alignSelf: 'stretch', marginBottom: 64 }}
      data={stubCards}
      showsVerticalScrollIndicator={false}
      renderItem={({
        item: { key, imageData, title, milestone, date, favorited },
      }) => (
        <Card
          key={key}
          imageData={imageData}
          title={title}
          milestone={milestone}
          date={date}
          containerStyle={{ marginBottom: 16 }}
          favorited={favorited}
        />
      )}
    />
  </SafeAreaView>
);
