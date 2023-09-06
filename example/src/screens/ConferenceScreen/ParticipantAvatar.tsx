import React, { useState, useContext, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { DolbyIOContext } from '@components/DolbyIOProvider';
import COLORS from '@constants/colors.constants';
import MenuOptionsButton from '@ui/MenuOptionsButton';
import type { Options } from '@ui/MenuOptionsButton/MenuOptionsButton';
import Space from '@ui/Space';
import Text from '@ui/Text';
import {
  mute,
  unmute,
  startRemoteAudio,
  stopRemoteAudio,
  kick,
  isSpeaking,
  setSpatialPosition,
} from '@utils/conference.tester';
import type { Participant } from '@dolbyio/comms-sdk-react-native/models';
import styles from './ConferenceScreen.style';
import SpatialConfigModal from './SpatialConfigModal';
import { SpatialConfigModalTypeModel } from './SpatialConfigModal';
import UpdatePermissionsModal from './UpdatePermissionsModal';
import { startRemoteVideo, stopRemoteVideo } from '@utils/video.tester';
import Video from './Video';
import SetVolumeModal from './VolumeModal';

type ParticipantAvatarProps = {
  participant: Participant;
  scaleType?: 'fill' | 'fit';
};

const ParticipantAvatar = ({ participant, scaleType }: ParticipantAvatarProps) => {
  const { me, conference } = useContext(DolbyIOContext);
  const [permissionsModalActive, setPermissionsModalActive] = useState(false);
  const [spatialConfigModalActive, setSpatialConfigModalActive] =
    useState(false);
  const [spatialConfigModalType, setSpatialConfigModalType] =
    useState<SpatialConfigModalTypeModel>(
      SpatialConfigModalTypeModel.setSpatialDirectionType
    );
    const [volumeModalActive, setVolumeModalActive] = useState(false); 

  const [wasSpatialized, setWasSpatialized] = useState<boolean>(false);

  useEffect(() => {
    if (!wasSpatialized) {
      setTimeout(() => {
        participant.id !== me!.id &&
          setSpatialPosition(participant, { x: 0, y: 0, z: 0 });
        setWasSpatialized(true);
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conference!.participants]);

  const options: Options = [
    {
      text: 'Kick',
      value: 'kick',
      onSelect: async () => {
        await kick(participant);
      },
    },
    {
      text: 'Set participant volume',
      value: 'set participant volume',
      onSelect: () => {
        if (me!.id !== participant.id) {
          setVolumeModalActive(!volumeModalActive);
        } else {
          Alert.alert(
            'Error',
            'Action available only from remote participant avatar'
          );
        }
      },
    },
    {
      text: 'Mute',
      value: 'mute',
      onSelect: async () => {
        await mute(participant);
      },
    },
    {
      text: 'Unmute',
      value: 'unmute',
      onSelect: async () => {
        await unmute(participant);
      },
    },
    {
      text: 'Start remote audio',
      value: 'start',
      onSelect: async () => {
        await startRemoteAudio(participant);
      },
    },
    {
      text: 'Stop remote audio',
      value: 'stop',
      onSelect: async () => {
        await stopRemoteAudio(participant);
      },
    },
    {
      text: 'Start remote video',
      value: 'startVideo',
      onSelect: async () => {
        await startRemoteVideo(participant);
      },
    },
    {
      text: 'Stop remote video',
      value: 'stopVideo',
      onSelect: async () => {
        await stopRemoteVideo(participant);
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
      <Video
        participant={participant}
        width={150}
        height={150}
        scaleType={scaleType}
      />
      <MenuOptionsButton options={options}>
        <View style={styles.participant} key={participant.id}>
          <Text size="xxs" color={COLORS.WHITE}>
            {participant.info.name!.slice(0, 10) + " " + participant.status}
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
      <SetVolumeModal 
      open={volumeModalActive}
      closeModal={() => setVolumeModalActive(false)}
      participant={participant}
      />
    </Space>
  );
};

export default ParticipantAvatar;
