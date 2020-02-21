import { StyleSheet, Dimensions } from 'react-native';
import { transparent } from '@colors';
import { scale } from 'react-native-size-matters';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  cameraButtonContainer: {
    marginBottom: scale(16),
  },
  container: {
    flex: 1,
  },
  safeAreaContainer: {
    alignSelf: 'center',
    backgroundColor: transparent,
    flex: 1,
    height,
    justifyContent: 'space-between',
    position: 'absolute',
    width,
  },
  secondaryActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: scale(16),
  },
});
