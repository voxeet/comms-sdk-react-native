import React, { useEffect } from 'react';

import CommsAPI from '@dolbyio/comms-sdk-react-native';

import type { ConferenceCreatedEventType } from '@dolbyio/comms-sdk-react-native/models';
import Logger from '@utils/Logger/Logger';

const ConferenceCreatedHandler: React.FC = () => {
  const onConferenceCreated = (data: ConferenceCreatedEventType) => {
    Logger.log(
      'CONFERENCE CREATED EVENT DATA:' +
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
