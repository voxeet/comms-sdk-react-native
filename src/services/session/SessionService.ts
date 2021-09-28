import type { ParticipantInfo } from '../conference/models';
import { NativeModules } from 'react-native';

const { DolbyIoIAPISessionServiceModule } = NativeModules;

/**
 * The SessionService allows opening and closing sessions. Opening a session is mandatory before interacting with any service.
 */

export class SessionService {
  /**
   * Opens a new session.
   * @param participantInfo  The customer key.
   */
  public async open(participantInfo: ParticipantInfo): Promise<undefined> {
    return DolbyIoIAPISessionServiceModule.open(participantInfo);
  }

  /**
   * Closes the current session.
   */
  public async close(): Promise<undefined> {
    return DolbyIoIAPISessionServiceModule.close();
  }
}

export default new SessionService();
