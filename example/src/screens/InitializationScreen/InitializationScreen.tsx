import React, { FunctionComponent, useContext, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import Space from '@ui/Space';
import Text from '@ui/Text';

import COLORS from '@constants/colors.constants';

import styles from './InitializationScreen.style';
import { DolbyIOContext } from '@components/DolbyIOProvider';

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
              EXAMPLE APP
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
