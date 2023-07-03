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

export const updateParticipantInfo = async () => {
  try {
    await CommsAPI.session.updateParticipantInfo('John', 'url');
    Alert.alert('Update participant information success');
  } catch (e: any) {
    Alert.alert('Update participant information error', e.toString());
  }
};
