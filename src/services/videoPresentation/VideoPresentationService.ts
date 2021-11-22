import { NativeModules } from 'react-native';

import NativeEvents from '../../utils/NativeEvents';
import type { UnsubscribeFunction } from '../conference/models';
import type { VideoPresentationEventType } from './events';
import { VideoPresentationEventNames } from './events';
import type { VideoPresentation, VideoPresentationState } from './models';

const { DolbyIoIAPIVideoPresentationService } = NativeModules;

/**
 * The VideoPresentationService allows sharing videos during a conference.
 * To present a video, the conference participant needs to provide the URL that
 * defines the video location. We recommend sharing files in the MPEG-4 Part 14 or MP4 video formats.
 */
export class VideoPresentationService {
  /** @internal */
  _nativeModule = DolbyIoIAPIVideoPresentationService;
  /** @internal */
  _nativeEvents = new NativeEvents(DolbyIoIAPIVideoPresentationService || {});

  /**
   * Pauses the video presentation.
   * @param timestamp The timestamp that informs when the video needs to be paused, in milliseconds.
   */
  public pause(timestamp: number): Promise<void> {
    return this._nativeModule.pause(timestamp);
  }

  /**
   * Resumes the paused video presentation.
   */
  public play(): Promise<void> {
    return this._nativeModule.play();
  }

  /**
   * Returns information about the current video presentation. Use this accessor
   * if you wish to receive information that is available in the VideoPresentation
   * object, such as information about the participant who shares the video or the
   * URL of the presented video file.
   */
  public current(): Promise<VideoPresentation | null> {
    return this._nativeModule.current();
  }

  /**
   * Provides the current state of the video presentation.
   */
  public state(): Promise<VideoPresentationState> {
    return this._nativeModule.state();
  }

  /**
   * Allows the presenter to navigate to the specific section of the shared video.
   * @param timestamp The timestamp the presenter wants to start playing the video from, in milliseconds.
   */
  public seek(timestamp: number): Promise<void> {
    return this._nativeModule.seek(timestamp);
  }

  /**
   * Starts the video presentation.
   * @param url The URL that specifies the video file location.
   */
  public start(url: string): Promise<void> {
    return this._nativeModule.start(url);
  }

  /**
   * Stops the video presentation.
   */
  public stop(): Promise<void> {
    return this._nativeModule.stop();
  }

  /**
   * Adds a listener for video presentation started, sought, paused and played events
   * @param handler Event callback function
   * @returns Function that unsubscribes from listeners
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
   * Adds a listener for video presentation stopped event
   * @param handler Event callback function
   * @returns Function that unsubscribes from listeners
   */
  onVideoPresentationStopped(handler: () => void): UnsubscribeFunction {
    return this._nativeEvents.addListener(
      VideoPresentationEventNames.stopped,
      handler
    );
  }
}

export default new VideoPresentationService();
