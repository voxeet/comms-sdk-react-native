import React, { useEffect } from 'react';

import CommsAPI from '@dolbyio/comms-sdk-react-native';

import type { ActiveParticipantsEventType } from '../../../../src/services/notification/events';

const ActiveParticipantsHandler: React.FC = () => {
  const onActiveParticipants = (data: ActiveParticipantsEventType) => {
    console.log(
      'ACTIVE PARTICIPNATS EVENT DATA: \n',
      JSON.stringify(data, null, 2)
    );

  };

  useEffect(() => {
    return CommsAPI.notification.onActiveParticipants(onActiveParticipants);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default ActiveParticipantsHandler;
