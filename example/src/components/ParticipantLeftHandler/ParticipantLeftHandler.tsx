import React, { useEffect } from 'react';
import { Alert } from 'react-native';

import CommsAPI from '@dolbyio/comms-sdk-react-native';

import type { ParticipantLeftEventType } from '@dolbyio/comms-sdk-react-native/models';

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
    var unsubscribe = CommsAPI.notification.onParticipantLeft(onParticipantLeft);
    return () => {
      unsubscribe();
    };
  }, []);

  return null;
};

export default ParticipantLeftHandler;
