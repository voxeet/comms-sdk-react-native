import { NativeModules } from 'react-native';

import type { ParticipantInfo } from '../conference/models';
import type { User } from './models';
import { transformToUser } from './transformers';

const { DolbyIoIAPISessionServiceModule } = NativeModules;

/**
 * The SessionService allows opening and closing sessions. Opening a session is mandatory before interacting with any service.
 */

export class SessionService {
  /** @internal */
  _nativeModule = DolbyIoIAPISessionServiceModule;

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

  /**
   * Closes the current session.
   */
  public async close(): Promise<void> {
    return this._nativeModule.close();
  }

  /**
   * Checks whether there is an open session that connects SDK with backend.
   */
  public async isOpen(): Promise<Boolean> {
    return this._nativeModule.isOpen();
  }

  /**
   * Provides the local participant object that belongs to the current session.
   */
  public async getCurrentUser(): Promise<User> {
    return transformToUser(await this._nativeModule.getParticipant());
  }
}

export default new SessionService();
