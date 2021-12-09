import { Alert } from 'react-native';

import DolbyIoIAPI from '@dolbyio/react-native-iapi-sdk';

export const getCurrentUser = async () => {
  try {
    const currentUser = await DolbyIoIAPI.session.getCurrentUser();
    Alert.alert('Current user', JSON.stringify(currentUser));
  } catch (e: any) {
    Alert.alert('Error', e.toString());
  }
};
