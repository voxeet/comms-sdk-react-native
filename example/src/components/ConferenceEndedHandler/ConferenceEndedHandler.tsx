import React, { useEffect } from 'react';

import CommsAPI from '@dolbyio/comms-sdk-react-native';

import type { ConferenceEndedEventType } from '@dolbyio/comms-sdk-react-native/models';
import Logger from '@utils/Logger/Logger';

const ConferenceEndedHandler: React.FC = () => {
  const onConferenceEnded = (data: ConferenceEndedEventType) => {
    Logger.log(
      'CONFERENCE ENDED EVENT DATA:',
      JSON.stringify(data, null, 2)
    );
  };

  useEffect(() => {
    var unsubscribe = CommsAPI.notification.onConferenceEnded(onConferenceEnded);
    return () => {
      unsubscribe();
    };
  }, []);

  return null;
};

export default ConferenceEndedHandler;
