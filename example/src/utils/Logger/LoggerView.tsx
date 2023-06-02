import React from 'react';
import { View } from 'react-native';
import LoggerList from './LoggerList';
import styles from './Logger.style';

interface Props {
    isVisible: boolean;
    isTouchable: boolean;
  }
  
const LoggerView: React.FC<Props> = ({isVisible, isTouchable}) => {
    if (!isVisible) {
        return null
    }

  return (
      <View style={[styles.main, (isTouchable ? styles.visible : styles.transparent)]} {...(isTouchable ? null : {pointerEvents:'none'})}>
        <LoggerList />
      </View>
  );
};

export default LoggerView;
