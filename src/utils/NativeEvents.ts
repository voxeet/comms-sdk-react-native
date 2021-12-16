import { NativeEventEmitter } from 'react-native';

import type { VideoViewEventMap } from '../VideoView/events';
import type { CommsAPIEventMap } from '../events';
import type { CommandServiceEventMap } from '../services/command/events';
import type { ConferenceServiceEventMap } from '../services/conference/events';
import type { FilePresentationServiceEventMap } from '../services/filePresentation/events';
import type { NotificationServiceEventMap } from '../services/notification/events';
import type { VideoPresentationEventMap } from '../services/videoPresentation/events';
import type { UnregisterListener } from './types';

interface NativeEventType
  extends CommsAPIEventMap,
    ConferenceServiceEventMap,
    NotificationServiceEventMap,
    FilePresentationServiceEventMap,
    CommandServiceEventMap,
    VideoPresentationEventMap,
    VideoViewEventMap {}

export default class NativeEvents {
  private _nativeEventEmitter: any = undefined;

  constructor(module: any) {
    this._nativeEventEmitter = new NativeEventEmitter(module);
  }

  public addListener<K extends keyof NativeEventType>(
    type: K,
    listener: (event: NativeEventType[K], type?: K) => void
  ): UnregisterListener {
    return this?._nativeEventEmitter?.addListener(
      type,
      (event: NativeEventType[K]) => listener(event, type)
    );
  }
}
