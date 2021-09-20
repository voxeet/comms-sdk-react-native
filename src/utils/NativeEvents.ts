import {
  NativeModules,
  NativeEventEmitter,
  DeviceEventEmitter,
  Platform,
} from 'react-native';
const { DolbyIoIAPIModule } = NativeModules;

import type { UnregisterListener } from './types';
import type { SDKEventMap } from '../models';
import type { ConferenceServiceEventMap } from '../services/conference/models';

interface NativeEventType extends SDKEventMap, ConferenceServiceEventMap {}

const EventEmitter = Platform.select({
  ios: DeviceEventEmitter,
  android: new NativeEventEmitter(DolbyIoIAPIModule),
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
