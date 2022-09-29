import { Alert } from 'react-native';

import CommsAPI from '@dolbyio/comms-sdk-react-native';

import type {
  Participant,
} from '../../../src/services/conference/models';

export const startLocalVideo = async () => {
  try {
    await CommsAPI.video.getLocal().start();
    Alert.alert('Start local video success');
  } catch (e: any) {
    Alert.alert('Error');
  }
};
export const stopLocalVideo = async () => {
  try {
    await CommsAPI.video.getLocal().stop();
    Alert.alert('Stop local video success');
  } catch (e: any) {
    Alert.alert('Error');
  }
};

export const startRemoteVideo = async (participant: Participant) => {
  try {
    await CommsAPI.video.getRemote().start(participant);
    Alert.alert('Start remote video success');
  } catch (e: any) {
    Alert.alert('Error', e.toString());
  }
};

export const stopRemoteVideo = async (participant: Participant) => {
  try {
    await CommsAPI.video.getRemote().stop(participant);
    Alert.alert('Stop remote video success');
  } catch (e: any) {
    Alert.alert('Error', e.toString());
  }
};
