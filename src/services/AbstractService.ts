import { Platform, DeviceEventEmitter, NativeEventEmitter } from 'react-native';

export default class AbstractService {
  protected events: any;

  constructor(nativeModule: any) {
    this.events =
      Platform.OS === 'android'
        ? DeviceEventEmitter
        : new NativeEventEmitter(nativeModule);
  }
}
