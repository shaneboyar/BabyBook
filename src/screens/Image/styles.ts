import { StyleSheet, Dimensions } from 'react-native';
import { transparent, lightGray } from '@colors';
import { scale } from 'react-native-size-matters';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  actionButtonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(8),
    width: '100%',
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  container: {
    alignItems: 'center',
    backgroundColor: lightGray,
    height,
    width,
  },
  metadataContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    width: '100%',
  },
  metadataItem: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  metadataItemContainer: {
    alignSelf: 'flex-start',
  },
  metadataText: {
    marginLeft: 8,
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
    margin: scale(8),
  },
});
