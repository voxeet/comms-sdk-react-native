import React, { useEffect } from 'react';

import CommsAPI from '@dolbyio/comms-sdk-react-native';

import type { ConferenceEndedEventType } from '../../../../src/services/notification/events';

const ConferenceEndedHandler: React.FC = () => {
  const onConferenceEnded = (data: ConferenceEndedEventType) => {
    console.log(
      'CONFERENCE ENDED EVENT DATA: \n',
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
