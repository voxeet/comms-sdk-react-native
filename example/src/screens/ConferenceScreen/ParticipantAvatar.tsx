import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { Alert } from 'react-native';

import { DolbyIOContext } from '@components/DolbyIOProvider';
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

  const { conference } = useContext(DolbyIOContext);

  // first participant in conference.participants[] should be conference owner - this function takes away the option from other users to change conference owner permissions
  const checkIsOwner = (): boolean => {
    const participantIndex = conference?.participants.findIndex(
      (p) => p.id === participant.id
    );

    if (participantIndex === 0) {
      return true;
    } else {
      return false;
    }
  };

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
      onSelect: checkIsOwner()
        ? () => Alert.alert('Cannot update conference owner permissions')
        : () => setPermissionsModalActive(!permissionsModalActive),
      // onSelect: () => setPermissionsModalActive(!permissionsModalActive),
    },
  ];

  return (
    <Space mr="xs">
      <MenuOptionsButton options={options}>
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
