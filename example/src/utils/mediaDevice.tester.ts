import { Alert } from 'react-native';

import DolbyIoIAPI from '@dolbyio/react-native-iapi-sdk';

import type { ComfortNoiseLevel } from '../../../src/services/mediaDevice/models';

export const isFrontCamera = async () => {
  try {
    const frontCamera = await DolbyIoIAPI.mediaDevice.isFrontCamera();
    Alert.alert('Front camera:', frontCamera.toString());
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('isFrontCamera error', msg);
  }
};

export const getComfortNoiseLevel = async () => {
  try {
    const noiseLevel = await DolbyIoIAPI.mediaDevice.getComfortNoiseLevel();
    Alert.alert('Comfort noise level:', noiseLevel.toString());
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('getComfortNoiseLevel error', msg);
  }
};

export const setComfortNoiseLevel = async (noiseLevel: ComfortNoiseLevel) => {
  try {
    await DolbyIoIAPI.mediaDevice.setComfortNoiseLevel(noiseLevel);
    Alert.alert('setComfortNoiseLevel success');
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('setComfortNoiseLevel error', msg);
  }
};

export const switchCamera = async () => {
  try {
    await DolbyIoIAPI.mediaDevice.switchCamera();
    Alert.alert('switchCamera success');
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('switchCamera error', msg);
  }
};

export const switchSpeaker = async () => {
  try {
    await DolbyIoIAPI.mediaDevice.switchSpeaker();
    Alert.alert('switchSpeaker success');
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('switchSpeaker error', msg);
  }
};
