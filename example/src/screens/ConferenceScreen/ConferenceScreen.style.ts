import { StyleSheet, Platform } from 'react-native';

import SHADOWS from '@constants/boxshadow.constants';
import COLORS from '@constants/colors.constants';
import { SPACE_XXS, SPACE_M } from '@constants/sizes.constants';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  top: {},
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  center: {
    borderColor: '#fff',
    borderWidth: 0,
    flex: 1,
  },
  bottom: {
    paddingBottom: Platform.OS === 'ios' ? 30 : 70,
  },
  participantsList: {
    flexDirection: 'row',
  },
  leaveButton: {},
  participant: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 10,
    borderRadius: SPACE_XXS,
    height: SPACE_M,
  },
  buttonText: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 10,
    borderRadius: SPACE_XXS,
    height: SPACE_M,
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  actionButton: {},
  menuBackdrop: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    opacity: 1,
  },

  modalBackground: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    backgroundColor: 'lightgray',
    borderRadius: SPACE_XXS,
    width: '90%',
    height: '50%',
    shadowOffset: SHADOWS.m.shadowOffset,
    shadowOpacity: SHADOWS.m.shadowOpacity,
    shadowRadius: SHADOWS.m.shadowRadius,
    elevation: SHADOWS.m.elevation,
    flexDirection: 'column',
  },

  modalTitleSection: {
    flex: 1,
  },

  modalSelectSection: {
    flex: 8,
  },

  modalButtonSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  modalCheckbox: {
    marginRight: 20,
  },
});
