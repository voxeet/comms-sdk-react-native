import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { MenuProvider } from 'react-native-popup-menu';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DolbyIOContext } from '@components/DolbyIOProvider';
import { FilePresentationContext } from '@components/FilePresentationHandler';
import { RecordingContext } from '@components/RecordingProvider';
import COLORS from '@constants/colors.constants';
import { VideoView } from '@dolbyio/react-native-iapi-sdk';
import LeaveConferenceButton from '@screens/ConferenceScreen/LeaveConferenceButton';
import { RecordingDotsText } from '@screens/ConferenceScreen/RecordingDots';
import Space from '@ui/Space';
import Text from '@ui/Text';
import { startVideo, stopVideo } from '@utils/conference.tester';

import type { Participant } from '../../../../src/services/conference/models';
import styles from './ConferenceScreen.style';
import ConferenceScreenBottomSheet from './ConferenceScreenBottomSheet';
import ParticipantAvatar from './ParticipantAvatar';

const ConferenceScreen: FunctionComponent = () => {
  const { me, conference, participants, activeParticipant } =
    useContext(DolbyIOContext);
  const { isRecording } = useContext(RecordingContext);
  const { fileSrc, isPresentingFile, fileOwnerName } = useContext(
    FilePresentationContext
  );

  const [scaleType, setScaleType] = useState<'fill' | 'fit'>('fill');

  const videoView = useRef() as React.MutableRefObject<VideoView>;

  useEffect(() => {
    if (videoView?.current) {
      if (activeParticipant?.streams?.length) {
        // @ts-ignore
        videoView.current.attach(
          activeParticipant,
          activeParticipant.streams[activeParticipant.streams.length - 1]
        );
        console.log('attach');
      } else {
        // @ts-ignore
        videoView.current.detach();
        console.log('detach');
      }
    }
  }, [activeParticipant]);

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
                mb="xs"
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
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
        </MenuProvider>
        <ConferenceScreenBottomSheet />
      </View>
      <View style={styles.layerVideo} pointerEvents="none">
        <VideoView
          ref={videoView}
          style={{ flex: 1, borderRadius: 50 }}
          scaleType={scaleType}
        />
      </View>
    </LinearGradient>
  );
};

export default ConferenceScreen;
