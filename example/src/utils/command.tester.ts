import { Alert } from 'react-native';

import DolbyIoIAPI from '@dolbyio/react-native-iapi-sdk';

export const sendCommandMessage = async (message: string) => {
  try {
    await DolbyIoIAPI.command.send(message);
    Alert.alert('Message sent');
  } catch (e) {
    Alert.alert('Command send message Error');
  }
};
