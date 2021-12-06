import React, { useState, useContext } from 'react';
import { View, Alert } from 'react-native';

import { DolbyIOContext } from '@components/DolbyIOProvider';
import COLORS from '@constants/colors.constants';
import MenuOptionsButton from '@ui/MenuOptionsButton';
import type { Options } from '@ui/MenuOptionsButton/MenuOptionsButton';
import Space from '@ui/Space';
import Text from '@ui/Text';
import { mute, kick } from '@utils/conference.tester';

import type { Participant } from '../../../../src/services/conference/models';
import styles from './ConferenceScreen.style';
import SpatialConfigModal from './SpatialConfigModal';
import { SpatialConfigModalTypeModel } from './SpatialConfigModal';
import UpdatePermissionsModal from './UpdatePermissionsModal';

const ParticipantAvatar = (participant: Participant) => {
  const { me } = useContext(DolbyIOContext);
  const [permissionsModalActive, setPermissionsModalActive] = useState(false);

  const [spatialConfigModalActive, setSpatialConfigModalActive] =
    useState(false);
  const [spatialConfigModalType, setSpatialConfigModalType] =
    useState<SpatialConfigModalTypeModel>(
      SpatialConfigModalTypeModel.setSpatialDirectionType
    );

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
      text: 'Update permissions',
      value: 'update permissions',
      onSelect: () => setPermissionsModalActive(!permissionsModalActive),
    },
    {
      text: 'Set spatial direction',
      value: 'setSpatialDirection',
      onSelect: () => {
        if (me!.id === participant.id) {
          setSpatialConfigModalActive(!spatialConfigModalActive);
          setSpatialConfigModalType(
            SpatialConfigModalTypeModel.setSpatialDirectionType
          );
        } else {
          Alert.alert(
            'Error',
            'Action available only from local participant avatar'
          );
        }
      },
    },
    {
      text: 'Set spatial environment',
      value: 'setSpatialEnvironment',
      onSelect: () => {
        if (me!.id === participant.id) {
          setSpatialConfigModalActive(!spatialConfigModalActive);
          setSpatialConfigModalType(
            SpatialConfigModalTypeModel.setSpatialEnvironmentType
          );
        } else {
          Alert.alert(
            'Error',
            'Action available only from local participant avatar'
          );
        }
      },
    },
    {
      text: 'Set spatial position',
      value: 'setSpatialPosition',
      onSelect: () => {
        setSpatialConfigModalActive(!spatialConfigModalActive);
        setSpatialConfigModalType(
          SpatialConfigModalTypeModel.setSpatialPositionType
        );
      },
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
      <SpatialConfigModal
        type={spatialConfigModalType}
        participant={participant}
        open={spatialConfigModalActive}
        closeModal={() => setSpatialConfigModalActive(false)}
      />
    </Space>
  );
};

export default ParticipantAvatar;
