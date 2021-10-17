import React, { FunctionComponent, useContext, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DolbyIOContext } from '@components/DolbyIOProvider';
import COLORS from '@constants/colors.constants';
import Space from '@ui/Space';
import Text from '@ui/Text';

import styles from './InitializationScreen.style';

const InitializationScreen: FunctionComponent = () => {
  const { initialize } = useContext(DolbyIOContext);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <LinearGradient colors={COLORS.GRADIENT} style={styles.wrapper}>
      <SafeAreaView style={styles.wrapper}>
        <Space mh="m" mv="s">
          <Space mb="l">
            <Text color={COLORS.WHITE} header>
              Dolby.io
            </Text>
            <Text color={COLORS.WHITE} size="s">
              IAPI SDK for React Native
            </Text>
            <Text color={COLORS.WHITE} size="xs" header>
              TEST APP
            </Text>
          </Space>
          <Text color={COLORS.WHITE} header size="s">
            Initializing
          </Text>
        </Space>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default InitializationScreen;
