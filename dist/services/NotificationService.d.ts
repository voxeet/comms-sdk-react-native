import { UnregisterCallback } from "../types";
import AbstractService from "./AbstractService";
import { Conference, ParticipantInfo } from "./conference";
import { ParticipantInvited, Subscription, SubscriptionMapping } from "./notification";
export default class NotificationService extends AbstractService {
    #private;
    constructor();
    subscribe(subscriptions: Subscription[]): Promise<boolean>;
    unsubscribe(subscriptions: Subscription[]): Promise<boolean>;
    addListener<K extends keyof SubscriptionMapping>(type: K, listener: (event: SubscriptionMapping[K]) => void): UnregisterCallback;
    invite(conference: Conference, participants: ParticipantInfo[]): Promise<boolean>;
    inviteWithPermissions(conference: Conference, participants: ParticipantInvited[]): Promise<boolean>;
    decline(conference: Conference): Promise<boolean>;
}
