var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { NativeModules } from "react-native";
import { AudioProcessing, ConferenceType } from "./conference";
import { toParticipant } from "./conference/Participant";
import { mapToConference } from "./conference/Conference";
const { RNConferenceServiceModule } = NativeModules;
export default class ConferenceService {
    mute(mute, participant) {
        return __awaiter(this, void 0, void 0, function* () {
            return RNConferenceServiceModule.mute(!!mute, participant);
        });
    }
    isMuted(participant) {
        return __awaiter(this, void 0, void 0, function* () {
            return RNConferenceServiceModule.isMuted(participant);
        });
    }
    audioLevel(participant) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield RNConferenceServiceModule.audioLevel(participant)) || 0;
        });
    }
    muteOutput(mute) {
        return __awaiter(this, void 0, void 0, function* () {
            return RNConferenceServiceModule.muteOutput(mute);
        });
    }
    setAudioProcessing(audioProcessing) {
        return __awaiter(this, void 0, void 0, function* () {
            const string = AudioProcessingEvent[audioProcessing];
            return RNConferenceServiceModule.setAudioProcessing(string);
        });
    }
    getAudioProcessing() {
        return __awaiter(this, void 0, void 0, function* () {
            const string = yield RNConferenceServiceModule.getAudioProcessing();
            return AudioProcessing[string];
        });
    }
    isOutputMuted() {
        return __awaiter(this, void 0, void 0, function* () {
            return RNConferenceServiceModule.isOutputMuted();
        });
    }
    isSpeaking(participant) {
        return __awaiter(this, void 0, void 0, function* () {
            return RNConferenceServiceModule.isSpeaking(participant);
        });
    }
    getParticipants(conference) {
        return __awaiter(this, void 0, void 0, function* () {
            const raws = yield RNConferenceServiceModule.getParticipants(conference);
            return raws.map(raw => toParticipant(raw));
        });
    }
    getMixers(conference) {
        return __awaiter(this, void 0, void 0, function* () {
            const raws = yield RNConferenceServiceModule.getMixers(conference);
            return raws.map(raw => toParticipant(raw));
        });
    }
    findParticipantById(participantId) {
        return __awaiter(this, void 0, void 0, function* () {
            const raw = yield RNConferenceServiceModule.findParticipantById(participantId);
            if (null == raw)
                return null;
            return toParticipant(raw);
        });
    }
    getConferenceType() {
        return __awaiter(this, void 0, void 0, function* () {
            const raw = yield RNConferenceServiceModule.getConferenceType();
            return ConferenceType[raw];
        });
    }
    getConference() {
        return __awaiter(this, void 0, void 0, function* () {
            const raw = yield RNConferenceServiceModule.getConference();
            if (null == raw)
                return null;
            return mapToConference(raw);
        });
    }
    fetchConference(conferenceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const raw = yield RNConferenceServiceModule.fetchConference(conferenceId);
            if (null == raw)
                return null;
            return mapToConference(raw);
        });
    }
    isInConference() {
        return __awaiter(this, void 0, void 0, function* () {
            return RNConferenceServiceModule.isInConference();
        });
    }
    isLive() {
        return __awaiter(this, void 0, void 0, function* () {
            return RNConferenceServiceModule.isLive();
        });
    }
    startAudio(participant) {
        return __awaiter(this, void 0, void 0, function* () {
            return RNConferenceServiceModule.startAudio(participant);
        });
    }
    startVideo(isFrontFacingOrParticipant) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isFrontFacingOrParticipant)
                return RNConferenceServiceModule.startVideo(false);
            if (typeof isFrontFacingOrParticipant === "boolean")
                return RNConferenceServiceModule.startAudio(!!isFrontFacingOrParticipant);
            return RNConferenceServiceModule.startVideoForParticipant(isFrontFacingOrParticipant);
        });
    }
    stopAudio(participant) {
        return __awaiter(this, void 0, void 0, function* () {
            return RNConferenceServiceModule.stopAudio(participant);
        });
    }
    stopVideo(participant) {
        return __awaiter(this, void 0, void 0, function* () {
            return RNConferenceServiceModule.stopVideo(participant);
        });
    }
    // remaining methods to implement
    //Promise<Conference> create(@NonNull ConferenceCreateOptions conferenceCreateOptions)
    //Promise<Conference> listen(@NonNull Conference) 
    //Promise<Conference> listen(@NonNull ConferenceListenOptions options) 
    //Promise<Conference> broadcast(@NonNull Conference conference)
    //Promise<Conference> join(@NonNull ConferenceJoinOptions options)
    //Promise<Boolean> kick(@NonNull Participant participant)
    //Promise<Boolean> updatePermissions(@NonNull List<ParticipantPermissions> participantPermissions)
    //Promise<Conference> replay(@NonNull Conference conference, long offset)
    //java.util.Map<String, JSONArray> localStats()
    //Promise<ConferenceStatusResult> getConferenceStatus(String conferenceId)
    //Promise<Boolean> simulcast(@NonNull List<ParticipantQuality> requested) 
    getMaxVideoForwarding() {
        return __awaiter(this, void 0, void 0, function* () {
            return RNConferenceServiceModule.getMaxVideoForwarding();
        });
    }
    videoForwarding(max, participants) {
        return __awaiter(this, void 0, void 0, function* () {
            return RNConferenceServiceModule.videoForwarding(max, participants);
        });
    }
    leave() {
        return __awaiter(this, void 0, void 0, function* () {
            return RNConferenceServiceModule.leave();
        });
    }
    hasParticipants() {
        return __awaiter(this, void 0, void 0, function* () {
            return RNConferenceServiceModule.hasParticipants();
        });
    }
}
//# sourceMappingURL=ConferenceService.js.map