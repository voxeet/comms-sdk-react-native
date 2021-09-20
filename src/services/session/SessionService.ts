import { NativeModules } from 'react-native';
const { DolbyIoIAPISessionServiceModule } = NativeModules;

import type { ParticipantInfo } from './models';

/**
 * The SessionService allows opening and closing sessions. Opening a session is mandatory before interacting with any service.
 */

export class SessionService {
  /**
   * Opens a new session.
   * @param participantInfo  The customer key.
   */
  public open(participantInfo: ParticipantInfo): Promise<boolean> {
    return DolbyIoIAPISessionServiceModule.open(participantInfo);
  }

  /**
   * Closes the current session.
   */
  public async close(): Promise<boolean> {
    return DolbyIoIAPISessionServiceModule.close();
  }
}

export default new SessionService();
