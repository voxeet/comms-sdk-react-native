// @ts-ignore
import Chance from 'chance';
import React, {
    FunctionComponent,
    useContext,
  } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '@constants/colors.constants';
import Space from '@ui/Space';
import Text from '@ui/Text';
import Button from '@ui/Button';
import { DolbyIOContext } from '@components/DolbyIOProvider';

import styles from './AudioPreviewScreen.style';


const AudioPreviewScreen: FunctionComponent = () => {
    const { goToAudioPreviewScreen } = useContext(DolbyIOContext);

    const onBackButton = () => {
      goToAudioPreviewScreen(false);
    }

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
              <Space mt="m">
              <Button
                text="Back to join screen"
                onPress={onBackButton}
              />
            </Space>
            </Space>
          </SafeAreaView>
        </LinearGradient>
    );
}

export default AudioPreviewScreen;