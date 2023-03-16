import { StyleSheet } from 'react-native';

import COLORS from '@constants/colors.constants';
import { SPACE_XXS } from '@constants/sizes.constants';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  environment: {
    backgroundColor: COLORS.TRANSPARENT_BLACK,
    padding: 10,
    borderRadius: SPACE_XXS,
  },
});
