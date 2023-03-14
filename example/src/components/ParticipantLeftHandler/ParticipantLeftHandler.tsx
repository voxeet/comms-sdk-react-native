import React, { useEffect } from 'react';
import { Alert } from 'react-native';

import CommsAPI from '@dolbyio/comms-sdk-react-native';

import type { ParticipantLeftEventType } from '../../../../src/services/notification/events';

const ParticipantLeftHandler: React.FC = () => {
  const onParticipantLeft = (data: ParticipantLeftEventType) => {
    console.log(
      'PARTICIPANT LEFT EVENT DATA: \n',
      JSON.stringify(data, null, 2)
    );

    Alert.alert(
      'PARTICIPANT LEFT EVENT DATA',
      JSON.stringify(data, null, 2),
    );
  };

  useEffect(() => {
    return CommsAPI.notification.onParticipantLeft(onParticipantLeft);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default ParticipantLeftHandler;
