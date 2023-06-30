import React, { useEffect } from 'react';

import CommsAPI from '@dolbyio/comms-sdk-react-native';

import type { ConferenceStatusEventType } from '@dolbyio/comms-sdk-react-native/models';
import Logger from '@utils/Logger/Logger';

const ConferenceStatusHandler: React.FC = () => {
  const onConferenceStatus = (data: ConferenceStatusEventType) => {
    Logger.log(
      'CONFERENCE STATUS EVENT DATA:',
      JSON.stringify(data, null, 2)
    );
  };

  useEffect(() => {
    var unsubscribe = CommsAPI.notification.onConferenceStatus(onConferenceStatus);
    return () => {
      unsubscribe();
    };
  }, []);

  return null;
};

export default ConferenceStatusHandler;
