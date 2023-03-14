import React, { useEffect } from 'react';

import CommsAPI from '@dolbyio/comms-sdk-react-native';

import type { ConferenceEndedEventType } from '../../../../src/services/notification/events';

const ConferenceCreatedHandler: React.FC = () => {
  const onConferenceEnded = (data: ConferenceEndedEventType) => {
    console.log(
      'CONFERENCE ENDED EVENT DATA: \n',
      JSON.stringify(data, null, 2)
    );

  };

  useEffect(() => {
    return CommsAPI.notification.onConferenceEnded(onConferenceEnded);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default ConferenceCreatedHandler;
