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
   * Opens a new session. If you initialize the SDK with a [client access token](ref:get-client-access-token), provide the external ID in the REST API request, not in the open method. Otherwise, you may expect the platform to either ignore the external ID provided in the open method or receive an error if the provided ID is different from the one provided in the REST API request.
   * **Note**: The external ID field in this API has been deprecated; now you can provide the external ID only when requesting a [client access token](ref:get-client-access-token). If you provide to this API an external ID that is different from the one in your client access token, it will be rejected.
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
   * Updates the local participant's name and avatar URL. This method is supported in SDK 3.10 and later.
   */
  public async updateParticipantInfo(
    name: String,
    avatarUrl: String
  ): Promise<void> {
    return this._nativeModule.updateParticipantInfo(name, avatarUrl);
  }
}

export default new SessionService();
