import React, { useContext, useCallback, useState } from 'react';
import { UserContext } from '@utils';
import { useMutation } from '@apollo/react-hooks';
import {
  CREATE_FAVORITE,
  GET_ALL_IMAGES,
  GET_FAVORITES,
  DESTROY_FAVORITE,
} from '@gql';
import RoundButton, { RoundButtonSizes } from '../RoundButton';
import { IconNames } from '../Icon';
import styles from './styles';

interface FavoriteButtonProps {
  favorited: boolean;
  ImageId: number;
  size?: RoundButtonSizes;
  onFavorite?(): void;
}

export default ({
  favorited: f,
  ImageId,
  size = 'extraSmall',
  onFavorite,
}: FavoriteButtonProps) => {
  const [favorited, setFavorited] = useState(f);

  const user = useContext(UserContext);

  const [createFavorite, { loading: createLoading }] = useMutation(
    CREATE_FAVORITE,
    {
      refetchQueries: [
        { query: GET_ALL_IMAGES },
        { query: GET_FAVORITES, variables: { UserId: user.id } },
      ],
    },
  );
  const [destroyFavorite, { loading: destroyLoading }] = useMutation(
    DESTROY_FAVORITE,
    {
      refetchQueries: [
        { query: GET_ALL_IMAGES },
        { query: GET_FAVORITES, variables: { UserId: user.id } },
      ],
    },
  );

  const favorite = useCallback(async () => {
    await createFavorite({
      variables: { UserId: user.id, ImageId },
    });
    setFavorited(true);
  }, [ImageId, createFavorite, user.id]);

  const unfavorite = useCallback(async () => {
    await destroyFavorite({
      variables: { UserId: user.id, ImageId },
    });
    setFavorited(false);
  }, [ImageId, destroyFavorite, user.id]);

  const handleFavorite = useCallback(async () => {
    if (favorited) {
      await unfavorite();
    } else {
      await favorite();
    }
    onFavorite && onFavorite();
  }, [favorite, favorited, onFavorite, unfavorite]);

  return (
    <RoundButton
      buttonStyle={styles.favoriteButton}
      size={size}
      iconName={favorited ? IconNames.Heart : IconNames.HeartOutline}
      loading={createLoading || destroyLoading}
      onPress={handleFavorite}
    />
  );
};
