import { AudioProcessing, Conference, ConferenceType, Participant } from "./conference";
export default class ConferenceService {
    mute(mute: boolean, participant?: Participant): Promise<boolean>;
    isMuted(participant?: Participant): Promise<boolean>;
    audioLevel(participant?: Participant): Promise<number>;
    muteOutput(mute: boolean): Promise<boolean>;
    setAudioProcessing(audioProcessing: AudioProcessing): Promise<boolean>;
    getAudioProcessing(): Promise<AudioProcessing>;
    isOutputMuted(): Promise<boolean>;
    isSpeaking(participant?: Participant): Promise<boolean>;
    getParticipants(conference: Conference): Promise<Participant[]>;
    getMixers(conference: Conference): Promise<Participant[]>;
    findParticipantById(participantId: string): Promise<Participant | null>;
    getConferenceType(): Promise<ConferenceType>;
    getConference(): Promise<Conference | null>;
    fetchConference(conferenceId: string): Promise<Conference | null>;
    isInConference(): Promise<boolean>;
    isLive(): Promise<boolean>;
    startAudio(participant?: Participant): Promise<boolean>;
    startVideo(isFrontFacingOrParticipant?: boolean | Participant): Promise<boolean>;
    stopAudio(participant?: Participant): Promise<boolean>;
    stopVideo(participant?: Participant): Promise<boolean>;
    getMaxVideoForwarding(): Promise<number | null>;
    videoForwarding(max: number, participants?: Participant[]): Promise<boolean>;
    leave(): Promise<boolean>;
    hasParticipants(): Promise<boolean>;
}
