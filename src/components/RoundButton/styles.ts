import { StyleSheet } from 'react-native';
import { white, opacityColor } from '@colors';
import { scale } from 'react-native-size-matters';
import { shadow } from 'utils';

export const caluclateContainerSize = size => ({
  borderRadius: scale(size),
  height: scale(size) * 2,
  width: scale(size) * 2,
});

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: opacityColor(white, 0.5),
    justifyContent: 'center',
    margin: 8,
    ...shadow,
  },
});
