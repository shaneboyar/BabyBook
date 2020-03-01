import { StyleSheet } from 'react-native';
import { white } from '@colors';
import { scale } from 'react-native-size-matters';

export default StyleSheet.create({
  favoriteButton: {
    backgroundColor: white,
  },
  favoriteButtonContainer: {
    bottom: scale(82),
    position: 'absolute',
    right: scale(0),
  },
});
