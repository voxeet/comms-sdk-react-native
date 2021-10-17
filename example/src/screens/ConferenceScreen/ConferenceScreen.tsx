import React, { FunctionComponent, useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { MenuProvider } from 'react-native-popup-menu';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DolbyIOContext } from '@components/DolbyIOProvider';
import COLORS from '@constants/colors.constants';
import Space from '@ui/Space';
import Text from '@ui/Text';

import type {
  Participant,
  Conference,
} from '../../../../src/services/conference/models';
import styles from './ConferenceScreen.style';
import ConferenceScreenBottomSheet from './ConferenceScreenBottomSheet';
import ParticipantAvatar from './ParticipantAvatar';

const ConferenceScreen: FunctionComponent = () => {
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
        <ConferenceScreenBottomSheet />
      </LinearGradient>
    </MenuProvider>
  );
};

export default ConferenceScreen;
