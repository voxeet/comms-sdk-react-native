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
   * @param participantInfo [participantInfo={}] The optional information about the local participant.
   * @returns {Promise<null>}
   */
  public async open(participantInfo: ParticipantInfo = {}): Promise<null> {
    const { name, avatarUrl, externalId } = participantInfo;
    return this._nativeModule.open({
      name,
      avatarUrl,
      externalId,
    });
  }

  /**
   * Closes the current session.
   * @returns {Promise<null>}
   */
  public async close(): Promise<null> {
    return this._nativeModule.close();
  }

  /**
   * Checks whether there is an open session that connects SDK with backend.
   * @returns {Promise<Boolean>}
   */
  public async isOpen(): Promise<Boolean> {
    return this._nativeModule.isOpen();
  }

  /**
   * Gets object of local user
   * @returns {Promise<User>}
   */
  public async getCurrentUser(): Promise<User> {
    return transformToUser(await this._nativeModule.getParticipant());
  }
}

export default new SessionService();
