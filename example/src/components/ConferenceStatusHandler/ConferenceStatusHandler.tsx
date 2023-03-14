import React, { useEffect } from 'react';
import { Alert } from 'react-native';

import CommsAPI from '@dolbyio/comms-sdk-react-native';

import type { ConferenceStatusEventType } from '../../../../src/services/notification/events';

const ConferenceStatusHandler: React.FC = () => {
  const onConferenceStatus = (data: ConferenceStatusEventType) => {
    console.log(
      'CONFERENCE STATUS EVENT DATA: \n',
      JSON.stringify(data, null, 2)
    );

    Alert.alert(
      'CONFERENCE STATUS EVENT DATA',
      JSON.stringify(data, null, 2),
    );
  };

  useEffect(() => {
    return CommsAPI.notification.onConferenceStatus(onConferenceStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default ConferenceStatusHandler;