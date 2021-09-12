/**
 * @category SessionService
 * @module SessionService
 */

import { NativeModules } from 'react-native';
const { SessionServiceModule } = NativeModules;

import type { ParticipantInfo } from './types';

/**
 * The SessionService allows opening and closing sessions. Opening a session is mandatory before interacting with any service.
 */

export class SessionService {
  /**
   * Opens a new session.
   * @param participantInfo  The customer key.
   */
  public open(participantInfo: ParticipantInfo): Promise<boolean> {
    return SessionServiceModule.open(participantInfo);
  }

  /**
   * Closes the current session.
   */
  public async close(): Promise<boolean> {
    return SessionServiceModule.close();
  }
}

export default new SessionService();
