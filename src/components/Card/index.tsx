import React, { useState, useEffect, useCallback } from 'react';
import { View, ViewStyle } from 'react-native';
import { Image, CacheManager } from 'react-native-expo-image-cache';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Routes } from '@routes';
import FavoriteButton from 'components/FavoriteButton';
import { black } from '@colors';
import moment from 'moment';
import Text from '../Text';
import Icon, { IconNames } from '../Icon';
import styles from './styles';

interface CardProps {
  ImageId?: number;
  uri: string;
  preview: string;
  metadata?: {
    date: Date;
    title: string;
    milestone: string;
  };
  disabled?: boolean;
  hideFavoriteButton?: boolean;
  favorited?: boolean;
  containerStyle?: ViewStyle;
}

export default ({
  uri,
  ImageId,
  metadata,
  hideFavoriteButton = false,
  favorited = false,
  disabled = false,
  preview,
  containerStyle,
}: CardProps) => {
  const { navigate } = useNavigation();
  const { name } = useRoute();
  const [path, setPath] = useState();

  useEffect(() => {
    const getPath = async () => {
      const cachePath = await CacheManager.get(uri, {}).getPath();
      setPath(cachePath);
    };
    getPath();
  }, [uri]);

  const goToImage = useCallback(() => {
    navigate(Routes.ImageStack, {
      screen: Routes.ImageScreen,
      params: {
        image: { id: ImageId, uri, metadata, preview, favorited },
        from: name,
      },
    });
  }, [ImageId, favorited, metadata, navigate, preview, name, uri]);

  return !path ? null : (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={goToImage}
      disabled={disabled}>
      <Image
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        uri={uri}
        preview={{ uri: `data:image/jpeg;base64,${preview}` }}
        // tint="light"
        // transitionDuration={400}
      />

      {metadata && metadata.title && (
        <View style={styles.cardContentContainer}>
          <Text size={8} style={styles.date}>
            {moment(metadata.date).format('MMMM Do YYYY @ h:mm a')}
          </Text>
          <Text size={32} variant="bold" style={styles.title}>
            {metadata.title}
          </Text>
          <View style={styles.milestoneContainer}>
            {metadata.milestone && (
              <>
                <Icon color={black} name={IconNames.Award} />
                <Text variant="semi-bold" style={styles.milestone}>
                  {metadata.milestone}
                </Text>
              </>
            )}
          </View>
        </View>
      )}
      {!hideFavoriteButton && (
        <View style={styles.favoriteButtonContainer}>
          <FavoriteButton ImageId={ImageId} favorited={favorited} />
        </View>
      )}
    </TouchableOpacity>
  );
};
