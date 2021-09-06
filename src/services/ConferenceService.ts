import { NativeModules } from 'react-native';
import {
  AudioProcessing,
  Conference,
  ConferenceStatusResult,
  ConferenceType,
  CreateOptions,
  JoinOptions,
  Participant,
  ParticipantPermission,
  ParticipantQuality,
  Quality,
} from './conference';
import { toParticipant } from './conference/Participant';
import { mapToConference } from './conference/Conference';

const { RNConferenceServiceModule } = NativeModules;

export default class ConferenceService {
  public async mute(
    mute: boolean,
    participant?: Participant
  ): Promise<boolean> {
    return RNConferenceServiceModule.mute(!!mute, participant);
  }

  public async isMuted(participant?: Participant): Promise<boolean> {
    return RNConferenceServiceModule.isMuted(participant);
  }

  public async audioLevel(participant?: Participant): Promise<number> {
    return (await RNConferenceServiceModule.audioLevel(participant)) || 0;
  }

  public async muteOutput(mute: boolean): Promise<boolean> {
    return RNConferenceServiceModule.muteOutput(mute);
  }

  public async setAudioProcessing(
    audioProcessing: AudioProcessing
  ): Promise<boolean> {
    const string: string = AudioProcessing[audioProcessing];
    return RNConferenceServiceModule.setAudioProcessing(string);
  }

  public async getAudioProcessing(): Promise<AudioProcessing> {
    const string: string = await RNConferenceServiceModule.getAudioProcessing();
    return AudioProcessing[string as 'VOCAL'];
  }

  public async isOutputMuted(): Promise<boolean> {
    return RNConferenceServiceModule.isOutputMuted();
  }

  public async isSpeaking(participant?: Participant): Promise<boolean> {
    return RNConferenceServiceModule.isSpeaking(participant);
  }

  public async getParticipants(conference: Conference): Promise<Participant[]> {
    const raws: any[] = await RNConferenceServiceModule.getParticipants(
      conference
    );
    return raws.map((raw) => toParticipant(raw));
  }

  public async getMixers(conference: Conference): Promise<Participant[]> {
    const raws: any[] = await RNConferenceServiceModule.getMixers(conference);
    return raws.map((raw) => toParticipant(raw));
  }

  public async findParticipantById(
    participantId: string
  ): Promise<Participant | null> {
    const raw = await RNConferenceServiceModule.findParticipantById(
      participantId
    );
    if (raw == null) return null;
    return toParticipant(raw);
  }

  public async getConferenceType(): Promise<ConferenceType> {
    const raw: string = await RNConferenceServiceModule.getConferenceType();
    return ConferenceType[raw as 'NONE'];
  }

  public async getConference(): Promise<Conference | null> {
    const raw: any = await RNConferenceServiceModule.getConference();
    if (raw == null) return null;
    return mapToConference(raw);
  }

  public async fetchConference(
    conferenceId: string
  ): Promise<Conference | null> {
    const raw: any = await RNConferenceServiceModule.fetchConference(
      conferenceId
    );
    if (raw == null) return null;
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

  public async startVideo(
    isFrontFacingOrParticipant?: boolean | Participant
  ): Promise<boolean> {
    if (!isFrontFacingOrParticipant)
      return RNConferenceServiceModule.startVideo(false);
    if (typeof isFrontFacingOrParticipant === 'boolean')
      return RNConferenceServiceModule.startAudio(!!isFrontFacingOrParticipant);
    return RNConferenceServiceModule.startVideoForParticipant(
      isFrontFacingOrParticipant
    );
  }

  public async stopAudio(participant?: Participant): Promise<boolean> {
    return RNConferenceServiceModule.stopAudio(participant);
  }

  public async stopVideo(participant?: Participant): Promise<boolean> {
    return RNConferenceServiceModule.stopVideo(participant);
  }

  // remaining methods to implement

  public async create(options?: CreateOptions): Promise<Conference> {
    return RNConferenceServiceModule.create(options);
  }

  public async join(
    conference: Conference,
    options?: JoinOptions
  ): Promise<Conference> {
    return RNConferenceServiceModule.join(conference, options);
  }

  public async kick(participant: Participant): Promise<boolean> {
    return RNConferenceServiceModule.kick(participant);
  }
  public async updatePermissions(
    permissions: ParticipantPermission[]
  ): Promise<Conference> {
    return RNConferenceServiceModule.updatePermissions(permissions);
  }

  public async replay(
    conference: Conference,
    offset: number
  ): Promise<Conference> {
    return RNConferenceServiceModule.replay(conference, offset);
  }

  public async getConferenceStatus(
    conferenceId: string
  ): Promise<ConferenceStatusResult> {
    return RNConferenceServiceModule.getConferenceStatus(conferenceId);
  }

  public async simulcast(qualities: ParticipantQuality[]): Promise<boolean> {
    const mapped = qualities.map((req) => ({
      ...req,
      quality: Quality[req.quality],
    }));
    return RNConferenceServiceModule.simulcast(mapped);
  }

  public async getMaxVideoForwarding(): Promise<number | null> {
    return RNConferenceServiceModule.getMaxVideoForwarding();
  }

  public async videoForwarding(
    max: number,
    participants?: Participant[]
  ): Promise<boolean> {
    return RNConferenceServiceModule.videoForwarding(max, participants);
  }

  public async leave(): Promise<boolean> {
    return RNConferenceServiceModule.leave();
  }

  public async hasParticipants(): Promise<boolean> {
    return RNConferenceServiceModule.hasParticipants();
  }
}
