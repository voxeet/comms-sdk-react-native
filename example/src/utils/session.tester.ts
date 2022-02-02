import { Alert } from 'react-native';

import CommsAPI from '@dolbyio/comms-sdk-react-native';

export const getCurrentUser = async () => {
  try {
    const currentUser = await CommsAPI.session.getParticipant();
    Alert.alert('Current user', JSON.stringify(currentUser));
  } catch (e: any) {
    Alert.alert('Error', e.toString());
  }
};
