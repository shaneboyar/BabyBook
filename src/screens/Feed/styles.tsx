import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { white } from '@colors';
import { shadow } from '@utils';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 64,
  },
  placeholderCard: {
    backgroundColor: white,
    height: scale(382),
    justifyContent: 'flex-end',
    marginBottom: 16,
    width: '100%',
    ...shadow,
  },
});
