import type { ParticipantInfo } from '../conference/models';

/**  The User interface gathers information the local participant that belongs to the current session.  */
export interface User {
  /**  The ID of the local participant. */
  id: string;
  /**  Information about the local participant. */
  info: ParticipantInfo;
}
