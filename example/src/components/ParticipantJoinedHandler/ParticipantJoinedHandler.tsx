import React, { useEffect } from 'react';
import { Alert } from 'react-native';

import CommsAPI from '@dolbyio/comms-sdk-react-native';

import type { ParticipantJoinedEventType } from '@dolbyio/comms-sdk-react-native/models';

const ParticipantJoinedHandler: React.FC = () => {
  const onParticipantJoined = (data: ParticipantJoinedEventType) => {
    console.log(
      'PARTICIPANT JOINED EVENT DATA: \n',
      JSON.stringify(data, null, 2)
    );

    Alert.alert(
      'PARTICIPANT JOINED EVENT DATA',
      JSON.stringify(data, null, 2),
    );
  };

  useEffect(() => {
    var unsubscribe = CommsAPI.notification.onParticipantJoined(onParticipantJoined);
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default ParticipantJoinedHandler;
