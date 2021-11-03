import { StyleSheet } from 'react-native';

import COLORS from '@constants/colors.constants';
import { SPACE_XL, SPACE_S } from '@constants/sizes.constants';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  menuBackdrop: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    opacity: 1,
  },
  createConferenceButton: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: SPACE_S,
    height: SPACE_XL,
  },
});
