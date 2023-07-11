import { Alert } from 'react-native';
import CommsAPI from '@dolbyio/comms-sdk-react-native';
import type { AudioCaptureModeOptions } from '@dolbyio/comms-sdk-react-native/models';
import Logger from '@utils/Logger/Logger';


export const setAudioCaptureMode = async (audioCaptureModeOptions: AudioCaptureModeOptions) => {
  try {
    await CommsAPI.audio.getLocal().preview().setCaptureMode(audioCaptureModeOptions);
    if (audioCaptureModeOptions.voiceFont != null) {
      Alert.alert('Voice Font updated:', `${audioCaptureModeOptions.voiceFont}`);
    } else {
      Alert.alert('setAudioCaptureMode success');
    }
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('setAudioCaptureMode error', msg);
  }
};

export const record = async () => {
    try {
      await CommsAPI.audio.getLocal().preview().record(3);
      console.log('Record success');
    } catch (e: any) {
      console.log(e);
      Alert.alert(`Error ${JSON.stringify(e)}`);
    }
};

export const play = async () => {
    try {
      CommsAPI.audio.getLocal().preview().play(false);
      console.log('Play success');
    } catch (e: any) {
      console.log(e);
      Alert.alert(`Error ${JSON.stringify(e)}`);
    }
};

export const cancel = async () => {
    try {
      const cancel = await CommsAPI.audio.getLocal().preview().cancel();
      console.log('Cancel: ', cancel.toString());
    } catch (e: any) {
      console.log(e);
      Alert.alert(`Error ${JSON.stringify(e)}`);
    }
};

export const release = async () => {
    try {
      CommsAPI.audio.getLocal().preview().release();
      console.log('Release success');
    } catch (e: any) {
      console.log(e);
      Alert.alert(`Error ${JSON.stringify(e)}`);
    }
};

export const observeStatus = () => {
    try {
      return CommsAPI.audio.getLocal().preview().onStatusChanged((status) => {
        Logger.log(
          'AUDIO PREVIEW STATUS CHANGE EVENT:',
          JSON.stringify(status, null, 2)
        );
      });
    } catch (e: any) {
      console.log(e);
      Alert.alert(`Error ${JSON.stringify(e)}`);
      return undefined;
    }
};
