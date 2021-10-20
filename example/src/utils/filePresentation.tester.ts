import { Alert } from 'react-native';

import DolbyIoIAPI from '@dolbyio/react-native-iapi-sdk';

import type {
  FileConverted,
  File,
} from '../../../src/services/filePresentation/models';

// TODO Temporary converted file
const testFileConverted = {
  id: '102030',
  imageCount: 3,
};

// TODO Temporary file before conversions
const testFile = {
  url: '../assets/dolbyIo.jpg',
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

// TODO Includes temporary converted file
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

// TODO Includes temporary file
export const convert = async (file: File = testFile) => {
  try {
    const convertedFile = await DolbyIoIAPI.filePresentation.convert(file);
    Alert.alert('Conversion done', convertedFile.toString());
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('Convert error', msg);
  }
};

export const getCurrent = async () => {
  try {
    const currentFile = await DolbyIoIAPI.filePresentation.getCurrent();
    Alert.alert('Get current done:', currentFile.toString());
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('Get current error', msg);
  }
};

export const getImage = async (page: number) => {
  try {
    const image = await DolbyIoIAPI.filePresentation.getImage(page);
    Alert.alert('Get image done:', image.toString());
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('Get image error', msg);
  }
};
