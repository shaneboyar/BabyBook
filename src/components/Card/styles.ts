import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { white, opacityColor } from '@colors';
import { shadow } from 'utils';

export default StyleSheet.create({
  cardContentContainer: {
    backgroundColor: opacityColor(white, 0.5),
    flex: 0.3,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  container: {
    backgroundColor: white,
    height: scale(382),
    justifyContent: 'flex-end',
    width: '100%',
    ...shadow,
  },
  date: {},
  favoriteButton: {
    backgroundColor: white,
  },
  favoriteButtonContainer: {
    bottom: scale(82),
    position: 'absolute',
    right: scale(0),
  },
  imageContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  milestone: {},
  milestoneContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    letterSpacing: scale(2),
  },
});
