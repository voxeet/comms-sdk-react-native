import React, { FunctionComponent, useContext, useMemo, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { MenuProvider } from 'react-native-popup-menu';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DolbyIOContext } from '@components/DolbyIOProvider';
import { FilePresentationContext } from '@components/FilePresentationHandler';
import { RecordingContext } from '@components/RecordingProvider';
import COLORS from '@constants/colors.constants';
import LeaveConferenceButton from '@screens/ConferenceScreen/LeaveConferenceButton';
import { RecordingDotsText } from '@screens/ConferenceScreen/RecordingDots';
import VideoGallery from '@screens/ConferenceScreen/VideoGallery';
import Space from '@ui/Space';
import Text from '@ui/Text';
import { startVideo, stopVideo } from '@utils/conference.tester';

import { ParticipantStatus } from '../../../../src/services/conference/models';
import type { Participant } from '../../../../src/services/conference/models';
import styles from './ConferenceScreen.style';
import ConferenceScreenBottomSheet from './ConferenceScreenBottomSheet';
import ParticipantAvatar from './ParticipantAvatar';

const DISPLAYED_STATUSES: ParticipantStatus[] = [
  ParticipantStatus.CONNECTED,
  ParticipantStatus.INACTIVE,
];

const ConferenceScreen: FunctionComponent = () => {
  const { me, conference, participants } = useContext(DolbyIOContext);
  const { isRecording } = useContext(RecordingContext);
  const { fileSrc, isPresentingFile, fileOwnerName } = useContext(
    FilePresentationContext
  );

  const [scaleType, setScaleType] = useState<'fill' | 'fit'>('fill');

  const connectedParticipants = useMemo(() => {
    return participants.filter(
      (p) => p.status && DISPLAYED_STATUSES.includes(p.status)
    );
  }, [participants]);

  if (!conference || !me) {
    return <LinearGradient colors={COLORS.GRADIENT} style={styles.wrapper} />;
  }

  return (
    <LinearGradient colors={COLORS.GRADIENT} style={styles.wrapper}>
      <View style={styles.layerInfo}>
        <MenuProvider
          customStyles={{
            backdrop: styles.menuBackdrop,
          }}
        >
          <SafeAreaView style={styles.wrapper}>
            <View style={styles.top}>
              <Space mh="m" mv="m">
                <Space mb="s" style={styles.topBar}>
                  <Text size="xs">Logged as: {me.info.name}</Text>
                  <LeaveConferenceButton />
                </Space>
                <Text size="s" align="center">
                  Conference: <Text weight="bold">{conference.alias}</Text>
                </Text>
                {isRecording ? (
                  <RecordingDotsText text="Conference is being recorded" />
                ) : null}
              </Space>
            </View>

            {isPresentingFile && fileSrc ? (
              <View style={styles.filePresentationWrapper}>
                <View style={styles.filePresentation}>
                  <Text>File presentation by: {fileOwnerName}</Text>
                  <Image
                    style={styles.filePresentationImage}
                    source={{ uri: fileSrc }}
                  />
                </View>
              </View>
            ) : null}

            <View style={styles.center}>
              <View style={styles.centerButtons}>
                <Space mh="xxs">
                  <TouchableOpacity
                    style={[styles.videoButton, styles.videoButtonGreen]}
                    onPress={() => startVideo(me)}
                  >
                    <Text size="xs" align="center">
                      START VIDEO
                    </Text>
                  </TouchableOpacity>
                </Space>
                <Space mh="xxs">
                  <TouchableOpacity
                    style={[styles.videoButton, styles.videoButtonRed]}
                    onPress={() => stopVideo(me)}
                  >
                    <Text size="xs" align="center">
                      STOP VIDEO
                    </Text>
                  </TouchableOpacity>
                </Space>
                <Space mh="xxs">
                  <TouchableOpacity
                    style={styles.videoButton}
                    onPress={() => {
                      setScaleType(scaleType === 'fill' ? 'fit' : 'fill');
                    }}
                  >
                    <Text size="xs" align="center">
                      FILL/FIT
                    </Text>
                  </TouchableOpacity>
                </Space>
              </View>
            </View>
            <View style={styles.bottom}>
              <Space
                mh="m"
                mt="m"
                mb="s"
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  header
                  size="s"
                >{`Participants (${connectedParticipants.length})`}</Text>
              </Space>
              <Space mb="m">
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <Space mh="m" style={styles.participantsList}>
                    {connectedParticipants.map((p: Participant) => (
                      <ParticipantAvatar key={p.id} {...p} />
                    ))}
                  </Space>
                </ScrollView>
              </Space>
            </View>
          </SafeAreaView>
        </MenuProvider>
        <ConferenceScreenBottomSheet />
      </View>
      <View style={styles.layerVideo} pointerEvents="none">
        <VideoGallery
          participants={connectedParticipants}
          scaleType={scaleType}
        />
      </View>
    </LinearGradient>
  );
};

export default ConferenceScreen;
