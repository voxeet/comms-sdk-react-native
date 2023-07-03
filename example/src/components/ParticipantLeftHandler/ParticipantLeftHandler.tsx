import React, { useEffect } from 'react';

import CommsAPI from '@dolbyio/comms-sdk-react-native';

import type { ParticipantLeftEventType } from '@dolbyio/comms-sdk-react-native/models';
import Logger from '@utils/Logger/Logger';

const ParticipantLeftHandler: React.FC = () => {
  const onParticipantLeft = (data: ParticipantLeftEventType) => {
    Logger.log(
      'PARTICIPANT LEFT EVENT DATA: \n',
      JSON.stringify(data, null, 2)
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
