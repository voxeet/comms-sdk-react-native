import { StyleSheet } from 'react-native';

import COLORS from '@constants/colors.constants';
import { FONT_WEIGHTS, FONT_SIZES } from '@constants/fonts.constants';
import { SPACE_S, SPACE_XL } from '@constants/sizes.constants';

export default StyleSheet.create({
  view: {
    borderRadius: SPACE_S,
    borderColor: COLORS.WHITE,
    borderWidth: 1,
    height: SPACE_XL,
  },
  input: {
    fontFamily: FONT_WEIGHTS.medium,
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.S,
    flex: 1,
    paddingHorizontal: SPACE_S,
  },
  disabled: {
    color: COLORS.GRAY_LIGHT,
  },
});
