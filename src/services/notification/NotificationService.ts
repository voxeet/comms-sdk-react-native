import { NativeModules } from 'react-native';

import NativeEvents from '../../utils/NativeEvents';
import type {
  Conference,
  UnsubscribeFunction,
  ParticipantInvited,
} from '../conference/models';
import { NotificationServiceEventNames } from './events';
import type {
  ConferenceCreatedEventType,
  ConferenceStatusEventType,
  ConferenceEndedEventType,
  InvitationReceivedEventType,
  ParticipantJoinedEventType,
  ParticipantLeftEventType,
  ActiveParticipantsEventType,
} from './events';
import type { Subscription } from './models';

const { CommsAPINotificationServiceModule } = NativeModules;

/**
 * The NotificationService allows inviting participants to a conference and subscribing to and unsubscribing from notifications.
 */
export class NotificationService {
  /** @internal */
  _nativeModule = CommsAPINotificationServiceModule;
  /** @internal */
  _nativeEvents = new NativeEvents(CommsAPINotificationServiceModule);

  /**
   * Subscribes to the specified notifications.
   * @param events An array of the subscribed subscription types.
   */
  public async subscribe(events: Subscription[]): Promise<void> {
    return this._nativeModule.subscribe(events);
  }

  /**
   * Unsubscribes from the specified notifications.
   * @param events An array of the subscribed subscription types.
   */
  public async unsubscribe(events: Subscription[]): Promise<void> {
    return this._nativeModule.unsubscribe(events);
  }

  /**
   * Declines the conference invitation.
   * @param conference The conference object.
   */
  public async decline(conference: Conference): Promise<void> {
    return this._nativeModule.decline(conference);
  }

  /**
   * Notifies conference participants about a conference invitation.
   * @param conference The conference object.
   * @param participants Information about the invited application users.
   */
  public async invite(
    conference: Conference,
    participants: ParticipantInvited[]
  ): Promise<void> {
    return this._nativeModule.invite(conference, participants);
  }

  /**
   * Adds a listener to the invitation received event.
   * @param handler An event callback function.
   * @returns A function that unsubscribes from event listeners.
   */
  public onInvitationReceived(
    handler: (data: InvitationReceivedEventType) => void
  ): UnsubscribeFunction {
    return this._nativeEvents.addListener(
      NotificationServiceEventNames.InvitationReceived,
      handler
    );
  }

  /**
   * Adds a listener to the conference status event.
   * @param handler An event callback function.
   * @returns A function that unsubscribes from event listeners.
   */
  public onConferenceStatus(
    handler: (data: ConferenceStatusEventType) => void
  ): UnsubscribeFunction {
    return this._nativeEvents.addListener(
      NotificationServiceEventNames.ConferenceStatus,
      handler
    );
  }

  /**
   * Adds a listener to the conference created event.
   * @param handler An event callback function.
   * @returns A function that unsubscribes from event listeners.
   */
  public onConferenceCreated(
    handler: (data: ConferenceCreatedEventType) => void
  ): UnsubscribeFunction {
    return this._nativeEvents.addListener(
      NotificationServiceEventNames.ConferenceCreated,
      handler
    );
  }

  /**
   * Adds a listener to the conference ended event.
   * @param handler An event callback function.
   * @returns A function that unsubscribes from event listeners.
   */
  public onConferenceEnded(
    handler: (data: ConferenceEndedEventType) => void
  ): UnsubscribeFunction {
    return this._nativeEvents.addListener(
      NotificationServiceEventNames.ConferenceEnded,
      handler
    );
  }

  /**
   * Adds a listener to the participant joined event.
   * @param handler An event callback function.
   * @returns A function that unsubscribes from event listeners.
   */
  public onParticipantJoined(
    handler: (data: ParticipantJoinedEventType) => void
  ): UnsubscribeFunction {
    return this._nativeEvents.addListener(
      NotificationServiceEventNames.ParticipantJoined,
      handler
    );
  }

  /**
   * Adds a listener to the participant left event.
   * @param handler An event callback function.
   * @returns A function that unsubscribes from event listeners.
   */
  public onParticipantLeft(
    handler: (data: ParticipantLeftEventType) => void
  ): UnsubscribeFunction {
    return this._nativeEvents.addListener(
      NotificationServiceEventNames.ParticipantLeft,
      handler
    );
  }

  /**
   * Adds a listener to the participant active event.
   * @param handler An event callback function.
   * @returns A function that unsubscribes from event listeners.
   */
  public onActiveParticipants(
    handler: (data: ActiveParticipantsEventType) => void
  ): UnsubscribeFunction {
    return this._nativeEvents.addListener(
      NotificationServiceEventNames.ActiveParticipants,
      handler
    );
  }
}

export default new NotificationService();
