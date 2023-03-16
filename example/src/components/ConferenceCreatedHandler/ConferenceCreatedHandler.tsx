import React, { useEffect } from 'react';

import CommsAPI from '@dolbyio/comms-sdk-react-native';

import type { ConferenceCreatedEventType } from '../../../../src/services/notification/events';

const ConferenceCreatedHandler: React.FC = () => {
  const onConferenceCreated = (data: ConferenceCreatedEventType) => {
    console.log(
      'CONFERENCE CREATED EVENT DATA: \n',
      JSON.stringify(data, null, 2)
    );
  };

  

  useEffect(() => {
    return CommsAPI.notification.onConferenceCreated(onConferenceCreated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default ConferenceCreatedHandler;
