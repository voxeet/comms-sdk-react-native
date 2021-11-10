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
  const { activeParticipant, setActiveParticipantId } =
    useContext(DolbyIOContext);

  const { conference } = useContext(DolbyIOContext);

  // first participant in conference.participants[] should be conference owner - this function takes away the option from other users to change conference owner permissions

  const checkIsOwner =
    conference?.participants.findIndex((p) => p.id === participant.id) === 0;

  const options: Options = [
    {
      text: 'Set as active',
      value: 'setAsActive',
      onSelect: () => {
        setActiveParticipantId(participant.id);
      },
    },
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
      text: 'Update permissions',
      value: 'update permissions',
      onSelect: checkIsOwner
        ? () => Alert.alert('Cannot update conference owner permissions')
        : () => setPermissionsModalActive(!permissionsModalActive),
      // onSelect: () => setPermissionsModalActive(!permissionsModalActive),
    },
  ];

  const isActive = activeParticipant && activeParticipant.id === participant.id;

  return (
    <Space mr="xs">
      <MenuOptionsButton options={options}>
        <View
          style={[styles.participant, isActive && styles.activeParticipant]}
          key={participant.id}
        >
          <Text size="s" color={isActive ? COLORS.BLACK : COLORS.WHITE}>
            {participant.info.name}
            <Text size="xxs" color={isActive ? COLORS.BLACK : COLORS.WHITE}>
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
