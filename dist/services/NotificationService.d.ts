import { Conference, ParticipantInfo } from "./conference";
import { ParticipantInvited, Subscription, SubscriptionMapping } from "./notification";
/**
 *
 * @param type  the expected type from which event is of type
 * @param event the event content which will be transformed to the expected interface (enum values are string => to transform)
 */
export declare function transformSubscription<K extends keyof SubscriptionMapping>(type: K, event: any): SubscriptionMapping[K];
export default class NotificationService {
    subscribe(subscriptions: Subscription[]): Promise<boolean>;
    unsubscribe(subscriptions: Subscription[]): Promise<boolean>;
    addListener<K extends keyof SubscriptionMapping>(type: K, listener: (event: SubscriptionMapping[K]) => void): (() => void);
    invite(conference: Conference, participants: ParticipantInfo): Promise<boolean>;
    inviteWithPermissions(conference: Conference, participants: ParticipantInvited): Promise<boolean>;
    decline(conference: Conference): Promise<boolean>;
}
