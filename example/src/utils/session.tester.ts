import DolbyIoIAPI from '@dolbyio/react-native-iapi-sdk';
import { Alert } from 'react-native';

export const getCurrentUser = async () => {
  try {
    const currentUser = await DolbyIoIAPI.session.getCurrentUser();
    Alert.alert('Current user', JSON.stringify(currentUser));
  } catch (e: any) {
    Alert.alert('Error', e.toString());
  }
};
