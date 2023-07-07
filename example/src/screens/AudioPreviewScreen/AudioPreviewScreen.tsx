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
import {
  VoiceFont,
  AudioCaptureMode,
  NoiseReductionLevel,
} from '@dolbyio/comms-sdk-react-native/models';
import styles from './AudioPreviewScreen.style';
import {
  record,
  play,
  cancel,
  release,
} from '@utils/audioPreview.testers';
import type { Options } from '@ui/MenuOptionsButton/MenuOptionsButton';
import {
  setAudioCaptureMode,
} from '@utils/audio.tester';
import { View } from 'react-native';
import MenuOptionsButton from '@ui/MenuOptionsButton';
import { MenuProvider } from 'react-native-popup-menu';


const AudioPreviewScreen: FunctionComponent = () => {
  const { goToAudioPreviewScreen } = useContext(DolbyIOContext);

  const onBackButton = () => {
    goToAudioPreviewScreen(false);
  }

  const voiceFontAction: (voiceFont: VoiceFont) => () => void = (voiceFont) => {
    return () => setAudioCaptureMode({ mode: AudioCaptureMode.Standard, noiseReduction: NoiseReductionLevel.Low, voiceFont: voiceFont })
  };

  const options: Options = [
    {
      text: 'None',
      value: 'none',
      onSelect: async () => {
        voiceFontAction(VoiceFont.None);
      },
    },
    {
      text: 'Masculine',
      value: 'masculine',
      onSelect: async () => {
        voiceFontAction(VoiceFont.Masculine);
      },
    },
    {
      text: 'Feminine',
      value: 'feminine',
      onSelect: async () => {
        voiceFontAction(VoiceFont.Feminine);
      },
    },
    {
      text: 'Helium',
      value: 'helium',
      onSelect: async () => {
        voiceFontAction(VoiceFont.Helium);
      },
    },
    {
      text: 'Dark modulation',
      value: 'dark modulation',
      onSelect: async () => {
        voiceFontAction(VoiceFont.DarkModulation);
      },
    },
    {
      text: 'Broken robot',
      value: 'broken robot',
      onSelect: async () => {
        voiceFontAction(VoiceFont.BrokenRobot);
      },
    },
    {
      text: 'Interference',
      value: 'interference',
      onSelect: async () => {
        voiceFontAction(VoiceFont.Interference);
      },
    },
    {
      text: 'Abyss',
      value: 'abyss',
      onSelect: async () => {
        voiceFontAction(VoiceFont.Abyss);
      },
    },
    {
      text: 'Wobble',
      value: 'wobble',
      onSelect: async () => {
        voiceFontAction(VoiceFont.Wobble);
      },
    },
    {
      text: 'Starship captain',
      value: 'starship captain',
      onSelect: async () => {
        voiceFontAction(VoiceFont.StarshipCaptain);
      },
    },
    {
      text: 'Nervous robot',
      value: 'nervous robot',
      onSelect: async () => {
        voiceFontAction(VoiceFont.NervousRobot);
      },
    },
    {
      text: 'Swarm',
      value: 'swarm',
      onSelect: async () => {
        voiceFontAction(VoiceFont.Swarm);
      },
    },
    {
      text: 'AM radio',
      value: 'am radio',
      onSelect: async () => {
        voiceFontAction(VoiceFont.AmRadio);
      },
    },
  ];

  return (
    <LinearGradient colors={COLORS.GRADIENT} style={styles.wrapper}>
      <MenuProvider
        customStyles={{
          backdrop: styles.menuBackdrop,
        }}
      >
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
            <Space mb='l'>
              <MenuOptionsButton options={options} >
                <View style={styles.menuButton}>
                  <Text size="m" color={COLORS.WHITE} align='center'>
                    Choose Voice Font
                  </Text>
                </View>
              </MenuOptionsButton>

            </Space>
            <Space mh="m" mb="l">
              <Text header size="s" color={COLORS.WHITE} align='center'>
                Actions
              </Text>
            </Space>
            <Space mb="s" style={styles.actionButtons}>
              <Button
                size="small"
                color="dark"
                text="Record"
                onPress={record}
              />
              <Button
                size="small"
                color="dark"
                text="Play"
                onPress={play}
              />
              <Button
                size="small"
                color="dark"
                text="Cancel"
                onPress={cancel}
              />
              <Button
                size="small"
                color="dark"
                text="Release"
                onPress={release}
              />
            </Space>
            <Space mt="m">
              <Button
                text="Back to join screen"
                onPress={onBackButton}
              />
            </Space>
          </Space>
        </SafeAreaView>
      </MenuProvider>
    </LinearGradient>
  );
}

export default AudioPreviewScreen;