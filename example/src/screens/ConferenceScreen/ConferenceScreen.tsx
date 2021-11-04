import React, { FunctionComponent, useContext } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { MenuProvider } from 'react-native-popup-menu';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DolbyIOContext } from '@components/DolbyIOProvider';
import { RecordingContext } from '@components/RecordingProvider';
import COLORS from '@constants/colors.constants';
// import { VideoView } from '@dolbyio/react-native-iapi-sdk';
import LeaveConferenceButton from '@screens/ConferenceScreen/LeaveConferenceButton';
import { RecordingDotsText } from '@screens/ConferenceScreen/RecordingDots';
import Space from '@ui/Space';
import Text from '@ui/Text';

import type {
  Participant, // Conference,
} from '../../../../src/services/conference/models';
import styles from './ConferenceScreen.style';
import ConferenceScreenBottomSheet from './ConferenceScreenBottomSheet';
import ParticipantAvatar from './ParticipantAvatar';

const ConferenceScreen: FunctionComponent = () => {
  const { me, conference, participants } = useContext(DolbyIOContext);
  const { isRecording } = useContext(RecordingContext);

  // const videoView = useRef(null);

  // useEffect(() => {
  //   if (videoView) {
  //     if (activeUser?.streams?.length) {
  //       videoView.current.attach(activeUser, activeUser.streams[0]);
  //       console.log('attach');
  //     } else {
  //       videoView.current.detach();
  //       console.log('detach');
  //     }
  //   }
  // }, [activeUser]);

  if (!conference || !me) {
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
          <View style={styles.center}>{/*<VideoView ref={videoView} />*/}</View>
          <View style={styles.bottom}>
            <Space
              mh="m"
              mt="m"
              mb="xs"
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
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
        <ConferenceScreenBottomSheet />
      </LinearGradient>
    </MenuProvider>
  );
};

export default ConferenceScreen;
