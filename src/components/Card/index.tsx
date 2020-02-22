import React from 'react';
import { View, ImageBackground, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import { black } from '@colors';
import styles from './styles';
import Text from '../Text';
import Icon, { IconNames } from '../Icon';
import RoundButton from '../RoundButton';

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
  containerStyle?: ViewStyle;
}

export default ({
  imageData,
  title,
  date,
  milestone,
  containerStyle,
}: CardProps) => (
  <TouchableOpacity
    onPress={() => {
      return;
    }}>
    <ImageBackground
      {...imageData}
      style={[styles.container, containerStyle]}
      resizeMode="cover">
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
      <View style={styles.favoriteButtonContainer}>
        <RoundButton
          buttonStyle={styles.favoriteButton}
          size="extraSmall"
          iconName={IconNames.HeartOutline}
        />
      </View>
    </ImageBackground>
  </TouchableOpacity>
);
