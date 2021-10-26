import { Alert } from 'react-native';

import DolbyIoIAPI from '@dolbyio/react-native-iapi-sdk';

export const startVideoPresentation = (url: string) => {
  try {
    DolbyIoIAPI.videoPresentation.start(url);
  } catch (e: any) {
    Alert.alert('start error', e.message);
  }
};

export const pauseVideoPresentation = () => {
  try {
    const videoPresentation = DolbyIoIAPI.videoPresentation.current();
    if (!videoPresentation?.timestamp) {
      Alert.alert('you must start video presentation first');
      return;
    }
    DolbyIoIAPI.videoPresentation.pause(videoPresentation.timestamp);
  } catch (e: any) {
    Alert.alert('pause error', e.message);
  }
};

export const playVideoPresentation = () => {
  try {
    DolbyIoIAPI.videoPresentation.play();
  } catch (e: any) {
    Alert.alert('play error', e.message);
  }
};

export const currentVideoPresentation = () => {
  try {
    const videoPresentation = DolbyIoIAPI.videoPresentation.current();
    Alert.alert(
      'Video presentation: ',
      JSON.stringify(videoPresentation, null, 2)
    );
  } catch (e: any) {
    Alert.alert('current error', e.message);
  }
};

export const seekVideoPresentation = () => {
  try {
    const videoPresentation = DolbyIoIAPI.videoPresentation.current();
    if (!videoPresentation?.timestamp) {
      Alert.alert('you must start video presentation first');
      return;
    }
    DolbyIoIAPI.videoPresentation.seek(videoPresentation?.timestamp);
  } catch (e: any) {
    Alert.alert('seek error', e.message);
  }
};

export const stopVideoPresentation = () => {
  try {
    DolbyIoIAPI.videoPresentation.stop();
  } catch (e: any) {
    Alert.alert('stop error', e.message);
  }
};

export const stateOfVideoPresentation = () => {
  try {
    const state = DolbyIoIAPI.videoPresentation.state();
    Alert.alert('Video presentation state: ', state);
  } catch (e: any) {
    Alert.alert('state of video presentation error', e.message);
  }
};
