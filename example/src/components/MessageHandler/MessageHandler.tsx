import React, { useEffect } from 'react';

import CommsAPI from '@dolbyio/comms-sdk-react-native';

import type { MessageReceivedEventType } from '@dolbyio/comms-sdk-react-native/models';

const MessageHandler: React.FC = () => {
  const onMessageReceived = (data: MessageReceivedEventType) => {
    console.log(
      'MESSAGE RECEIVED EVENT DATA: \n',
      JSON.stringify(data, null, 2)
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
