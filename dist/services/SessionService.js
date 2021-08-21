var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { NativeModules } from 'react-native';
const { RNSessionServiceModule } = NativeModules;
export default class SessionService {
    //TODO make sure open() is also possible
    open(participant) {
        return __awaiter(this, void 0, void 0, function* () {
            return RNSessionServiceModule.open(participant);
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            return RNSessionServiceModule.close();
        });
    }
    isLocalParticipant(participant) {
        return __awaiter(this, void 0, void 0, function* () {
            throw "not implemented";
        });
    }
    isSocketOpen() {
        return __awaiter(this, void 0, void 0, function* () {
            throw "not implemented";
        });
    }
}
//# sourceMappingURL=SessionService.js.map