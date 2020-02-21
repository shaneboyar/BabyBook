import React from 'react';
import { View, Image, Dimensions, SafeAreaView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RoundButton, IconNames } from '@components';
import styles from './styles';

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
  const { goBack } = useNavigation();
  const route = useRoute();
  const {
    photo: { uri },
    location,
  } = route.params as { photo: CapturedPicture; location: LocationData };
  console.log('location: ', location);

  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={{ width, height }} />
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
            // onPress={takePicture}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
