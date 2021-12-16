import React, { useEffect } from 'react';

import CommsAPI from '@dolbyio/react-native-iapi-sdk';

import type { MessageReceivedEventType } from '../../../../src/services/command/events';

const MessageHandler: React.FC = () => {
  const onMessageReceived = (data: MessageReceivedEventType) => {
    console.log(
      'MESSAGE RECEIVED EVENT DATA: \n',
      JSON.stringify(data, null, 2)
    );
  };

  useEffect(() => {
    return CommsAPI.command.onMessageReceived(onMessageReceived);
  }, []);

  return null;
};

export default MessageHandler;
