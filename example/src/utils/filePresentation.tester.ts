import { Alert } from 'react-native';

import DolbyIoIAPI from '@dolbyio/react-native-iapi-sdk';

import type {
  FileConverted,
  File,
} from '../../../src/services/filePresentation/models';

export const stop = async () => {
  try {
    await DolbyIoIAPI.filePresentation.stop();
    console.log('File presentation stopped');
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('Stop error', msg);
  }
};

export const start = async (file: FileConverted | null) => {
  try {
    if (file == null) return;
    console.log('file that were passing', file);
    await DolbyIoIAPI.filePresentation.start(file);
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

export const convert = async (file: File): Promise<FileConverted | null> => {
  try {
    const convertedFile = await DolbyIoIAPI.filePresentation.convert(file);
    console.log('File Conversion done', JSON.stringify(convertedFile, null, 2));
    return convertedFile;
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('Convert error', msg);
    return null;
  }
};

export const getCurrent = async () => {
  try {
    const currentFilePresentation =
      await DolbyIoIAPI.filePresentation.getCurrent();
    console.log('Get current done:', currentFilePresentation);
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('Get current error', msg);
  }
};

export const getImage = async (page: number) => {
  try {
    const image = await DolbyIoIAPI.filePresentation.getImage(page);
    console.log('Get image done:', image);
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('Get image error', msg);
  }
};
