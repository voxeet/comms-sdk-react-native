import { StyleSheet } from 'react-native';
import COLORS from '@constants/colors.constants';
import { SPACE_XXS, SPACE_L } from '@constants/sizes.constants';

export default StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    environment: {
      backgroundColor: COLORS.TRANSPARENT_BLACK,
      padding: 10,
      borderRadius: SPACE_XXS,
    },
    actionButtons: {
      flexDirection: 'row',
      flexWrap: 'wrap',

    },
    menuBackdrop: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      opacity: 1,
    },
    menuButton: {
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: COLORS.BLUE,
      borderRadius: SPACE_L,
    },
  });
