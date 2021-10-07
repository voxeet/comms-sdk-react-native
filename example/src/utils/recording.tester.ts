import DolbyIoIAPI from '@dolbyio/react-native-iapi-sdk';
import { Alert } from 'react-native';

export const startRecording = async () => {
  try {
    await DolbyIoIAPI.recording.start();
  } catch (e) {
    Alert.alert('Start recording Error');
  }
};

export const stopRecording = async () => {
  try {
    await DolbyIoIAPI.recording.stop();
  } catch (e) {
    Alert.alert('Stop recording Error');
  }
};

export const getCurrentRecording = async () => {
  try {
    const recording = await DolbyIoIAPI.recording.current();
    Alert.alert('Current recording: ', JSON.stringify(recording, null, 2));
  } catch (e) {
    Alert.alert('Current recording Error');
  }
};
