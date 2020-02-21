import React from 'react';
import { View, ImageBackground } from 'react-native';
import moment from 'moment';
import { Icon, IconNames, Text } from '@components';
import styles from './styles';
import { black } from '@colors';

interface CardProps {
  imageData: {
    source: {
      uri: string;
    };
    height: number;
    width: number;
  };
  date: Date;
  title: string;
  milestone: string;
}

export default ({ imageData, title, date, milestone }: CardProps) => (
  <ImageBackground {...imageData} style={styles.container} resizeMode="center">
    <View style={styles.cardContentContainer}>
      <Text size={8} style={styles.date}>
        {moment(date).format('MMMM Do YYYY @ h:mm:ss a')}
      </Text>
      <Text size={32} variant="bold" style={styles.title}>
        {title}
      </Text>
      <View style={styles.milestoneContainer}>
        <Icon color={black} name={IconNames.Award} />
        <Text variant="semi-bold" style={styles.milestone}>
          {milestone}
        </Text>
      </View>
    </View>
  </ImageBackground>
);
