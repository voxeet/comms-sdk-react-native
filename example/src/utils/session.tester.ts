import { Alert } from 'react-native';

import CommsAPI from '@dolbyio/comms-sdk-reactnative';

export const getCurrentUser = async () => {
  try {
    const currentUser = await CommsAPI.session.getCurrentUser();
    Alert.alert('Current user', JSON.stringify(currentUser));
  } catch (e: any) {
    Alert.alert('Error', e.toString());
  }
};
