import { Alert, NativeModules } from 'react-native';
const { DolbyioIAPISdk } = NativeModules;
import type {
  Conference,
  ConferenceCreateOptions,
  ConferenceReplayOptions,
  ConferenceMixingOptions,
} from './types';

class ConferenceService {
  public join(): void {
    Alert.alert('Conference Joined');
  }

  /**
   * Create a conference with ConferenceOptions
   * @param options<CreateOptions> The conference options
   * @returns {Promise<Conference>} Promise with a Conference
   */

  public async create(options: ConferenceCreateOptions): Promise<Conference> {
    return DolbyioIAPISdk.create(options);
  }

  /**
   * Provides a Conference object that allows joining a conference. Without a param returns current Conference object.
   * @param conferenceId?<string> The conference ID.
   * @returns {Promise<Conference>} Promise with a Conference
   */

  public async fetch(conferenceId?: string): Promise<Conference> {
    return DolbyioIAPISdk.fetch(conferenceId);
  }

  /**
   * Returns information about the current conference.
   * @returns {Promise<Conference>} Promise with a Conference
   */

  public async current(): Promise<Conference> {
    return DolbyioIAPISdk.current();
  }

  /**
   * Replays a previously recorded conference.
   * @param conference<Conference> The conference object.
   * @param replayOptions<ConferenceReplayOptions> The replay options.
   * @param mixingOptions<ConferenceMixingOptions> The model that notifies the server that a participant who replays the conference is a special participant called Mixer.
   * @returns {Promise<Conference>} Promise with a Conference
   */

  public async replay(
    conference: Conference,
    replayOptions?: ConferenceReplayOptions,
    mixingOptions?: ConferenceMixingOptions
  ): Promise<Conference> {
    return DolbyioIAPISdk.replay(conference, replayOptions, mixingOptions);
  }
}

export default new ConferenceService();
