// @ts-ignore
import Chance from 'chance';
import React, { FunctionComponent, useState, useContext } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { MenuProvider } from 'react-native-popup-menu';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DolbyIOContext } from '@components/DolbyIOProvider';
import COLORS from '@constants/colors.constants';
import Button from '@ui/Button';
import Input from '@ui/Input';
import Space from '@ui/Space';
import Text from '@ui/Text';

import styles from './JoinScreen.style';
import { SpatialAudioStyle } from '@dolbyio/comms-sdk-react-native/models';
import { View } from 'react-native';
import { MenuOptionsButton, type Options } from '@ui/MenuOptionsButton/MenuOptionsButton';
import ExtendedOptions from '@ui/ExtendedOptions';
import Switch from '@ui/Switch';
import { NavigationContext, ScreenType } from '../../navigation/NavigationProvider';

const chance = new Chance();

const JoinScreen: FunctionComponent = () => {

  const [isDolbyVoice, setDolbyVoice] = useState(false);

  const [isLiveRecording, setLiveRecording] = useState(false);

  const [spatialAudioStyle, setSpatialAudioStyle] = useState(SpatialAudioStyle.DISABLED);

  const [alias, setAlias] = useState(`${chance.country({ full: true })}`);
  const { createAndJoin, replay, listen, getCurrentConference } = useContext(DolbyIOContext);
  const { setScreen } = useContext(NavigationContext);

  const createConference = async () => {
    await createAndJoin(alias, { dolbyVoice: isDolbyVoice, liveRecording: isLiveRecording, spatialAudioStyle: spatialAudioStyle });
    setScreen(ScreenType.ConferenceScreen);
  }

  const listenConference = () => {
    listen(alias);
  };

  const replayLastConference = () => {
    replay();
  };

  const onAudioPreviewButton = () => {
    setScreen(ScreenType.AudioPreviewScreen);
  }

  const onDoblyVoiceChanged = () => {
    var newValue = !isDolbyVoice;
    setDolbyVoice(newValue);
    if (!newValue) {
      setSpatialAudioStyle(SpatialAudioStyle.DISABLED);
    }
  }

  const onLiveRecordingChanged = () => {
    setLiveRecording(!isLiveRecording);
  }

  const spatialAudioOptions: Options = [
    {
      text: 'Disabled',
      value: 'DISABLED',
      onSelect: async () => {
        setSpatialAudioStyle(SpatialAudioStyle.DISABLED);
      },
    },
    {
      text: 'Individual',
      value: 'INDIVIDUAL',
      onSelect: async () => {
        setSpatialAudioStyle(SpatialAudioStyle.INDIVIDUAL);
      },
    },
    {
      text: 'Shared',
      value: 'SHARED',
      onSelect: async () => {
        setSpatialAudioStyle(SpatialAudioStyle.SHARED);
      },
    },
  ];

  const renderSpatialAudioChooser = () => {
    if (isDolbyVoice) {
      return (
        <Space mt='s'>
          <MenuOptionsButton options={spatialAudioOptions} >
            <View style={styles.menuSpatialAudio}>
              <Text size='s' color={COLORS.WHITE} align='center'>
                Choose Spatial audio style
              </Text>
            </View>
          </MenuOptionsButton>
        </Space>
      );
    } else {
      return;
    }
  }

  return (
    <MenuProvider
      customStyles={{
        backdrop: styles.menuBackdrop,
      }}
    >
      <LinearGradient colors={COLORS.GRADIENT} style={styles.wrapper}>
        <SafeAreaView style={styles.wrapper}>
          <Space mh="m" mv="s">
            <Space mt="s" style={styles.center}>
              <Text color={COLORS.WHITE} header size="m">
                Join the Conference
              </Text>
            </Space>
            <Space mt="l">
              <Input
                label="Conference alias"
                onChange={setAlias}
                value={alias}
              />
            </Space>
            <ExtendedOptions label='Conference options:' verticalSpace='m'>
              <Switch nativeID='dolbyVoice' label='Dolby voice' onValueChanged={onDoblyVoiceChanged} value={isDolbyVoice} verticalSpace='s' />
              <Switch nativeID='liveRecording' label='Live recording' onValueChanged={onLiveRecordingChanged} value={isLiveRecording} verticalSpace='s' />
              {renderSpatialAudioChooser()}
            </ExtendedOptions>
            <Space mt="m">
              <Button text="Create a new conference" onPress={createConference} />
            </Space>
            <Space mt="m">
              <Button
                text="Join as listener"
                onPress={listenConference}
              />
            </Space>
            <Space mt="m">
              <Button
                text="Replay last conference"
                onPress={replayLastConference}
              />
            </Space>
            <Space mt="m">
              {/* We need this button to test if getCurrent can return null */}
              <Button
                text="Get current conference"
                onPress={getCurrentConference}
              />
            </Space>
            <Space mt="m">
              <Button
                text="Audio Preview"
                onPress={onAudioPreviewButton}
              />
            </Space>
          </Space>
        </SafeAreaView>
      </LinearGradient>
    </MenuProvider>
  );
};

export default JoinScreen;
