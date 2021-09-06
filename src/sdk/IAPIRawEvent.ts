import {
  NativeModules,
  NativeEventEmitter,
  DeviceEventEmitter,
  Platform,
} from 'react-native';
import type { UnregisterCallback } from '../types';

const { RNDolbyioIAPISdk } = NativeModules;

const events =
  Platform.OS === 'android'
    ? DeviceEventEmitter
    : new NativeEventEmitter(RNDolbyioIAPISdk);

class IAPIEvents {
  constructor() {}

  public addListener(
    type: string,
    listener: (...args: any[]) => void
  ): UnregisterCallback {
    events.addListener(type, listener);

    return () => {
      events.removeListener(type, listener);
    };
  }
}

export default new IAPIEvents();
