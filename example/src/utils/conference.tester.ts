import DolbyIoIAPI from '@dolbyio/react-native-iapi-sdk';
import { Alert } from 'react-native';

export const startVideo = () => {
  try {
    DolbyIoIAPI.conference.startVideo();
  } catch (e: any) {
    Alert.alert('Error');
  }
};
export const stopVideo = () => {
  try {
    DolbyIoIAPI.conference.stopVideo();
  } catch (e: any) {
    Alert.alert('Error');
  }
};
export const startAudio = () => {
  try {
    DolbyIoIAPI.conference.startAudio();
  } catch (e: any) {
    Alert.alert('Error');
  }
};
export const stopAudio = () => {
  try {
    DolbyIoIAPI.conference.stopAudio();
  } catch (e: any) {
    Alert.alert('Error');
  }
};

export const getAudioLevel = async () => {
  try {
    const audioLevel = await DolbyIoIAPI.conference.getAudioLevel();
    Alert.alert('Audio level', JSON.stringify(audioLevel));
  } catch (e: any) {
    Alert.alert('Cant get audio level', e);
  }
};

export const getAudioProcessing = async () => {
  try {
    const audioProcessing = await DolbyIoIAPI.conference.getAudioProcessing();
    Alert.alert('Audio processing', JSON.stringify(audioProcessing));
  } catch (e: any) {
    Alert.alert('Cant get audio processing', e);
  }
};

export const getStatus = async () => {
  try {
    const status = await DolbyIoIAPI.conference.getStatus();
    Alert.alert('Status', JSON.stringify(status));
  } catch (e: any) {
    Alert.alert('Cant get status', e);
  }
};

export const getLocalStats = async () => {
  try {
    const localStats = await DolbyIoIAPI.conference.getLocalStats();
    Alert.alert('Local stats', JSON.stringify(localStats));
  } catch (e: any) {
    Alert.alert('Cant get local stats', e);
  }
};

export const getMaxVideoForwarding = async () => {
  try {
    const maxVideoForwarding =
      await DolbyIoIAPI.conference.getMaxVideoForwarding();
    Alert.alert('Max video forwarding', JSON.stringify(maxVideoForwarding));
  } catch (e: any) {
    Alert.alert('Cant get max video forwarding', e);
  }
};
