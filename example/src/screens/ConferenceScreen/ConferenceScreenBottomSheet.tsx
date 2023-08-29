import React, { useContext, useRef } from 'react';
import { Alert, Platform } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import type { FileConverted } from 'src/services/filePresentation/models';

import { DolbyIOContext } from '@components/DolbyIOProvider';
import { RecordingContext } from '@components/RecordingProvider';
import COLORS from '@constants/colors.constants';
import BottomSheet from '@gorhom/bottom-sheet';
import Button from '@ui/Button';
import Space from '@ui/Space';
import Text from '@ui/Text';
import {
  getAudioCaptureMode,
  getComfortNoiseLevel,
  setAudioCaptureMode,
  setComfortNoiseLevel,
  startLocalAudio,
  stopLocalAudio,
} from '@utils/audio.tester';
import { sendCommandMessage } from '@utils/command.tester';
import {
  getAudioLevel,
  current,
  getParticipant,
  getParticipants,
  isMuted,
  isSpeaking,
  setAudioProcessing,
  setMaxVideoForwarding,
  startScreenShare,
  stopScreenShare,
  getLocalStats,
  getStatus,
  getMaxVideoForwarding,
  getSpatialAudioStyle,
  videoForwarding,
} from '@utils/conference.tester';
import {
  stop,
  start,
  getThumbnail,
  setPage,
  convert,
  getCurrent,
  getImage,
} from '@utils/filePresentation.tester';
import {
  isFrontCamera,
  switchCamera,
  switchSpeaker,
} from '@utils/mediaDevice.tester';
import { inviteRandomParticipant } from '@utils/notification.tester';
import {
  getCurrentRecording, // startRecording,
  // stopRecording,
} from '@utils/recording.tester';
import { getCurrentUser, updateParticipantInfo } from '@utils/session.tester';
import {
  pauseVideoPresentation,
  startVideoPresentation,
  playVideoPresentation,
  stopVideoPresentation,
  seekVideoPresentation,
  currentVideoPresentation,
  stateOfVideoPresentation,
} from '@utils/videoPresentation.tester';

import { Conference, VoiceFont } from '@dolbyio/comms-sdk-react-native/models';
import styles from './ConferenceScreen.style';
import { 
  AudioProcessingOptions, 
  VideoForwardingStrategy, 
  AudioCaptureMode, 
  ComfortNoiseLevel, 
  NoiseReductionLevel 
} from '@dolbyio/comms-sdk-react-native/models';
import { startLocalVideo, stopLocalVideo } from '@utils/video.tester';

const ConferenceScreenBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { me, conference, setBottomSheetVisibility } = useContext(DolbyIOContext);
  const { startRecord, stopRecord } = useContext(RecordingContext);
  const { participants } = conference as Conference;
  let convertedFile: FileConverted | null = null;

  const convertFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.ppt,
          DocumentPicker.types.pptx,
        ],
      });
      //Printing the log related to the choosen file
      console.log('file result : ' + JSON.stringify(res));
      console.log('file uri : ' + res.uri);

      // Pass uri to convert method
      convertedFile = await convert({ url: res.uri });
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        Alert.alert('Canceled file picker');
      } else {
        //For Unknown Error
        Alert.alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  if (!conference || !me) {
    return <LinearGradient colors={COLORS.GRADIENT} style={styles.wrapper} />;
  }

  const comfortNoiseLevelOptions: Array<{
    text: string;
    onClick: () => void;
  }> = [
      {
        text: 'setComfortNoiseLevel - Default',
        onClick: () => setComfortNoiseLevel(ComfortNoiseLevel.Default),
      },
      {
        text: 'setComfortNoiseLevel - Low',
        onClick: () => setComfortNoiseLevel(ComfortNoiseLevel.Low),
      },
      {
        text: 'setComfortNoiseLevel - Medium',
        onClick: () => setComfortNoiseLevel(ComfortNoiseLevel.Medium),
      },
      {
        text: 'setComfortNoiseLevel - Off',
        onClick: () => setComfortNoiseLevel(ComfortNoiseLevel.Off),
      },
    ];

  const audioCaptureModeOptions: Array<{
    text: string;
    onClick: () => void;
  }> = [
      {
        text: 'setAudioCaptureMode - standard low',
        onClick: () => setAudioCaptureMode({ mode: AudioCaptureMode.Standard, noiseReduction: NoiseReductionLevel.Low }),
      },
      {
        text: 'setAudioCaptureMode - standard high',
        onClick: () => setAudioCaptureMode({ mode: AudioCaptureMode.Standard, noiseReduction: NoiseReductionLevel.High }),
      },
      {
        text: 'setAudioCaptureMode - Unprocessed',
        onClick: () => setAudioCaptureMode({ mode: AudioCaptureMode.Unprocessed }),
      },
    ];

  const voiceFontAction: (voiceFont: VoiceFont) => () => void = (voiceFont) => { 
    return  () => setAudioCaptureMode({ mode: AudioCaptureMode.Standard, noiseReduction: NoiseReductionLevel.Low, voiceFont: voiceFont }) 
  };
  const voiceFontOptions: Array<{
    text: string;
    onClick: () => void;
  }> = [
      {
        text: 'None',
        onClick: voiceFontAction(VoiceFont.None),
      },
      {
        text: 'Masculine',
        onClick: voiceFontAction(VoiceFont.Masculine),
      },
      {
        text: 'Feminine',
        onClick: voiceFontAction(VoiceFont.Feminine),
      },
      {
        text: 'Helium',
        onClick: voiceFontAction(VoiceFont.Helium),
      },
      {
        text: 'Dark modulation',
        onClick: voiceFontAction(VoiceFont.DarkModulation),
      },
      {
        text: 'Broken robot',
        onClick: voiceFontAction(VoiceFont.BrokenRobot),
      },
      {
        text: 'Interference',
        onClick: voiceFontAction(VoiceFont.Interference),
      },
      {
        text: 'Abyss',
        onClick: voiceFontAction(VoiceFont.Abyss),
      },
      {
        text: 'Wobble',
        onClick: voiceFontAction(VoiceFont.Wobble),
      },
      {
        text: 'Starship captain',
        onClick: voiceFontAction(VoiceFont.StarshipCaptain),
      },
      {
        text: 'Nervous robot',
        onClick: voiceFontAction(VoiceFont.NervousRobot),
      },
      {
        text: 'Swarm',
        onClick: voiceFontAction(VoiceFont.Swarm),
      },
      {
        text: 'AM radio',
        onClick: voiceFontAction(VoiceFont.AmRadio),
      },
    ];

  const audioOptions: AudioProcessingOptions = {
    send: {
      audioProcessing: true,
    },
  };

  return (
    <BottomSheet ref={bottomSheetRef} index={0} snapPoints={['40%', '80%']} enablePanDownToClose={true} onClose={() => setBottomSheetVisibility(false)}>
      <ScrollView>
        <Space mh="m" mb="s">
          <Text header size="s" color={COLORS.BLACK}>
            Actions
          </Text>
        </Space>
        <Space mh="m" mb="m">
          <Space mb="xs">
            <Text size="m" color={COLORS.BLACK}>
              Conference Service
            </Text>
          </Space>
          <Space mb="s" style={styles.actionButtons}>
            <Button
              size="small"
              color="dark"
              text="Get current"
              onPress={current}
            />
            <Button
              size="small"
              color="dark"
              text="Get local stats"
              onPress={getLocalStats}
            />
            <Button
              size="small"
              color="dark"
              text="Get audio level"
              onPress={() => getAudioLevel(me)}
            />
            <Button
              size="small"
              color="dark"
              text="Get conference status"
              onPress={() => getStatus(conference)}
            />
            <Button
              size="small"
              color="dark"
              text="Get max video forwarding"
              onPress={getMaxVideoForwarding}
            />
            <Button
              size="small"
              color="dark"
              text="Get spatial audio style"
              onPress={getSpatialAudioStyle}
            />
            <Button
              size="small"
              color="dark"
              text="Get Participant"
              onPress={() => getParticipant(participants[0].id)}
            />
            <Button
              size="small"
              color="dark"
              text="Get Participants"
              onPress={() => getParticipants(conference)}
            />
            <Button
              size="small"
              color="dark"
              text="Check is muted"
              onPress={isMuted}
            />
            <Button
              size="small"
              color="dark"
              text="Check is speaking"
              onPress={() => isSpeaking(participants[0])}
            />
            <Button
              size="small"
              color="dark"
              text="Set Audio Processing"
              onPress={() => setAudioProcessing(audioOptions)}
            />
            <Button
              size="small"
              color="dark"
              text="Set Max Video Forwarding"
              onPress={() => setMaxVideoForwarding(2)}
            />
            <Button
              size="small"
              color="dark"
              text="Set VFS - CLOSEST USER"
              onPress={() => videoForwarding(2, VideoForwardingStrategy.CLOSEST_USER)}
            />
            <Button
              size="small"
              color="dark"
              text="Set VFS - LAST SPEAKER"
              onPress={() => videoForwarding(2, VideoForwardingStrategy.LAST_SPEAKER)}
            />
            <Button
              size="small"
              color="dark"
              text="Start screen share"
              onPress={startScreenShare}
            />
            <Button
              size="small"
              color="dark"
              text="Stop screen share"
              onPress={stopScreenShare}
            />
          </Space>
          <Space mb="xs">
            <Text size="s" color={COLORS.BLACK}>
              Audio service
            </Text>
          </Space>
          <Button
              size="small"
              color="dark"
              text="Start local audio"
              onPress={() => startLocalAudio()}
            />
            <Button
              size="small"
              color="dark"
              text="Stop local audio"
              onPress={() => stopLocalAudio()}
            />
          <Space mb="s" style={styles.actionButtons}>
            <Button
              size="small"
              color="dark"
              text="getComfortNoiseLevel"
              onPress={getComfortNoiseLevel}
            />
            {comfortNoiseLevelOptions.map((option) => {
              return (
                <Button
                  key={option.text}
                  size="small"
                  color="dark"
                  text={option.text}
                  onPress={option.onClick}
                />
              );
            })}
            <Button
              size="small"
              color="dark"
              text="getAudioCaptureMode"
              onPress={getAudioCaptureMode}
            />
            {audioCaptureModeOptions.map((option) => {
              return (
                <Button
                  key={option.text}
                  size="small"
                  color="dark"
                  text={option.text}
                  onPress={option.onClick}
                />
              );
            })}
          </Space>
          <Space mb="xs">
            <Text size="s" color={COLORS.BLACK}>
              Voice Font
            </Text>
          </Space>
          <Space mb="s" style={styles.actionButtons}>
            {voiceFontOptions.map((option) => {
                return (
                  <Button
                    key={option.text}
                    size="small"
                    color="dark"
                    text={option.text}
                    onPress={option.onClick}
                  />
                );
              })}
          </Space>
          
          <Space mb="xs">
            <Text size="s" color={COLORS.BLACK}>
              Video service
            </Text>
          </Space>
          <Space mb="s" style={styles.actionButtons}>
            <Button
              size="small"
              color="dark"
              text="Start local video"
              onPress={() => startLocalVideo()}
            />
            <Button
              size="small"
              color="dark"
              text="Stop local video"
              onPress={() => stopLocalVideo()}
            />
          </Space>

          <Space mb="xs">
            <Text size="m" color={COLORS.BLACK}>
              Command service
            </Text>
          </Space>
          <Space mb="s" style={styles.actionButtons}>
            <Button
              size="small"
              color="dark"
              text="Send message"
              onPress={() =>
                sendCommandMessage('message for command service send method')
              }
            />
          </Space>

          <Space mb="xs">
            <Text size="m" color={COLORS.BLACK}>
              File presentation service
            </Text>
          </Space>
          <Space mb="s" style={styles.actionButtons}>
            <Button size="small" color="dark" text="Stop" onPress={stop} />
            <Button
              size="small"
              color="dark"
              text="Start"
              onPress={() => start(convertedFile)}
            />
            <Button
              size="small"
              color="dark"
              text="Get thumbnail"
              onPress={() => getThumbnail(1)}
            />
            <Button
              size="small"
              color="dark"
              text="Set page"
              onPress={() => setPage(2)}
            />
            <Button
              size="small"
              color="dark"
              text="Convert"
              onPress={convertFile}
            />
            <Button
              size="small"
              color="dark"
              text="Get current"
              onPress={getCurrent}
            />
            <Button
              size="small"
              color="dark"
              text="Get image"
              onPress={() => getImage(2)}
            />
          </Space>
          <Space mb="xs">
            <Text size="m" color={COLORS.BLACK}>
              Notification service
            </Text>
          </Space>
          <Space mb="s" style={styles.actionButtons}>
            <Button
              size="small"
              color="dark"
              text="Invite"
              onPress={() => inviteRandomParticipant(conference)}
            />
          </Space>
          <Space mb="xs">
            <Text size="m" color={COLORS.BLACK}>
              Recording service
            </Text>
          </Space>
          <Space mb="s" style={styles.actionButtons}>
            <Button
              size="small"
              color="dark"
              text="Start recording"
              onPress={startRecord}
            />
            <Button
              size="small"
              color="dark"
              text="Stop recording"
              onPress={stopRecord}
            />
            <Button
              size="small"
              color="dark"
              text="Current recording"
              onPress={getCurrentRecording}
            />
          </Space>
          <Space mb="xs">
            <Text size="m" color={COLORS.BLACK}>
              Session Service
            </Text>
          </Space>
          <Space mb="s" style={styles.actionButtons}>
            <Button
              size="small"
              color="dark"
              text="Update participant info"
              onPress={updateParticipantInfo}
            />
            <Button
              size="small"
              color="dark"
              text="Get Current User"
              onPress={getCurrentUser}
            />
          </Space>
          <Space mb="xs">
            <Text size="m" color={COLORS.BLACK}>
              Video presentation Service
            </Text>
          </Space>
          <Space mb="s" style={styles.actionButtons}>
            <Button
              size="small"
              color="dark"
              text="Start video presentation"
              onPress={() =>
                startVideoPresentation(
                  'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1'
                )
              }
            />
            <Button
              size="small"
              color="dark"
              text="Pause video presentation"
              onPress={pauseVideoPresentation}
            />
            <Button
              size="small"
              color="dark"
              text="Play video presentation"
              onPress={playVideoPresentation}
            />
            <Button
              size="small"
              color="dark"
              text="Stop video presentation"
              onPress={stopVideoPresentation}
            />
            <Button
              size="small"
              color="dark"
              text="Seek video presentation"
              onPress={seekVideoPresentation}
            />
            <Button
              size="small"
              color="dark"
              text="Current video presentation"
              onPress={currentVideoPresentation}
            />
            <Button
              size="small"
              color="dark"
              text="Current video presentation state"
              onPress={stateOfVideoPresentation}
            />
          </Space>
          <Space mb="xs">
            <Text size="m" color={COLORS.BLACK}>
              Media Device Service
            </Text>
          </Space>
          <Space mb="s" style={styles.actionButtons}>
            <Button
              size="small"
              color="dark"
              text="isFrontCamera"
              onPress={isFrontCamera}
            />
            <Button
              size="small"
              color="dark"
              text="switchCamera"
              onPress={switchCamera}
            />
            {Platform.OS === 'ios' && (
              <Button
                size="small"
                color="dark"
                text="switchSpeaker"
                onPress={switchSpeaker}
              />
            )}
          </Space>
        </Space>
      </ScrollView>
    </BottomSheet>
  );
};

export default ConferenceScreenBottomSheet;
