import React, { useContext, useCallback, useState } from 'react';
import { View, Image, Dimensions, SafeAreaView } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RoundButton, IconNames } from '@components';
import { ReactNativeFile } from 'apollo-upload-client';
import { useMutation } from '@apollo/react-hooks';
import { UserContext } from '@utils';
import { Routes } from '@routes';
import { GET_ALL_IMAGES, CREATE_IMAGE } from '@gql';
import styles from './styles';
import { black } from '@colors';

interface PreviewRouteParams {
  photo: CapturedPicture;
  location: LocationData;
  preview: string;
}

type PreviewRouteProps = RouteProp<
  Record<string, PreviewRouteParams>,
  Routes.Preview
>;

type CapturedPicture = {
  width: number;
  height: number;
  uri: string;
};

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

const { width, height } = Dimensions.get('window');

export default () => {
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation();
  const [createImage] = useMutation(CREATE_IMAGE, {
    // eslint-disable-next-line no-shadow
    update: (cache, { data: { createImage } }) => {
      const { images } = cache.readQuery({ query: GET_ALL_IMAGES });
      cache.writeQuery({
        query: GET_ALL_IMAGES,
        data: { images: [createImage, ...images] },
      });
    },
  });
  const { goBack } = useNavigation();
  const user = useContext(UserContext);
  const route = useRoute<PreviewRouteProps>();

  const uploadFile = useCallback(
    async (UserId: number) => {
      setLoading(true);
      try {
        const { photo, preview } = route.params as PreviewRouteParams;
        const file = new ReactNativeFile({
          uri: photo.uri,
          name: 'temp.jpg',
          type: 'image/jpeg',
        });
        await createImage({
          variables: {
            file,
            UserId,
            preview,
          },
        });
      } catch (error) {
        console.log('Error with image: ', error);
      }
      setLoading(false);
      navigate(Routes.Main, { screen: Routes.Feed });
    },
    [createImage, navigate, route.params],
  );

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: route.params.photo.uri }}
        style={{ width, height }}
      />
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.secondaryActionsContainer}>
          <RoundButton
            naked
            size="small"
            iconName={IconNames.Back}
            onPress={goBack}
            iconColor={black}
          />
          <RoundButton
            size="small"
            iconName={IconNames.Pen}
            // onPress={flipCamera}
          />
        </View>
        <View style={styles.cameraButtonContainer}>
          <RoundButton
            size="medium"
            iconName={IconNames.Send}
            onPress={() => uploadFile(user.id)}
            loading={loading}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
