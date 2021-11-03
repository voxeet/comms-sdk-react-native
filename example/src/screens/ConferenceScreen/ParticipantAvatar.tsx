import React, { useState } from 'react';
import { View } from 'react-native';

import COLORS from '@constants/colors.constants';
import MenuOptionsButton from '@ui/MenuOptionsButton';
import type { Options } from '@ui/MenuOptionsButton/MenuOptionsButton';
import Space from '@ui/Space';
import Text from '@ui/Text';
import { mute, kick } from '@utils/conference.tester';

import type { Participant } from '../../../../src/services/conference/models';
import styles from './ConferenceScreen.style';
import UpdatePermissionsModal from './UpdatePermissionsModal';

const ParticipantAvatar = (participant: Participant) => {
  const [permissionsModalActive, setPermissionsModalActive] = useState(false);

  const options: Options = [
    {
      text: 'kick',
      value: 'kick',
      onSelect: async () => {
        await kick(participant);
      },
    },
    {
      text: 'mute',
      value: 'mute',
      onSelect: async () => {
        await mute(participant, true);
      },
    },
    {
      text: 'unmute',
      value: 'unmute',
      onSelect: async () => {
        await mute(participant, false);
      },
    },
    {
      text: 'update permissions',
      value: 'update permissions',
      onSelect: () => setPermissionsModalActive(!permissionsModalActive),
    },
  ];

  return (
    <Space mr="xs">
      <MenuOptionsButton options={options} longPress>
        <View style={styles.participant} key={participant.id}>
          <Text size="s" color={COLORS.BLACK}>
            {participant.info.name}
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
