import { StyleSheet } from 'react-native';

import COLORS from '@constants/colors.constants';
import {
  SPACE_XXS,
  SPACE_S,
  SPACE_XL,
  SPACE_L,
  SPACE_M,
} from '@constants/sizes.constants';

export default StyleSheet.create({
  'button': {
    backgroundColor: COLORS.WHITE,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  'size-large': {
    borderRadius: SPACE_S,
    height: SPACE_XL,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: SPACE_S,
  },
  'size-small': {
    height: SPACE_L,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginRight: SPACE_XXS,
    marginBottom: SPACE_XXS,
    borderRadius: SPACE_XXS,
  },
  'size-xsmall': {
    height: SPACE_M,
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderRadius: SPACE_XXS,
  },
  'color-light': {
    backgroundColor: COLORS.WHITE,
  },
  'color-dark': {
    backgroundColor: COLORS.BLUE,
  },
  'color-red': {
    backgroundColor: 'red',
  },
  'color-green': {
    backgroundColor: 'green',
  },
});
