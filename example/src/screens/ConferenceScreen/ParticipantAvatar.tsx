import React, { useState } from 'react';
import { View } from 'react-native';

import COLORS from '@constants/colors.constants';
import MenuOptionsButton from '@ui/MenuOptionsButton';
import type { Options } from '@ui/MenuOptionsButton/MenuOptionsButton';
import Space from '@ui/Space';
import Text from '@ui/Text';
import { mute, kick, isSpeaking } from '@utils/conference.tester';

import type { Participant } from '../../../../src/services/conference/models';
import styles from './ConferenceScreen.style';
import UpdatePermissionsModal from './UpdatePermissionsModal';

const ParticipantAvatar = (participant: Participant) => {
  const [permissionsModalActive, setPermissionsModalActive] = useState(false);

  const options: Options = [
    {
      text: 'Kick',
      value: 'kick',
      onSelect: async () => {
        await kick(participant);
      },
    },
    {
      text: 'Mute',
      value: 'mute',
      onSelect: async () => {
        await mute(participant, true);
      },
    },
    {
      text: 'Unmute',
      value: 'unmute',
      onSelect: async () => {
        await mute(participant, false);
      },
    },
    {
      text: 'isSpeaking',
      value: 'isspeaking',
      onSelect: async () => {
        await isSpeaking(participant);
      },
    },
    {
      text: 'Update permissions',
      value: 'update permissions',
      onSelect: () => setPermissionsModalActive(!permissionsModalActive),
    },
  ];

  return (
    <Space mr="xs">
      <MenuOptionsButton options={options}>
        <View style={styles.participant} key={participant.id}>
          <Text size="s" color={COLORS.WHITE}>
            {participant.info.name}
            <Text size="s" color={COLORS.WHITE}>
              ({participant.status})
            </Text>
          </Text>
        </View>
      </MenuOptionsButton>
      <UpdatePermissionsModal
        participant={participant}
        open={permissionsModalActive}
        closeModal={() => setPermissionsModalActive(false)}
      />
    </Space>
  );
};

export default ParticipantAvatar;
