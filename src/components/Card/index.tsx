import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, ViewStyle } from 'react-native';
import { Image, CacheManager } from 'react-native-expo-image-cache';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import { black } from '@colors';
import { useMutation } from '@apollo/react-hooks';
import { UserContext } from '@utils';
import { CREATE_FAVORITE, GET_ALL_IMAGES, GET_FAVORITES } from '@gql';
import Text from '../Text';
import Icon, { IconNames } from '../Icon';
import RoundButton from '../RoundButton';
import styles from './styles';

interface CardProps {
  ImageId: number;
  uri: string;
  preview: string;
  metadata: {
    date: Date;
    title: string;
    milestone: string;
  };

  favorited: boolean;
  containerStyle?: ViewStyle;
}

export default ({
  uri,
  ImageId,
  metadata,
  favorited: f,
  preview,
  containerStyle,
}: CardProps) => {
  const user = useContext(UserContext);
  const [favorited, setFavorited] = useState(f);
  const [path, setPath] = useState();
  const [createFavorite, { loading }] = useMutation(CREATE_FAVORITE, {
    refetchQueries: [
      { query: GET_ALL_IMAGES },
      { query: GET_FAVORITES, variables: { UserId: user.id } },
    ],
  });

  useEffect(() => {
    const getPath = async () => {
      const cachePath = await CacheManager.get(uri, {}).getPath();
      setPath(cachePath);
    };
    getPath();
  }, [uri]);

  const favorite = useCallback(async () => {
    await createFavorite({
      variables: { UserId: user.id, ImageId },
    });
    setFavorited(true);
  }, [ImageId, createFavorite, user.id]);

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
        preview={{ uri: `data:image/jpeg,${preview}` }}
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
          loading={loading}
          onPress={favorite}
        />
      </View>
    </TouchableOpacity>
  );
};
