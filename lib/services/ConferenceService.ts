import { NativeModules } from "react-native";
import { AudioProcessing, Conference, ConferenceType, Participant } from "./conference";
import { toParticipant } from "./conference/Participant";
import { mapToConference } from "./conference/Conference";

const { RNConferenceServiceModule } = NativeModules;

export default class ConferenceService {

  public async mute(mute: boolean, participant?: Participant): Promise<boolean> {
    return RNConferenceServiceModule.mute(!!mute, participant);
  }

  public async isMuted(participant?: Participant): Promise<boolean> {
    return RNConferenceServiceModule.isMuted(participant);
  }

  public async audioLevel(participant?: Participant): Promise<number> {
    return (await RNConferenceServiceModule.audioLevel(participant)) || 0;
  }

  public async muteOutput(mute: boolean): Promise<boolean> {
    return RNConferenceServiceModule.muteOutput(mute);
  }

  public async setAudioProcessing(audioProcessing: AudioProcessing): Promise<boolean> {
    const string: string = AudioProcessingEvent[audioProcessing];
    return RNConferenceServiceModule.setAudioProcessing(string);
  }

  public async getAudioProcessing(): Promise<AudioProcessing> {
    const string: string = await RNConferenceServiceModule.getAudioProcessing();
    return AudioProcessing[string];
  }

  public async isOutputMuted(): Promise<boolean> {
    return RNConferenceServiceModule.isOutputMuted();
  }

  public async isSpeaking(participant?: Participant): Promise<boolean> {
    return RNConferenceServiceModule.isSpeaking(participant);
  }

  public async getParticipants(conference: Conference): Promise<Participant[]> {
    const raws: any[] = await RNConferenceServiceModule.getParticipants(conference);
    return raws.map(raw => toParticipant(raw));
  }

  public async getMixers(conference: Conference): Promise<Participant[]> {
    const raws: any[] = await RNConferenceServiceModule.getMixers(conference);
    return raws.map(raw => toParticipant(raw));
  }

  public async findParticipantById(participantId: string): Promise<Participant|null> {
    const raw = await RNConferenceServiceModule.findParticipantById(participantId);
    if(null == raw) return null;
    return toParticipant(raw);
  }

  public async getConferenceType(): Promise<ConferenceType> {
    const raw: string = await RNConferenceServiceModule.getConferenceType();
    return ConferenceType[raw];
  }

  public async getConference(): Promise<Conference|null> {
    const raw: any = await RNConferenceServiceModule.getConference();
    if(null == raw) return null;
    return mapToConference(raw);
  }

  public async fetchConference(conferenceId: string): Promise<Conference|null> {
    const raw: any = await RNConferenceServiceModule.fetchConference(conferenceId);
    if(null == raw) return null;
    return mapToConference(raw);
  }

  public async isInConference(): Promise<boolean> {
    return RNConferenceServiceModule.isInConference();
  }

  public async isLive(): Promise<boolean> {
    return RNConferenceServiceModule.isLive();
  }

  public async startAudio(participant?: Participant): Promise<boolean> {
    return RNConferenceServiceModule.startAudio(participant);
  }

  public async startVideo(isFrontFacingOrParticipant?: boolean | Participant): Promise<boolean> {
    if(!isFrontFacingOrParticipant) return RNConferenceServiceModule.startVideo(false);
    if(typeof isFrontFacingOrParticipant === "boolean") return RNConferenceServiceModule.startAudio(!!isFrontFacingOrParticipant);
    return RNConferenceServiceModule.startVideoForParticipant(isFrontFacingOrParticipant);
  }

  public async stopAudio(participant?: Participant): Promise<boolean> {
    return RNConferenceServiceModule.stopAudio(participant);
  }

  public async stopVideo(participant?: Participant): Promise<boolean> {
    return RNConferenceServiceModule.stopVideo(participant);
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

  public async getMaxVideoForwarding(): Promise<number|null> {
    return RNConferenceServiceModule.getMaxVideoForwarding();
  }

  public async videoForwarding(max: number, participants?: Participant[]): Promise<boolean> {
    return RNConferenceServiceModule.videoForwarding(max, participants);
  }

  public async leave(): Promise<boolean> {
    return RNConferenceServiceModule.leave();
  }

  public async hasParticipants(): Promise<boolean> {
    return RNConferenceServiceModule.hasParticipants();
  }
}