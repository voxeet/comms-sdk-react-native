import { Alert } from 'react-native';

import CommsAPI from '@dolbyio/comms-sdk-reactnative';

export const startRecording = async () => {
  try {
    await CommsAPI.recording.start();
  } catch (e) {
    Alert.alert('Start recording Error');
  }
};

export const stopRecording = async () => {
  try {
    await CommsAPI.recording.stop();
  } catch (e) {
    Alert.alert('Stop recording Error');
  }
};

export const getCurrentRecording = async () => {
  try {
    const recording = await CommsAPI.recording.current();
    Alert.alert('Current recording: ', JSON.stringify(recording, null, 2));
  } catch (e) {
    Alert.alert('Current recording Error');
  }
};
