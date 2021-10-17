import { NativeModules, NativeEventEmitter, Platform } from 'react-native';

import type { DolbyIoIAPIEventMap } from '../events';
import type { CommandServiceEventMap } from '../services/command/events';
import type { ConferenceServiceEventMap } from '../services/conference/events';
import type { NotificationServiceEventMap } from '../services/notification/events';
import type { UnregisterListener } from './types';

const { DolbyIoIAPIModule } = NativeModules;

interface NativeEventType
  extends DolbyIoIAPIEventMap,
    ConferenceServiceEventMap,
    NotificationServiceEventMap,
    CommandServiceEventMap {}

const EventEmitter = Platform.select({
  ios: new NativeEventEmitter(DolbyIoIAPIModule),
  android: new NativeEventEmitter(DolbyIoIAPIModule),
});

export default class NativeEvents {
  public static addListener<K extends keyof NativeEventType>(
    type: K,
    listener: (event: NativeEventType[K]) => void
  ): UnregisterListener {
    EventEmitter?.addListener(type, listener);
    return () => {
      EventEmitter?.removeListener(type, listener);
    };
  }
}
