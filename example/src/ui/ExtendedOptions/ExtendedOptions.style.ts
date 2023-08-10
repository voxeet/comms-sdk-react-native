import { StyleSheet } from 'react-native';
import COLORS from '@constants/colors.constants';
import { FONT_SIZES } from '@constants/fonts.constants';
import { SPACE_S } from '@constants/sizes.constants';

export default StyleSheet.create({
    'dropdown': {
    },

    'button': {
        backgroundColor: 'rgba(100, 100, 100, 0.1)',
    },

    'buttonText': {
        marginHorizontal: SPACE_S,
        color: COLORS.WHITE,
        fontSize: FONT_SIZES.S,
    },

    optionsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    extendButton: {
    }
});