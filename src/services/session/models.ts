export interface ParticipantInfo {
  /** The URL of the Participant avatar. */
  avatarUrl?: string;
  /** The external unique identifier that the customer's application can add to the participant while opening a session. If a participant uses the same external ID in conferences, the participant's ID also remains the same across all sessions. When a second participant joins a conference using the same external ID as another participant who has already joined the conference, the SDK removes the first participant who uses this external ID and emits the event */
  externalId?: string;
  /** The Participant name. */
  name?: string;
}
