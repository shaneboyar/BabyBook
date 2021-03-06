import { StyleSheet } from 'react-native';
import { opacityColor, white, softPurple } from '@colors';
import { shadow } from '@utils';
import { scale } from 'react-native-size-matters';

export default StyleSheet.create({
  cardContainer: {
    height: scale(382),
    marginBottom: 16,
    width: '100%',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  inputField: {
    marginBottom: 16,
  },
  milestoneContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  scrollContainer: {
    width: '100%',
  },
  sendButtonContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: opacityColor(white, 0.5),
    borderRadius: 64,
    flexDirection: 'row',
    height: 64,
    justifyContent: 'center',
    ...shadow,
  },
  sendButtonTitle: {
    color: softPurple,
    fontSize: 32,
    marginLeft: 16,
  },
  storyInput: {
    height: 128,
  },
});
