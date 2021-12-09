import { StyleSheet } from 'react-native';

import SHADOWS from '@constants/boxshadow.constants';
import COLORS from '@constants/colors.constants';
import { SPACE_XXS, SPACE_M } from '@constants/sizes.constants';

export default StyleSheet.create({
  wrapper: {
    position: 'relative',
    flex: 1,
  },
  layerInfo: {
    position: 'relative',
    flex: 1,
    zIndex: 9,
  },
  layerVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bottom: {
    paddingBottom: 120,
  },
  participantsList: {
    flexDirection: 'row',
  },
  leaveButton: {},
  participant: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.WHITE,
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
  videoButton: {
    backgroundColor: COLORS.BLUE_DARK,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  centerButtons: {
    flexDirection: 'row',
  },
  videoButtonGreen: {
    backgroundColor: COLORS.GREEN,
  },
  videoButtonRed: {
    backgroundColor: COLORS.RED,
  },
  filePresentationWrapper: {
    position: 'relative',
  },
  filePresentation: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
  filePresentationImage: {
    height: 100,
    width: 75,
  },

  spatialInputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spatialInputWrapper: {
    flex: 2,
  },
  spatialInput: {
    height: 40,
    margin: 4,
    borderWidth: 1,
    paddingLeft: 10,
  },
  spatialInputLabelWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
