import React, { FunctionComponent } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import Space from '../Space';

import styles from './Screen.style';

type Screen = {
  children: string;
};

const Screen: FunctionComponent = ({ children }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Space vm="m" style={styles.wrapper}>
        {children}
      </Space>
    </SafeAreaView>
  );
};

export default Screen;
