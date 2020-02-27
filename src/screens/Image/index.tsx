import React, { useEffect, useState, useCallback } from 'react';
import { View, SafeAreaView } from 'react-native';
import { Image, CacheManager } from 'react-native-expo-image-cache';
import * as Sharing from 'expo-sharing';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { FavoriteButton, RoundButton, IconNames } from '@components';
import { Routes } from '@routes';
import { black } from '@colors';
import styles from './styles';

interface ImageData {
  uri: string;
  preview: string;
  metadata: {
    latitude: number;
    longitude: number;
  };
  id: number;
  favorited: boolean;
}

interface ImageRouteParams {
  image: ImageData;
  from: Routes;
}

type ImageRouteProps = RouteProp<
  Record<string, ImageRouteParams>,
  Routes.ImageScreen
>;

export interface LocationData {
  coords: {
    latitude: number;
    longitude: number;
    altitude: number;
    accuracy: number;
    heading: number;
    speed: number;
  };
  timestamp: number;
}

export default () => {
  const [path, setPath] = useState();
  const { navigate } = useNavigation();
  const route = useRoute<ImageRouteProps>();
  const { image, from } = route.params as ImageRouteParams;
  useEffect(() => {
    const getPath = async () => {
      const cachePath = await CacheManager.get(image.uri, {}).getPath();
      setPath(cachePath);
    };
    getPath();
  }, [image]);

  const openShareMenu = useCallback(async () => {
    if (!(await Sharing.isAvailableAsync())) {
      console.warn('Sharing is not available');
      return;
    }
    await Sharing.shareAsync(path, {});
  }, [path]);

  return (
    <View style={styles.container}>
      <Image
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        uri={path}
        preview={{ uri: `data:image/jpeg;base64,${image.preview}` }}
      />
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.secondaryActionsContainer}>
          <RoundButton
            size="small"
            iconName={IconNames.Back}
            onPress={() => navigate(Routes.Main, { screen: from })}
            naked
            iconColor={black}
          />
          <FavoriteButton ImageId={image.id} favorited={image.favorited} />
        </View>
        <View style={styles.actionButtonsContainer}>
          <RoundButton
            size="medium"
            iconName={IconNames.Download}
            onPress={openShareMenu}
          />
          <RoundButton
            size="medium"
            iconName={IconNames.Story}
            onPress={() => {
              console.log('Open Story');
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
