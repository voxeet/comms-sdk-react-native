import DolbyIoIAPI from '@dolbyio/react-native-iapi-sdk';
import { Alert } from 'react-native';

export const sendCommandMessage = async (message: string) => {
  try {
    await DolbyIoIAPI.command.send(message);
  } catch (e) {
    Alert.alert('Command send message Error');
  }
};
