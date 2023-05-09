import React, { useEffect } from 'react';
import { Alert } from 'react-native';

import CommsAPI from '@dolbyio/comms-sdk-react-native';

import type { ConferenceStatusEventType } from '@dolbyio/comms-sdk-react-native/models';

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
    var unsubscribe = CommsAPI.notification.onConferenceStatus(onConferenceStatus);
    return () => {
      unsubscribe();
    };
  }, []);

  return null;
};

export default ConferenceStatusHandler;
