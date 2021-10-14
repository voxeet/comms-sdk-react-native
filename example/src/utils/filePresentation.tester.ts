import type { FileConverted } from '../../../src/services/filePresentation/models';
import DolbyIoIAPI from '@dolbyio/react-native-iapi-sdk';
import { Alert } from 'react-native';

export const stop = async () => {
  try {
    await DolbyIoIAPI.filePresentation.stop();
    Alert.alert('File presentation stopped');
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('Stop error', msg);
  }
};

export const start = async (file: FileConverted) => {
  try {
    await DolbyIoIAPI.filePresentation.start(file);
    Alert.alert('File presentation started');
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('Start error', msg);
  }
};

export const getThumbnail = async (page: number) => {
  try {
    const thumbnail = await DolbyIoIAPI.filePresentation.getThumbnail(page);
    Alert.alert('Thumbnail:', thumbnail.toString());
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('Get thumbnail error', msg);
  }
};

export const setPage = async (page: number) => {
  try {
    await DolbyIoIAPI.filePresentation.setPage(page);
    Alert.alert('Set page done');
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('Set page error', msg);
  }
};
