import React, { useState, useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import { Image, CacheManager } from 'react-native-expo-image-cache';
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
  favorited: boolean;
}

export default ({
  imageData,
  title,
  date,
  milestone,
  containerStyle,
  favorited,
}: CardProps) => {
  const [path, setPath] = useState();

  useEffect(() => {
    const getPath = async (uri: string) => {
      const cachePath = await CacheManager.get(uri, {}).getPath();
      setPath(cachePath);
    };
    getPath(imageData.source.uri);
  }, [imageData.source.uri]);

  return !path ? null : (
    <TouchableOpacity style={[styles.container, containerStyle]}>
      <Image
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        uri={path}
      />
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
          iconName={favorited ? IconNames.Heart : IconNames.HeartOutline}
        />
      </View>
    </TouchableOpacity>
  );
};
