import React, { useEffect } from 'react';
import { Alert } from 'react-native';

import CommsAPI from '@dolbyio/comms-sdk-react-native';

import type {
  VideoPresentationEventType,
  VideoPresentationEventNames,
} from '@dolbyio/comms-sdk-react-native/models';

const VideoPresentationHandler: React.FC = () => {
  const videoPresentationStopped = () => {
    Alert.alert('VIDEO PRESENTATION STOPPED');
  };

  const videoPresentationChanged = async (
    event: VideoPresentationEventType,
    type?: VideoPresentationEventNames
  ) => {
    console.log(
      'VIDEO PRESENTATION CHANGE\n',
      JSON.stringify(event, null, 2),
      type
    );

    Alert.alert(
      'VIDEO PRESENTATION CHANGE EVENT DATA',
      JSON.stringify(
        {
          changeEventType: type,
          fileURL: event.url,
        },
        null,
        2
      )
    );
  };

  useEffect(() => {
    const videoPresentationChangeUnsubscribeFn =
      CommsAPI.videoPresentation.onVideoPresentationChange(
        videoPresentationChanged
      );
    const videoPresentationStoppedUnsubscribeFn =
      CommsAPI.videoPresentation.onVideoPresentationStopped(
        videoPresentationStopped
      );

    return () => {
      videoPresentationChangeUnsubscribeFn();
      videoPresentationStoppedUnsubscribeFn();
    };
  }, []);

  return null;
};

export default VideoPresentationHandler;
