import React, { FunctionComponent } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import Space from '../Space';

import styles from './Screen.style';

type Screen = {
  children: string;
};

type ScreenProps = {
  children: React.ReactNode;
};

const Screen: FunctionComponent<ScreenProps> = ({ children }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Space vm="m" style={styles.wrapper}>
        {children}
      </Space>
    </SafeAreaView>
  );
};

export default Screen;
