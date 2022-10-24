import { Alert } from 'react-native';

import CommsAPI from '@dolbyio/comms-sdk-react-native';

export const isFrontCamera = async () => {
  try {
    const frontCamera = await CommsAPI.mediaDevice.isFrontCamera();
    Alert.alert('Front camera:', frontCamera.toString());
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('isFrontCamera error', msg);
  }
};

export const switchCamera = async () => {
  try {
    await CommsAPI.mediaDevice.switchCamera();
    Alert.alert('switchCamera success');
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('switchCamera error', msg);
  }
};

export const switchSpeaker = async () => {
  try {
    await CommsAPI.mediaDevice.switchSpeaker();
    Alert.alert('switchSpeaker success');
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('switchSpeaker error', msg);
  }
};
