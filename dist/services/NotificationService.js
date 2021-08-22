var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 *
 * @param type  the expected type from which event is of type
 * @param event the event content which will be transformed to the expected interface (enum values are string => to transform)
 */
function transformSubscription(type, event) {
    throw "not implemented";
}
export default class NotificationService {
    subscribe(subscriptions) {
        return __awaiter(this, void 0, void 0, function* () {
            throw "not implemented";
        });
    }
    unsubscribe(subscriptions) {
        return __awaiter(this, void 0, void 0, function* () {
            throw "not implemented";
        });
    }
    addListener(type, listener) {
        throw "not implemented";
    }
    invite(conference, participants) {
        return __awaiter(this, void 0, void 0, function* () {
            throw "not implemented";
        });
    }
    inviteWithPermissions(conference, participants) {
        return __awaiter(this, void 0, void 0, function* () {
            throw "not implemented";
        });
    }
    decline(conference) {
        return __awaiter(this, void 0, void 0, function* () {
            throw "not implemented";
        });
    }
}
//# sourceMappingURL=NotificationService.js.map