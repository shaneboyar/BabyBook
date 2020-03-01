import React, { useEffect, useState, useCallback } from 'react';
import { View, SafeAreaView } from 'react-native';
import { Image, CacheManager } from 'react-native-expo-image-cache';
import * as Sharing from 'expo-sharing';
import { useNavigation } from '@react-navigation/native';
import { FavoriteButton, RoundButton, IconNames } from '@components';
import { Routes } from '@routes';
import { black } from '@colors';
import styles from './styles';
import { ImageData } from './index';

interface ImageViewProps {
  flip(): void;
  image: ImageData;
  from: Routes;
}

export default ({ flip, image, from }: ImageViewProps) => {
  const [path, setPath] = useState();
  const { navigate } = useNavigation();

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
          {image.metadata.title && (
            <RoundButton
              size="medium"
              iconName={IconNames.Story}
              onPress={flip}
            />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};
