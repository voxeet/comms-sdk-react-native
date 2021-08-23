var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _NotificationService_emitter;
import { EventEmitter2 } from "eventemitter2";
import { NativeModules } from "react-native";
import AbstractService from "./AbstractService";
import { ConferenceParticipantStatus, conferenceToMap } from "./conference";
import { ConferencePermission } from "./notification";
import { SubscriptionType } from "./notification/Subscriptions";
const { RNNotificationService } = NativeModules;
function transformParticipantInvited(participantInvited) {
    return {
        participant: participantInvited.participant,
        permissions: participantInvited.permissions.map(p => ConferencePermission[p])
    };
}
function transformIntoParticipantNotification(participant) {
    return Object.assign(Object.assign({}, participant), { status: ConferenceParticipantStatus[participant.status] });
}
/**
 *
 * @param type  the expected type from which event is of type
 * @param event the event content which will be transformed to the expected interface (enum values are string => to transform)
 */
function transformSubscription(type, event) {
    switch (type) {
        case SubscriptionType.ConferenceCreatedNotification:
        case SubscriptionType.ConferenceEndedNotification: {
            return Object.assign({}, event);
        }
        case SubscriptionType.InvitationReceivedNotification: //in this case, conferenceAlias is not set
        case SubscriptionType.ParticipantJoinedNotification:
        case SubscriptionType.ParticipantLeftNotification: {
            return Object.assign(Object.assign({}, event), { participant: transformIntoParticipantNotification(event.participant) });
        }
        default:
            throw "not implemented " + type + " / " + SubscriptionType[type];
    }
}
export default class NotificationService extends AbstractService {
    constructor() {
        super(RNNotificationService);
        _NotificationService_emitter.set(this, new EventEmitter2());
        //map each SubscriptionType."event" to "event"
        const types = [
            SubscriptionType.ConferenceCreatedNotification,
            SubscriptionType.ConferenceEndedNotification,
            SubscriptionType.InvitationReceivedNotification,
            SubscriptionType.ParticipantJoinedNotification,
            SubscriptionType.ParticipantLeftNotification
        ];
        types.forEach(type => {
            this.events.addListener(SubscriptionType[type], (event) => {
                const mapped = transformSubscription(type, event);
                __classPrivateFieldGet(this, _NotificationService_emitter, "f").emit(SubscriptionType[type], mapped);
            });
        });
    }
    subscribe(subscriptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const mapped = subscriptions.map(({ conferenceAlias, type }) => ({ conferenceAlias, type: SubscriptionType[type] }));
            return RNNotificationService.subscribe(mapped);
        });
    }
    unsubscribe(subscriptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const mapped = subscriptions.map(({ conferenceAlias, type }) => ({ conferenceAlias, type: SubscriptionType[type] }));
            return RNNotificationService.subscribe(mapped);
        });
    }
    addListener(type, listener) {
        const name = SubscriptionType[type];
        __classPrivateFieldGet(this, _NotificationService_emitter, "f").addListener(name, listener);
        return () => {
            //this will unregister the listener
            __classPrivateFieldGet(this, _NotificationService_emitter, "f").removeListener(name, listener);
        };
    }
    invite(conference, participants) {
        return __awaiter(this, void 0, void 0, function* () {
            const map = conferenceToMap(conference);
            return RNNotificationService.invite(map, participants);
        });
    }
    inviteWithPermissions(conference, participants) {
        return __awaiter(this, void 0, void 0, function* () {
            const map = conferenceToMap(conference);
            return RNNotificationService.inviteWithPermissions(map, participants.map(p => transformParticipantInvited(p)));
        });
    }
    decline(conference) {
        return __awaiter(this, void 0, void 0, function* () {
            const map = conferenceToMap(conference);
            return RNNotificationService.decline(map);
        });
    }
}
_NotificationService_emitter = new WeakMap();
//# sourceMappingURL=NotificationService.js.map