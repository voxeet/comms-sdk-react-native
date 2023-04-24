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
    var unsubscribe = CommsAPI.notification.onConferenceCreated(onConferenceCreated);
    return () => {
      unsubscribe();
    };
  }, []);

  return null;
};

export default ConferenceCreatedHandler;
