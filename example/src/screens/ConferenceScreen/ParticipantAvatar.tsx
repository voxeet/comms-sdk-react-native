import type { Participant } from '../../../../src/services/conference/models';
import COLORS from '@constants/colors.constants';
import Text from '@ui/Text';
import styles from './ConferenceScreen.style';
import React from 'react';
import { View } from 'react-native';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import { mute, kick } from '@utils/conference.tester';
import Space from '@ui/Space';

const ParticipantAvatar = (participant: Participant) => {
  const onSelect = async (optionValue: string) => {
    switch (optionValue) {
      case 'kick':
        await kick(participant);
        return;
      case 'mute':
        await mute(participant, true);
        return;
      case 'unmute':
        await mute(participant, false);
        return;
      default:
        return;
    }
  };

  return (
    <Space mr="xs">
      <Menu onSelect={onSelect}>
        <MenuTrigger triggerOnLongPress>
          <View style={styles.participant} key={participant.id}>
            <Text size="s" color={COLORS.BLACK}>
              {participant.info.name}
            </Text>
          </View>
        </MenuTrigger>
        <MenuOptions
          optionsContainerStyle={styles.optionsContainerStyle}
          customStyles={{
            optionWrapper: styles.optionWrapper,
            optionText: styles.optionText,
          }}
        >
          <MenuOption text="Kick" value="kick" />
          <MenuOption text="Mute" value="mute" />
          <MenuOption text="Unmute" value="unmute" />
        </MenuOptions>
      </Menu>
    </Space>
  );
};

export default ParticipantAvatar;
