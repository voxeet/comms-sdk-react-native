import type { Participant } from '../conference/models';

export enum CommandServiceEventNames {
  /** Emitted when a participant receives a message.  */
  MessageReceived = 'EVENT_COMMAND_MESSAGE_RECEIVED',
}

/** The MessageReceivedEventType interface gathers information about the received message. */
export interface MessageReceivedEventType {
  /** The received message. */
  message: object;
  /** The participant who sent the message. */
  participant: Participant;
}

export interface CommandServiceEventMap {
  [CommandServiceEventNames.MessageReceived]: MessageReceivedEventType;
}
