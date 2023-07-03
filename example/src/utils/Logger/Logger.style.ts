import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    main: {
        position:'absolute',
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0
    },
    visible: {
        opacity: 1
    },
    transparent: {
        opacity: 0.5
    },
    container: {
        flex: 1,
        paddingTop: 20,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    header: {
        color: 'white'
    },
    item: {
        color: 'white'
    }
});