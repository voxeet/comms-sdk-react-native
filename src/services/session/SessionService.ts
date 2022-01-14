import { NativeModules } from 'react-native';

import type { ParticipantInfo } from '../conference/models';
import type { Participant } from '../conference/models';

const { CommsAPISessionServiceModule } = NativeModules;

/**
 * The SessionService allows opening and closing sessions. Opening a session is mandatory before interacting with any service.
 */

export class SessionService {
  /** @internal */
  _nativeModule = CommsAPISessionServiceModule;

  /**
   * Closes the current session.
   */
  public async close(): Promise<void> {
    return this._nativeModule.close();
  }

  /**
   * Provides the local participant object that belongs to the current session.
   */
  public async getParticipant(): Promise<Participant> {
    return this._nativeModule.getParticipant();
  }

  /**
   * Returns if a session that connects the SDK with the Dolby.io platform is opened or not.
   */
  public async isOpen(): Promise<Boolean> {
    return this._nativeModule.isOpen();
  }

  /**
   * Opens a new session.
   * @param participantInfo The optional information about the local participant.
   */
  public async open(participantInfo: ParticipantInfo = {}): Promise<void> {
    const { name, avatarUrl, externalId } = participantInfo;
    return this._nativeModule.open({
      name,
      avatarUrl,
      externalId,
    });
  }
}

export default new SessionService();
