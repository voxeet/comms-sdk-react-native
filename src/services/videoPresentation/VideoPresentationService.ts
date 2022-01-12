import { NativeModules } from 'react-native';

import NativeEvents from '../../utils/NativeEvents';
import type { UnsubscribeFunction } from '../conference/models';
import type { VideoPresentationEventType } from './events';
import { VideoPresentationEventNames } from './events';
import type { VideoPresentation, VideoPresentationState } from './models';

const { CommsAPIVideoPresentationServiceModule } = NativeModules;

/**
 * The VideoPresentationService allows sharing videos during a conference. To present a video, a conference participant needs to provide a URL that defines the video location. We recommend sharing files in the MPEG-4 Part 14 or MP4 video format.
 *
 * **The video presentation workflow:**
 *
 * **1.** The presenter calls the [start](#start) method to start a video presentation. This method automatically starts playing the shared video file.
 *
 * **2.** All participants receive [information](doc:rn-client-sdk-interfaces-videopresentationeventtype) about the converted file via the [onVideoPresentationChange](#onvideopresentationchange) listener.
 *
 * **3.** The presenter can call the [pause](#pause) method to pause the shared video. In such a situation, all conference participants receive [information](doc:rn-client-sdk-interfaces-videopresentationeventtype) about paused file via the [onVideoPresentationChange](#onvideopresentationchange) listener.
 *
 * **4.** The presenter can call the [play](#play) method to resume the paused video. In such a situation, all conference participants receive [information](doc:rn-client-sdk-interfaces-videopresentationeventtype) about the resumed file via the [onVideoPresentationChange](#onvideopresentationchange) listener.
 *
 * **5.** The presenter can call the [seek](#seek) method to navigate to a specific section of the shared video. After calling the seek method, all conference participants receive [information](doc:rn-client-sdk-interfaces-videopresentationeventtype) about the updated timestamp via the [onVideoPresentationChange](#onvideopresentationchange) listener.
 *
 * **6.** The presenter calls the [stop](#stop) method to stop the video presentation. In such a situation, all conference participants receive this information via the [onVideoPresentationStopped](#onvideopresentationstopped) listener.
 */
export class VideoPresentationService {
  /** @internal */
  _nativeModule = CommsAPIVideoPresentationServiceModule;
  /** @internal */
  _nativeEvents = new NativeEvents(
    CommsAPIVideoPresentationServiceModule || {}
  );

  /**
   * Returns information about the current video presentation.
   */
  public current(): Promise<VideoPresentation | null> {
    return this._nativeModule.current();
  }

  /**
   * Pauses a video presentation.
   * @param timestamp The timestamp that informs when the video needs to be paused, in milliseconds.
   */
  public pause(timestamp: number): Promise<void> {
    return this._nativeModule.pause(timestamp);
  }

  /**
   * Resumes the paused video.
   */
  public play(): Promise<void> {
    return this._nativeModule.play();
  }

  /**
   * Allows a presenter to navigate to the specific section of the shared video.
   * @param timestamp The timestamp the presenter wants to start playing the video from, in milliseconds.
   */
  public seek(timestamp: number): Promise<void> {
    return this._nativeModule.seek(timestamp);
  }

  /**
   * Starts a video presentation.
   * @param url The URL that specifies the video file location.
   */
  public start(url: string): Promise<void> {
    return this._nativeModule.start(url);
  }

  /**
   * Provides the current state of a video presentation.
   */
  public state(): Promise<VideoPresentationState> {
    return this._nativeModule.state();
  }

  /**
   * Stops a video presentation.
   */
  public stop(): Promise<void> {
    return this._nativeModule.stop();
  }

  /**
   * Adds a listener to the video presentation started, sought, paused, and played events.
   * @param handler An event callback function.
   * @returns A function that unsubscribes from event listeners.
   */
  public onVideoPresentationChange(
    handler: (
      data: VideoPresentationEventType,
      type?:
        | VideoPresentationEventNames.started
        | VideoPresentationEventNames.sought
        | VideoPresentationEventNames.paused
        | VideoPresentationEventNames.played
    ) => void
  ): UnsubscribeFunction {
    const videoPresentationEventStartedEventUnsubscribe =
      this._nativeEvents.addListener(
        VideoPresentationEventNames.started,
        handler
      );
    const videoPresentationEventPausedEventUnsubscribe =
      this._nativeEvents.addListener(
        VideoPresentationEventNames.paused,
        handler
      );
    const videoPresentationEventPlayedEventUnsubscribe =
      this._nativeEvents.addListener(
        VideoPresentationEventNames.played,
        handler
      );
    const videoPresentationEventSoughtEventUnsubscribe =
      this._nativeEvents.addListener(
        VideoPresentationEventNames.sought,
        handler
      );
    return () => {
      videoPresentationEventPlayedEventUnsubscribe();
      videoPresentationEventSoughtEventUnsubscribe();
      videoPresentationEventPausedEventUnsubscribe();
      videoPresentationEventStartedEventUnsubscribe();
    };
  }

  /**
   * Adds a listener to the video presentation stopped event.
   * @param handler Event callback function
   */
  onVideoPresentationStopped(handler: () => void): UnsubscribeFunction {
    return this._nativeEvents.addListener(
      VideoPresentationEventNames.stopped,
      handler
    );
  }
}

export default new VideoPresentationService();
