import { StyleSheet, Dimensions } from 'react-native';
import { transparent } from '@colors';
import { scale } from 'react-native-size-matters';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  cameraButtonContainer: {
    alignItems: 'center',
    marginBottom: scale(8),
    width: '100%',
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
    width,
  },
  secondaryActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: scale(8),
  },
});
