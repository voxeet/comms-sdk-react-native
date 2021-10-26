import React, { useContext, useRef } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

import { DolbyIOContext } from '@components/DolbyIOProvider';
import COLORS from '@constants/colors.constants';
import BottomSheet from '@gorhom/bottom-sheet';
import Button from '@ui/Button';
import Space from '@ui/Space';
import Text from '@ui/Text';
import { sendCommandMessage } from '@utils/command.tester';
import {
  startVideo,
  stopVideo,
  startAudio,
  stopAudio,
  getAudioLevel,
  current,
  getParticipant,
  getParticipants,
  isOutputMuted,
  isMuted,
  isSpeaking,
  setAudioProcessing,
  setMaxVideoForwarding,
  updatePermissions,
  startScreenShare,
  stopScreenShare,
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
  invite,
  decline,
  inviteRandomParticipant,
} from '@utils/notification.tester';
import {
  getCurrentRecording,
  startRecording,
  stopRecording,
} from '@utils/recording.tester';
import { getCurrentUser } from '@utils/session.tester';
import {
  pauseVideoPresentation,
  startVideoPresentation,
  playVideoPresentation,
  stopVideoPresentation,
  seekVideoPresentation,
  currentVideoPresentation,
  stateOfVideoPresentation,
} from '@utils/videoPresentation.tester';

import type { Conference } from '../../../../src/services/conference/models';
import { ConferencePermission } from '../../../../src/services/conference/models';
import styles from './ConferenceScreen.style';

const ConferenceScreenBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { user, conference, setIsRecordingConference } =
    useContext(DolbyIOContext);
  const { participants } = conference as Conference;

  if (!conference || !user) {
    return <LinearGradient colors={COLORS.GRADIENT} style={styles.wrapper} />;
  }

  return (
    <BottomSheet ref={bottomSheetRef} index={0} snapPoints={[60, 500]}>
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
              text="Check output muted"
              onPress={isOutputMuted}
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
              onPress={setAudioProcessing}
            />
            <Button
              size="small"
              color="dark"
              text="Set Max Video Forwarding"
              onPress={setMaxVideoForwarding}
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
            <Button
              size="small"
              color="dark"
              text="Update Permissions nodata"
              onPress={() => updatePermissions([])}
            />
            <Button
              size="small"
              color="dark"
              text="Update Permissions random data"
              onPress={() =>
                updatePermissions([
                  {
                    participant: participants[0],
                    permissions: [ConferencePermission.KICK],
                  },
                ])
              }
            />
          </Space>
          <Space mb="xs">
            <Text size="s" color={COLORS.BLACK}>
              Audio
            </Text>
          </Space>
          <Space mb="s" style={styles.actionButtons}>
            <Button
              size="small"
              color="dark"
              text="Get audio level"
              onPress={() => getAudioLevel(user)}
            />
            <Button
              size="small"
              color="dark"
              text="Start audio"
              onPress={() => startAudio(user)}
            />
            <Button
              size="small"
              color="dark"
              text="Stop audio"
              onPress={() => stopAudio(user)}
            />
          </Space>
          <Space mb="xs">
            <Text size="s" color={COLORS.BLACK}>
              Video
            </Text>
          </Space>
          <Space mb="s" style={styles.actionButtons}>
            <Button
              size="small"
              color="dark"
              text="Start video"
              onPress={() => startVideo(user)}
            />
            <Button
              size="small"
              color="dark"
              text="Stop video"
              onPress={() => stopVideo(user)}
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
            <Button size="small" color="dark" text="Start" onPress={start} />
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
              onPress={convert}
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
              onPress={() => invite(conference, [])}
            />
            <Button
              size="small"
              color="dark"
              text="Invite with permissions"
              onPress={() => inviteRandomParticipant(conference)}
            />
            <Button
              size="small"
              color="dark"
              text="Decline"
              onPress={() => decline(conference)}
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
              onPress={async () => {
                await startRecording();
                setIsRecordingConference(true);
              }}
            />
            <Button
              size="small"
              color="dark"
              text="Stop recording"
              onPress={async () => {
                await stopRecording();
                setIsRecordingConference(false);
              }}
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
                  'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                )
              }
            />
          </Space>
          <Space mb="s" style={styles.actionButtons}>
            <Button
              size="small"
              color="dark"
              text="Pause video presentation"
              onPress={pauseVideoPresentation}
            />
          </Space>
          <Space mb="s" style={styles.actionButtons}>
            <Button
              size="small"
              color="dark"
              text="Play video presentation"
              onPress={playVideoPresentation}
            />
          </Space>
          <Space mb="s" style={styles.actionButtons}>
            <Button
              size="small"
              color="dark"
              text="Stop video presentation"
              onPress={stopVideoPresentation}
            />
          </Space>
          <Space mb="s" style={styles.actionButtons}>
            <Button
              size="small"
              color="dark"
              text="Seek video presentation"
              onPress={seekVideoPresentation}
            />
          </Space>
          <Space mb="s" style={styles.actionButtons}>
            <Button
              size="small"
              color="dark"
              text="Current video presentation"
              onPress={currentVideoPresentation}
            />
          </Space>
          <Space mb="s" style={styles.actionButtons}>
            <Button
              size="small"
              color="dark"
              text="Current video presentation state"
              onPress={stateOfVideoPresentation}
            />
          </Space>
        </Space>
      </ScrollView>
    </BottomSheet>
  );
};

export default ConferenceScreenBottomSheet;
