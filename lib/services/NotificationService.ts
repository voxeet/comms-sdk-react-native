import { Conference, ParticipantInfo } from "./conference";
import {
  ParticipantInvited,
  Subscription,
SubscriptionMapping } from "./notification";


/**
 * 
 * @param type  the expected type from which event is of type
 * @param event the event content which will be transformed to the expected interface (enum values are string => to transform)
 */
function transformSubscription<K extends keyof SubscriptionMapping> (type: K, event: any): SubscriptionMapping[K] {
  throw "not implemented";
}

export default class NotificationService {

  public async subscribe(subscriptions: Subscription[]): Promise<boolean> {
    throw "not implemented";
  }

  public async unsubscribe(subscriptions: Subscription[]): Promise<boolean> {
    throw "not implemented";
  }

  public addListener<K extends keyof SubscriptionMapping>(
    type: K,
    listener: (event: SubscriptionMapping[K]) => void
  ): (() => void) {
    throw "not implemented";
  }

  public async invite(conference: Conference, participants: ParticipantInfo): Promise<boolean> {
    throw "not implemented";
  }

  public async inviteWithPermissions(conference: Conference, participants: ParticipantInvited): Promise<boolean> {
    throw "not implemented";
  }

  public async decline(conference: Conference): Promise<boolean> {
    throw "not implemented";
  }
}