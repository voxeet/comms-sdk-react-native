import type { FileConverted } from '../../../src/services/filePresentation/models';
import DolbyIoIAPI from '@dolbyio/react-native-iapi-sdk';
import { Alert } from 'react-native';

// ! Temporary converted file
const testFileConverted = {
  id: '102030',
  imageCount: 3,
};

export const stop = async () => {
  try {
    await DolbyIoIAPI.filePresentation.stop();
    Alert.alert('File presentation stopped');
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('Stop error', msg);
  }
};

// ! Includes temporary converted file
export const start = async (file: FileConverted = testFileConverted) => {
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
