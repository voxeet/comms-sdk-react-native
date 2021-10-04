import type { ParticipantInfo } from '../conference/models';
import { NativeModules } from 'react-native';

const { DolbyIoIAPISessionServiceModule } = NativeModules;

/**
 * The SessionService allows opening and closing sessions. Opening a session is mandatory before interacting with any service.
 */

export class SessionService {
  /**
   * Opens a new session.
   * @param participantInfo [participantInfo={}] The optional information about the local participant.
   * @returns {Promise<null>}
   */
  public async open(participantInfo: ParticipantInfo = {}): Promise<null> {
    const { name, avatarUrl } = participantInfo;
    return DolbyIoIAPISessionServiceModule.open({
      name,
      avatarUrl,
    });
  }

  /**
   * Closes the current session.
   * @returns {Promise<null>}
   */
  public async close(): Promise<null> {
    return DolbyIoIAPISessionServiceModule.close();
  }
}

export default new SessionService();
