import { StyleSheet } from 'react-native';
import { lightGray } from '@colors';

export default StyleSheet.create({
  cameraButton: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: lightGray,
    borderRadius: 48,
    borderWidth: 1,
    height: 96,
    justifyContent: 'center',
    width: 96,
  },
  cameraButtonContainer: {
    bottom: 48,
    position: 'absolute',
  },
  container: {
    alignItems: 'center',
    backgroundColor: lightGray,
    bottom: 0,
    overflow: 'visible',
    paddingBottom: 32,
    position: 'absolute',
    width: '100%',
  },
  screenContentContainer: {
    flex: 1,
  },
  tabBarContainer: {
    flexDirection: 'row',
    height: 64,
    justifyContent: 'space-evenly',
  },
  tabButtonContainer: {
    alignItems: 'center',
    height: 64,
    justifyContent: 'center',
    marginHorizontal: 96,
    width: 64,
  },
});
