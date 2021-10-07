import type { ParticipantInfo } from '../conference/models';

export interface User {
  /**  The user's ID. */
  id: string;
  /**  The user's informations. */
  info: ParticipantInfo;
}
