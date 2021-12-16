import { Alert } from 'react-native';

import CommsAPI from '@dolbyio/react-native-iapi-sdk';

export const sendCommandMessage = async (message: string) => {
  try {
    await CommsAPI.command.send(message);
    Alert.alert('Message sent');
  } catch (e) {
    Alert.alert('Command send message Error');
  }
};
