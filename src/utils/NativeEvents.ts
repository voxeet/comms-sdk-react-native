import { NativeEventEmitter, NativeModule } from 'react-native';

import type { VideoViewEventMap } from '../VideoView/events';
import type { CommsAPIEventMap } from '../events';
import type { AudioPreviewStatusChangedEventMap } from '../services/audio/events';
import type { CommandServiceEventMap } from '../services/command/events';
import type { ConferenceServiceEventMap } from '../services/conference/events';
import type { FilePresentationServiceEventMap } from '../services/filePresentation/events';
import type { NotificationServiceEventMap } from '../services/notification/events';
import type { RecordingServiceEventMap } from '../services/recording/events';
import type { VideoPresentationEventMap } from '../services/videoPresentation/events';
import type { UnregisterListener } from './types';

interface NativeEventType
  extends CommsAPIEventMap,
    ConferenceServiceEventMap,
    NotificationServiceEventMap,
    RecordingServiceEventMap,
    FilePresentationServiceEventMap,
    CommandServiceEventMap,
    VideoPresentationEventMap,
    AudioPreviewStatusChangedEventMap,
    VideoViewEventMap {}

export default class NativeEvents {
  private _nativeEventEmitter: NativeEventEmitter;

  constructor(module: NativeModule) {
    this._nativeEventEmitter = new NativeEventEmitter(module);
  }

  public addListener<K extends keyof NativeEventType>(
    type: K,
    listener: (event: NativeEventType[K], type?: K) => void
  ): UnregisterListener {
    let emitterSubscription = this?._nativeEventEmitter?.addListener(
      type,
      (event: NativeEventType[K]) => listener(event, type)
    );

    // This is a work around to keep backward compability.
    // Previously we were returning a object that had a remove method rather
    // than just returnign function, as per documentation. We are now returning a function
    // that can be called to unsubscribe but to preserve backward compability we add
    // remove method to the function.
    function unregisterListener() {
      emitterSubscription.remove();
    }
    unregisterListener.remove = function () {
      emitterSubscription.remove();
    };
    return unregisterListener;
  }
}
