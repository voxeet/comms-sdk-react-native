import { StyleSheet } from 'react-native';

import COLORS from '@constants/colors.constants';

export default StyleSheet.create({
  initContainer: {
    zIndex: 100,
    left: 0,
    right: 0,
    position: 'absolute',
    top: 0,
  },
  container: {
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: COLORS.WHITE,
    marginRight: 20,
    shadowColor: COLORS.WHITE,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 100,
  },
  titleContainer: {
    flex: 1,
    width: '85%',
  },
  childContainer: {
    width: '100%',
    display: 'flex',
  },
  exitIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});
