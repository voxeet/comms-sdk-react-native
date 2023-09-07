import React, { FunctionComponent, useContext, useMemo, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { MenuProvider } from 'react-native-popup-menu';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DolbyIOContext } from '@components/DolbyIOProvider';
import { NavigationContext, ScreenType } from '../../navigation/NavigationProvider';
import { FilePresentationContext } from '@components/FilePresentationHandler';
import { RecordingContext } from '@components/RecordingProvider';
import COLORS from '@constants/colors.constants';
import LeaveConferenceButton from '@screens/ConferenceScreen/LeaveConferenceButton';
import { RecordingDotsText } from '@screens/ConferenceScreen/RecordingDots';
import VideoGallery from '@screens/ConferenceScreen/VideoGallery';
import Space from '@ui/Space';
import Text from '@ui/Text';
import { mute, unmute } from '@utils/conference.tester';
import { ParticipantStatus } from '@dolbyio/comms-sdk-react-native/models';
import styles from './ConferenceScreen.style';
import ConferenceScreenBottomSheet from './ConferenceScreenBottomSheet';
import MessageModal from './MessageModal';
import { startLocalVideo, stopLocalVideo } from '@utils/video.tester';

const DISPLAYED_STATUSES: ParticipantStatus[] = [
  ParticipantStatus.CONNECTED,
  ParticipantStatus.INACTIVE,
];

const ConferenceScreen: FunctionComponent = () => {
  const { me, conference, participants, leave, isBottomSheetVisible, setBottomSheetVisibility } = useContext(DolbyIOContext);
  const { setScreen } = useContext(NavigationContext);
  const { isRecording } = useContext(RecordingContext);
  const { fileSrc, isPresentingFile, fileOwnerName } = useContext(
    FilePresentationContext
  );

  const [scaleType, setScaleType] = useState<'fill' | 'fit'>('fill');
  const [isMessageModalActive, setIsMessageModalActive] =
    useState<boolean>(false);
  const [isVideoOn, setIsVideoOn] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const connectedParticipants = useMemo(() => {
    return participants.filter(
      (p) => p.status && DISPLAYED_STATUSES.includes(p.status)
    );
  }, [participants]);

  if (!conference || !me) {
    return <LinearGradient colors={COLORS.GRADIENT} style={styles.wrapper} />;
  }

  const onPressVideoButton = () => {
    if (isVideoOn) {
      stopLocalVideo();
    } else {
      startLocalVideo();
    }
    setIsVideoOn(!isVideoOn);
  };

  const onPressMuteButton = () => {
    if (isMuted) {
      unmute(me);
    } else {
      mute(me);
    }
    setIsMuted(!isMuted);
  };

  const onPressLeaveButton = async (closeSession: boolean) => {
    await leave(closeSession);
    if (closeSession) {
      setScreen(ScreenType.LoginScreen)
    } else {
      setScreen(ScreenType.JoinScreen);
    }
    
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
                <Space mb="s" ml="s" style={styles.topBar}>
                  <Space mr="m">
                    <Text size="s" align="center">
                      Conference: <Text weight="bold">{conference.alias}</Text>
                    </Text>

                  </Space>
                  <LeaveConferenceButton onPress={onPressLeaveButton} />
                </Space>
                {isRecording ? (
                  <RecordingDotsText text="Conference is being recorded" />
                ) : null}
              </Space>
              <View>
                <VideoGallery
                  participants={connectedParticipants}
                  scaleType={scaleType}
                />
              </View>
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
                    style={isMuted ? [styles.videoButton, styles.videoButtonRed] : [styles.videoButton, styles.videoButtonGreen]}
                    onPress={() => onPressMuteButton()}
                  >
                    <Text size="xs" align="center">
                      {isMuted ? 'UNMUTE ME' : 'MUTE ME'}
                    </Text>
                  </TouchableOpacity>
                </Space>
                <Space mh="xxs">
                  <TouchableOpacity
                    style={isVideoOn ? [styles.videoButton, styles.videoButtonRed] : [styles.videoButton, styles.videoButtonGreen]}
                    onPress={() => onPressVideoButton()}
                  >
                    <Text size="xs" align="center">
                      {isVideoOn ? 'STOP VIDEO' : 'START VIDEO'}
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
                <Space>
                  <TouchableOpacity
                    style={styles.videoButton}
                    onPress={() => {
                      setBottomSheetVisibility(true);
                    }}
                  >
                    <Text size="xxs" align="center">
                      TEST BUTTONS
                    </Text>
                  </TouchableOpacity>
                </Space>
              </View>
            </View>
          </SafeAreaView>
        </MenuProvider>
        {isBottomSheetVisible ? (<ConferenceScreenBottomSheet />) : null}
      </View>
      <MessageModal
        open={isMessageModalActive}
        closeModal={() => setIsMessageModalActive(false)}
      />
    </LinearGradient>
  );
};

export default ConferenceScreen;
