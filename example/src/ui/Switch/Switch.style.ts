import { SPACE_S } from '@constants/sizes.constants';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },

  switchStyle: {
    justifyContent: 'center',
    marginVertical: 0,
    marginHorizontal: SPACE_S,
    transform: [ { scaleX: 1.2}, {scaleY: 1.2 }],
  },
});