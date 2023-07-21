import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import CommsAPI from '@dolbyio/comms-sdk-react-native';

import type { MessageReceivedEventType } from '@dolbyio/comms-sdk-react-native/models';

const MessageHandler: React.FC = () => {
  const onMessageReceived = (data: MessageReceivedEventType) => {
    console.log(
      'MESSAGE RECEIVED EVENT DATA: \n',
      JSON.stringify(data, null, 2)
    );
    const {
      message,
      participant: {
        info: { name },
      },
    } = data;

    Alert.alert(
      'MESSAGE RECEIVED',
      JSON.stringify({ participant: name, message: message }, null, 2),
    );
  };

  useEffect(() => {
    var unsubscribe = CommsAPI.command.onMessageReceived(onMessageReceived);
    return () => {
      unsubscribe();
    };
  }, []);

  return null;
};

export default MessageHandler;
