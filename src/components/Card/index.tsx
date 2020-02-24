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
  uri: string;
  metadata: {
    date: Date;
    title: string;
    milestone: string;
  };

  favorited: boolean;
  containerStyle?: ViewStyle;
}

export default ({ uri, metadata, favorited, containerStyle }: CardProps) => {
  const [path, setPath] = useState();

  useEffect(() => {
    const getPath = async () => {
      const cachePath = await CacheManager.get(uri, {}).getPath();
      setPath(cachePath);
    };
    getPath();
  }, [uri]);

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
      {metadata && (
        <View style={styles.cardContentContainer}>
          <Text size={8} style={styles.date}>
            {moment(metadata.date).format('MMMM Do YYYY @ h:mm:ss a')}
          </Text>
          <Text size={32} variant="bold" style={styles.title}>
            {metadata.title}
          </Text>
          <View style={styles.milestoneContainer}>
            <Icon color={black} name={IconNames.Award} />
            <Text variant="semi-bold" style={styles.milestone}>
              {metadata.milestone}
            </Text>
          </View>
        </View>
      )}
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
