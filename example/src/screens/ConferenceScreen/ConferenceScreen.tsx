import type {
  Participant,
  Conference,
} from '../../../../src/services/conference/models';
import { ConferencePermission } from '../../../../src/services/conference/models';
import styles from './ConferenceScreen.style';
import ParticipantAvatar from './ParticipantAvatar';
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
} from '@utils/conference.tester';
import {
  invite,
  decline,
  inviteRandomParticipant,
} from '@utils/notification.tester';
import {
  stop,
  start,
  getThumbnail,
  setPage,
} from '@utils/filePresentation.tester';
import {
  getCurrentRecording,
  startRecording,
  stopRecording,
} from '@utils/recording.tester';
import React, { FunctionComponent, useContext, useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { MenuProvider } from 'react-native-popup-menu';
import { SafeAreaView } from 'react-native-safe-area-context';

const ConferenceScreen: FunctionComponent = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { user, conference, leave } = useContext(DolbyIOContext);
  const { participants } = conference as Conference;

  if (!conference || !user) {
    return <LinearGradient colors={COLORS.GRADIENT} style={styles.wrapper} />;
  }

  return (
    <MenuProvider
      customStyles={{
        backdrop: styles.menuBackdrop,
      }}
    >
      <LinearGradient colors={COLORS.GRADIENT} style={styles.wrapper}>
        <SafeAreaView style={styles.wrapper}>
          <View style={styles.top}>
            <Space mh="m" mv="m">
              <Space mb="s" style={styles.topBar}>
                <Text size="xs">Logged as: {user.info.name}</Text>
                <TouchableOpacity style={styles.leaveButton} onPress={leave}>
                  <Text color={COLORS.WHITE}>LEAVE</Text>
                </TouchableOpacity>
              </Space>
              <Text size="s" align="center">
                Conference: <Text weight="bold">{conference.alias}</Text>
              </Text>
            </Space>
          </View>
          <View style={styles.center} />
          <View style={styles.bottom}>
            <Space mh="m" mt="m" mb="xs">
              <Text
                header
                size="s"
              >{`Participants (${participants.length})`}</Text>
            </Space>
            <Space mb="m">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Space mh="m" style={styles.participantsList}>
                  {participants.map((p: Participant) => (
                    <ParticipantAvatar key={p.id} {...p} />
                  ))}
                </Space>
              </ScrollView>
            </Space>
          </View>
        </SafeAreaView>
        <BottomSheet ref={bottomSheetRef} index={0} snapPoints={[100, 500]}>
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
                <Text size="s" color={COLORS.BLACK}>
                  Recording
                </Text>
              </Space>
              <Space mb="s" style={styles.actionButtons}>
                <Button
                  size="small"
                  color="dark"
                  text="Start recording"
                  onPress={startRecording}
                />
                <Button
                  size="small"
                  color="dark"
                  text="Stop recording"
                  onPress={stopRecording}
                />
                <Button
                  size="small"
                  color="dark"
                  text="Current recording"
                  onPress={getCurrentRecording}
                />
              </Space>
              <Space mb="xs">
                <Text size="s" color={COLORS.BLACK}>
                  Notification
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
                <Text size="s" color={COLORS.BLACK}>
                  Command
                </Text>
              </Space>
              <Space mb="s" style={styles.actionButtons}>
                <Button
                  size="small"
                  color="dark"
                  text="Send message"
                  onPress={() =>
                    sendCommandMessage(
                      'message for command service send method'
                    )
                  }
                />
              </Space>

              <Space mb="xs">
                <Text size="s" color={COLORS.BLACK}>
                  File presentation
                </Text>
              </Space>
              <Space mb="s" style={styles.actionButtons}>
                <Button size="small" color="dark" text="Stop" onPress={stop} />
                <Button
                  size="small"
                  color="dark"
                  text="Start"
                  onPress={start}
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
              </Space>
            </Space>
          </ScrollView>
        </BottomSheet>
      </LinearGradient>
    </MenuProvider>
  );
};

export default ConferenceScreen;
