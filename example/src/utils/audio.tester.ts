import { Alert } from 'react-native';

import CommsAPI from '@dolbyio/comms-sdk-react-native';

import type {
  Participant,
} from '../../../src/services/conference/models';
import type { AudioCaptureModeOptions, ComfortNoiseLevel } from 'src/services/audio/models';

export const startLocalAudio = async () => {
  try {
    await CommsAPI.audio.getLocal().start();
    Alert.alert('Start local audio success');
  } catch (e: any) {
    Alert.alert('Error');
  }
};
export const stopLocalAudio = async () => {
  try {
    await CommsAPI.audio.getLocal().stop();
    Alert.alert('Stop local audio success');
  } catch (e: any) {
    Alert.alert('Error');
  }
};

export const startRemoteAudio = async (participant: Participant) => {
  try {
    await CommsAPI.audio.getRemote().start(participant);
    Alert.alert('Start remote audio success');
  } catch (e: any) {
    Alert.alert('Error', e.toString());
  }
};

export const stopRemoteAudio = async (participant: Participant) => {
  try {
    await CommsAPI.audio.getRemote().stop(participant);
    Alert.alert('Stop remote audio success');
  } catch (e: any) {
    Alert.alert('Error', e.toString());
  }
};

export const getComfortNoiseLevel = async () => {
  try {
    const noiseLevel = await CommsAPI.audio.getLocal().getComfortNoiseLevel();
    Alert.alert('Comfort noise level:', noiseLevel.toString());
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('getComfortNoiseLevel error', msg);
  }
};

export const setComfortNoiseLevel = async (noiseLevel: ComfortNoiseLevel) => {
  try {
    await CommsAPI.audio.getLocal().setComfortNoiseLevel(noiseLevel);
    Alert.alert('setComfortNoiseLevel success');
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('setComfortNoiseLevel error', msg);
  }
};

export const getAudioCaptureMode = async () => {
  try {
    const captureMode = await CommsAPI.audio.getLocal().getCaptureMode();
    Alert.alert('Capture mode:', `${captureMode.mode} ${captureMode.noiseReduction?.toString()}`);
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('getAudioCaptureMode error', msg);
  }
};

export const setAudioCaptureMode = async (audioCaptureModeOptions: AudioCaptureModeOptions) => {
  try {
    await CommsAPI.audio.getLocal().setCaptureMode(audioCaptureModeOptions);
    Alert.alert('setAudioCaptureMode success');
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('setAudioCaptureMode error', msg);
  }
};
