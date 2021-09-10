import {
  NativeModules,
  NativeEventEmitter,
  DeviceEventEmitter,
  Platform,
} from 'react-native';
const { RNDolbyioIAPISdk } = NativeModules;

import type { UnregisterListener } from './types';
import type { SDKEventMap } from '../types';
import type { ConferenceServiceEventMap } from '../services/conference/types';

interface NativeEventType extends SDKEventMap, ConferenceServiceEventMap {}

const EventEmitter = Platform.select({
  ios: DeviceEventEmitter,
  android: new NativeEventEmitter(RNDolbyioIAPISdk),
});

export default class NativeEvents {
  public static addListener<K extends keyof NativeEventType>(
    type: K,
    listener: (event: NativeEventType[K]) => void
  ): UnregisterListener {
    // @ts-ignore
    EventEmitter.addListener(type, listener);
    return () => {
      // @ts-ignore
      EventEmitter.removeListener(type, listener);
    };
  }
}
