import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { useNavigation } from '@react-navigation/native';
import { IconNames, RoundButton } from '@components';
import { Routes } from '@routes';
import styles from './styles';
import { getLocationAsync } from 'utils';

export default (): JSX.Element => {
  const { goBack, navigate } = useNavigation();
  const cameraRef = useRef<Camera>();
  const [cameraLoading, setCameraLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const flipCamera = useCallback(() => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    );
  }, [type]);

  const takePicture = useCallback(async () => {
    setCameraLoading(true);
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      const compressedPhoto = await ImageManipulator.manipulateAsync(
        photo.uri,
        [],
        { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG },
      );
      const preview = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ resize: { width: photo.width * 0.1 } }],
        {
          compress: 0.0001,
          base64: true,
          format: ImageManipulator.SaveFormat.JPEG,
        },
      );
      const location = await getLocationAsync();
      setCameraLoading(false);
      navigate(Routes.Preview, {
        photo: compressedPhoto,
        preview: preview.base64,
        location,
      });
    }
  }, [cameraRef, navigate]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.container} type={type} ref={cameraRef}>
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={styles.secondaryActionsContainer}>
            <RoundButton
              size="small"
              iconName={IconNames.Back}
              onPress={goBack}
            />
            <RoundButton
              size="small"
              iconName={IconNames.Flip}
              onPress={flipCamera}
            />
          </View>
          <View style={styles.cameraButtonContainer}>
            <RoundButton
              size="medium"
              iconName={IconNames.Camera}
              onPress={takePicture}
              loading={cameraLoading}
            />
          </View>
        </SafeAreaView>
      </Camera>
    </View>
  );
};
