import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: 'white',
    marginRight: 20,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  titleContainer: {
    display: 'flex',
    width: '85%',
  },
  exitIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});
