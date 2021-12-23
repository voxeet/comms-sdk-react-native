import { Alert } from 'react-native';

import CommsAPI from '@dolbyio/comms-sdk-react-native';

export const startVideoPresentation = async (url: string) => {
  try {
    await CommsAPI.videoPresentation.start(url);
  } catch (e: any) {
    Alert.alert('start error', e.message);
  }
};

export const pauseVideoPresentation = async () => {
  try {
    await CommsAPI.videoPresentation.pause(1);
  } catch (e: any) {
    Alert.alert('pause error', e.message);
  }
};

export const playVideoPresentation = async () => {
  try {
    await CommsAPI.videoPresentation.play();
  } catch (e: any) {
    Alert.alert('play error', e.message);
  }
};

export const currentVideoPresentation = async () => {
  try {
    const videoPresentation = await CommsAPI.videoPresentation.current();
    Alert.alert(
      'Video presentation: ',
      JSON.stringify(videoPresentation, null, 2)
    );
  } catch (e: any) {
    Alert.alert('current error', e.message);
  }
};

export const seekVideoPresentation = async () => {
  try {
    await CommsAPI.videoPresentation.seek(3);
  } catch (e: any) {
    Alert.alert('seek error', e.message);
  }
};

export const stopVideoPresentation = async () => {
  try {
    await CommsAPI.videoPresentation.stop();
  } catch (e: any) {
    Alert.alert('stop error', e.message);
  }
};

export const stateOfVideoPresentation = async () => {
  try {
    const state = await CommsAPI.videoPresentation.state();
    Alert.alert('Video presentation state: ', state);
  } catch (e: any) {
    Alert.alert('state of video presentation error', e.message);
  }
};
