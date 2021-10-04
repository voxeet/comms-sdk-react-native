import COLORS from '../../constants/colors.constants';
import {
  SPACE_XXS,
  SPACE_S,
  SPACE_XL,
  SPACE_L,
} from '../../constants/sizes.constants';
import { StyleSheet } from 'react-native';

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
  'color-light': {
    backgroundColor: COLORS.WHITE,
  },
  'color-dark': {
    backgroundColor: COLORS.BLUE,
  },
});
