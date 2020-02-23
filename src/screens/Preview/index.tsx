import React, { useContext, useCallback } from 'react';
import { View, Image, Dimensions, SafeAreaView } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RoundButton, IconNames } from '@components';
import * as FileSystem from 'expo-file-system';
import styles from './styles';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { UserContext } from '@utils';
import { Routes } from '@routes';

type PreviewRouteProps = RouteProp<
  Record<
    string,
    {
      photo: CapturedPicture;
      location: LocationData;
    }
  >,
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

const CREATE_IMAGE = gql`
  mutation Image(
    $file: Upload!
    $latitude: Float!
    $longitude: Float!
    $userId: Int!
  ) {
    createImage(
      file: $file
      latitude: $latitude
      longitude: $longitude
      UserId: $userId
    ) {
      uri
    }
  }
`;

const { width, height } = Dimensions.get('window');

const read = async (uri: string) => {
  const stream = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return stream;
};

export default () => {
  const { navigate } = useNavigation();
  const [createImage] = useMutation(CREATE_IMAGE);
  const { goBack } = useNavigation();
  const user = useContext(UserContext);
  const route = useRoute<PreviewRouteProps>();

  const uploadFile = useCallback(
    async (userId: number) => {
      try {
        const { photo, location } = route.params as {
          photo: CapturedPicture;
          location: LocationData;
        };
        const file = await read(photo.uri);
        await createImage({
          variables: {
            file,
            userId,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        });
      } catch (error) {
        console.log('Error with image: ', error);
      }
      navigate(Routes.Feed);
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
            size="small"
            iconName={IconNames.Back}
            onPress={goBack}
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
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
