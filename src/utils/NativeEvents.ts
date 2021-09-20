import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
const { DolbyIoIAPIModule } = NativeModules;

import type { UnregisterListener } from './types';
import type { DolbyIoIAPIEventMap } from '../events';
import type { ConferenceServiceEventMap } from '../services/conference/events';

interface NativeEventType
  extends DolbyIoIAPIEventMap,
    ConferenceServiceEventMap {}

const EventEmitter = Platform.select({
  ios: new NativeEventEmitter(DolbyIoIAPIModule),
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
