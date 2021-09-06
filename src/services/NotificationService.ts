import { EventEmitter2 } from 'eventemitter2';
import { NativeModules } from 'react-native';
import type { UnregisterCallback } from '../types';
import AbstractService from './AbstractService';
import {
  Conference,
  ConferenceParticipantStatus,
  conferenceToMap,
  ParticipantInfo,
} from './conference';
import {
  ConferencePermission,
  ParticipantInvited,
  Subscription,
  SubscriptionMapping,
} from './notification';
import type { ParticipantNotification } from './notification/ParticipantNotification';
import { SubscriptionType } from './notification/Subscriptions';

const { RNNotificationService } = NativeModules;

function transformParticipantInvited(participantInvited: ParticipantInvited) {
  return {
    participant: participantInvited.participant,
    permissions: participantInvited.permissions.map(
      (p) => ConferencePermission[p]
    ),
  };
}

function transformIntoParticipantNotification(
  participant: any
): ParticipantNotification {
  return {
    ...participant, //id, participantInfo
    status: ConferenceParticipantStatus[participant.status as 'IN_PROGRESS'],
  };
}

/**
 *
 * @param type  the expected type from which event is of type
 * @param event the event content which will be transformed to the expected interface (enum values are string => to transform)
 */
function transformSubscription<K extends keyof SubscriptionMapping>(
  type: K,
  event: any
): SubscriptionMapping[K] {
  switch (type) {
    case SubscriptionType.ConferenceCreatedNotification:
    case SubscriptionType.ConferenceEndedNotification: {
      return { ...event };
    }
    case SubscriptionType.InvitationReceivedNotification: //in this case, conferenceAlias is not set
    case SubscriptionType.ParticipantJoinedNotification:
    case SubscriptionType.ParticipantLeftNotification: {
      return {
        ...event, //conferenceId, conferenceAlias
        participant: transformIntoParticipantNotification(event.participant),
      };
    }
    default:
      throw 'not implemented ' + type + ' / ' + SubscriptionType[type];
  }
}

export default class NotificationService extends AbstractService {
  #emitter: EventEmitter2 = new EventEmitter2();

  public constructor() {
    super(RNNotificationService);

    //map each SubscriptionType."event" to "event"
    const types: SubscriptionType[] = [
      SubscriptionType.ConferenceCreatedNotification,
      SubscriptionType.ConferenceEndedNotification,
      SubscriptionType.InvitationReceivedNotification,
      SubscriptionType.ParticipantJoinedNotification,
      SubscriptionType.ParticipantLeftNotification,
    ];

    types.forEach((type) => {
      this.events.addListener(SubscriptionType[type], (event: any) => {
        const mapped = transformSubscription(type, event);
        this.#emitter.emit(SubscriptionType[type], mapped);
      });
    });
  }

  public async subscribe(subscriptions: Subscription[]): Promise<boolean> {
    const mapped = subscriptions.map(({ conferenceAlias, type }) => ({
      conferenceAlias,
      type: SubscriptionType[type],
    }));
    return RNNotificationService.subscribe(mapped);
  }

  public async unsubscribe(subscriptions: Subscription[]): Promise<boolean> {
    const mapped = subscriptions.map(({ conferenceAlias, type }) => ({
      conferenceAlias,
      type: SubscriptionType[type],
    }));
    return RNNotificationService.subscribe(mapped);
  }

  public addListener<K extends keyof SubscriptionMapping>(
    type: K,
    listener: (event: SubscriptionMapping[K]) => void
  ): UnregisterCallback {
    const name: string = SubscriptionType[type];
    this.#emitter.addListener(name, listener);

    return () => {
      //this will unregister the listener
      this.#emitter.removeListener(name, listener);
    };
  }

  public async invite(
    conference: Conference,
    participants: ParticipantInfo[]
  ): Promise<boolean> {
    const map = conferenceToMap(conference);

    return RNNotificationService.invite(map, participants);
  }

  public async inviteWithPermissions(
    conference: Conference,
    participants: ParticipantInvited[]
  ): Promise<boolean> {
    const map = conferenceToMap(conference);

    return RNNotificationService.inviteWithPermissions(
      map,
      participants.map((p) => transformParticipantInvited(p))
    );
  }

  public async decline(conference: Conference): Promise<boolean> {
    const map = conferenceToMap(conference);
    return RNNotificationService.decline(map);
  }
}
