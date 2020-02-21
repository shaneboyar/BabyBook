import { StyleSheet } from 'react-native';
import { white } from '@colors';
import { scale } from 'react-native-size-matters';

export const caluclateContainerSize = size => ({
  borderRadius: scale(size),
  height: scale(size) * 2,
  width: scale(size) * 2,
});

export default StyleSheet.create({
  buttonBackground: {
    backgroundColor: white,
    opacity: 0.5,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    opacity: 1,
    position: 'absolute',
  },
});
