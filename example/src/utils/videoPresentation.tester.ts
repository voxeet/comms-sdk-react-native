import { Alert } from 'react-native';

import DolbyIoIAPI from '@dolbyio/react-native-iapi-sdk';

export const startVideoPresentation = async (url: string) => {
  try {
    await DolbyIoIAPI.videoPresentation.start(url);
  } catch (e: any) {
    Alert.alert('start error', e.message);
  }
};

export const pauseVideoPresentation = async () => {
  try {
    await DolbyIoIAPI.videoPresentation.pause(1);
  } catch (e: any) {
    Alert.alert('pause error', e.message);
  }
};

export const playVideoPresentation = async () => {
  try {
    await DolbyIoIAPI.videoPresentation.play();
  } catch (e: any) {
    Alert.alert('play error', e.message);
  }
};

export const currentVideoPresentation = async () => {
  try {
    const videoPresentation = await DolbyIoIAPI.videoPresentation.current();
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
    await DolbyIoIAPI.videoPresentation.seek(3);
  } catch (e: any) {
    Alert.alert('seek error', e.message);
  }
};

export const stopVideoPresentation = async () => {
  try {
    await DolbyIoIAPI.videoPresentation.stop();
  } catch (e: any) {
    Alert.alert('stop error', e.message);
  }
};

export const stateOfVideoPresentation = async () => {
  try {
    const state = await DolbyIoIAPI.videoPresentation.state();
    Alert.alert('Video presentation state: ', state);
  } catch (e: any) {
    Alert.alert('state of video presentation error', e.message);
  }
};
