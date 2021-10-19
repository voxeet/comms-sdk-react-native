import { FONT_WEIGHTS } from '@constants/fonts.constants';
import { SPACE_XXS, SPACE_XS, SPACE_M } from '@constants/sizes.constants';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  optionsContainerStyle: {
    borderRadius: SPACE_M,
    paddingVertical: SPACE_XS,
  },
  optionWrapper: {
    paddingHorizontal: SPACE_M,
    paddingVertical: SPACE_XXS,
  },
  optionText: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: FONT_WEIGHTS.medium,
  },
});
