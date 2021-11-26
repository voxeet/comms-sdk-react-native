import { Alert } from 'react-native';

import DolbyIoIAPI from '@dolbyio/react-native-iapi-sdk';

import type {
  Participant,
  SpatialDirection,
  SpatialScale,
  SpatialPosition,
  Conference,
  ParticipantPermissions,
  AudioProcessingOptions,
} from '../../../src/services/conference/models';
import type { User } from '../../../src/services/session/models';

export const current = async () => {
  try {
    const conf = await DolbyIoIAPI.conference.current();
    Alert.alert('Current conference', JSON.stringify(conf, null, 2));
  } catch (e: any) {
    console.log(e);
    Alert.alert('Error');
  }
};
export const replay = async (conference: Conference) => {
  try {
    await DolbyIoIAPI.conference.replay(conference);
  } catch (e: any) {
    Alert.alert('Error');
  }
};
export const startVideo = async (user: User) => {
  console.log(user);
  try {
    await DolbyIoIAPI.conference.startVideo(user);
  } catch (e: any) {
    console.log(e);
    Alert.alert('Error');
  }
};
export const stopVideo = async (user: User) => {
  try {
    await DolbyIoIAPI.conference.stopVideo(user);
  } catch (e: any) {
    console.log(e);
    Alert.alert('Error');
  }
};
export const startAudio = async (user: User) => {
  try {
    await DolbyIoIAPI.conference.startAudio(user);
  } catch (e: any) {
    Alert.alert('Error');
  }
};
export const stopAudio = async (user: User) => {
  try {
    await DolbyIoIAPI.conference.stopAudio(user);
  } catch (e: any) {
    Alert.alert('Error');
  }
};

export const getAudioLevel = async (user: User) => {
  try {
    const audioLevel = await DolbyIoIAPI.conference.getAudioLevel(user);
    Alert.alert('Audio level', JSON.stringify(audioLevel));
  } catch (e: any) {
    Alert.alert('Cant get audio level', e);
  }
};

export const getStatus = async (conference: Conference) => {
  try {
    const status = await DolbyIoIAPI.conference.getStatus(conference);
    Alert.alert('Status', JSON.stringify(status));
  } catch (e: any) {
    Alert.alert('Cant get status', e);
  }
};

export const getLocalStats = async () => {
  try {
    const localStats = await DolbyIoIAPI.conference.getLocalStats();
    Alert.alert('Local stats', JSON.stringify(localStats));
  } catch (e: any) {
    Alert.alert('Cant get local stats', e);
  }
};

export const getMaxVideoForwarding = async () => {
  try {
    const maxVideoForwarding =
      await DolbyIoIAPI.conference.getMaxVideoForwarding();
    Alert.alert('Max video forwarding', JSON.stringify(maxVideoForwarding));
  } catch (e: any) {
    Alert.alert('Cant get max video forwarding', e.toString());
  }
};

export const kick = async (participant: Participant) => {
  try {
    console.log('KICKED PARTICIPANT', JSON.stringify(participant, null, 2));
    await DolbyIoIAPI.conference.kick(participant);
  } catch (e: any) {
    Alert.alert('Error', e.toString());
  }
};

export const mute = async (participant: Participant, isMuted: boolean) => {
  try {
    await DolbyIoIAPI.conference.mute(participant, isMuted);
    Alert.alert('Mute success');
  } catch (e: any) {
    Alert.alert('Error', e.toString());
  }
};

export const getParticipant = async (participantId: string) => {
  try {
    const participant: Participant =
      await DolbyIoIAPI.conference.getParticipant(participantId);
    Alert.alert('Participant:', JSON.stringify(participant));
  } catch (e: any) {
    Alert.alert('getParticipant error', e.toString());
  }
};

export const getParticipants = async (conference: Conference) => {
  try {
    const participants = await DolbyIoIAPI.conference.getParticipants(
      conference
    );
    Alert.alert('Participants:', JSON.stringify(participants));
  } catch (e: any) {
    Alert.alert('getParticipants error', e.toString());
  }
};

export const isMuted = async () => {
  try {
    const muted = await DolbyIoIAPI.conference.isMuted();
    Alert.alert('muted:', muted.toString());
  } catch (e: any) {
    Alert.alert('isMuted error', e.toString());
  }
};

export const isSpeaking = async (participant: Participant) => {
  try {
    const speaking = await DolbyIoIAPI.conference.isSpeaking(participant);
    Alert.alert('speaking:', speaking.toString());
  } catch (e: any) {
    Alert.alert('isSpeaking error', e.toString());
  }
};

export const setAudioProcessing = async (options: AudioProcessingOptions) => {
  try {
    await DolbyIoIAPI.conference.setAudioProcessing(options);
    Alert.alert('setAudioProcessing success');
  } catch (e: any) {
    Alert.alert('setAudioProcessing error', e.toString());
  }
};

export const setMaxVideoForwarding = async (max: number) => {
  try {
    await DolbyIoIAPI.conference.setMaxVideoForwarding(max);
    Alert.alert('setMaxVideoForwarding success');
  } catch (e: any) {
    Alert.alert('setMaxVideoForwarding error', e.toString());
  }
};

export const updatePermissions = async (
  participantPermissions: ParticipantPermissions[]
) => {
  try {
    await DolbyIoIAPI.conference.updatePermissions(participantPermissions);
  } catch (e: any) {
    Alert.alert('updatePermissions error', e.toString());
  }
};

export const startScreenShare = async () => {
  try {
    await DolbyIoIAPI.conference.startScreenShare();
    Alert.alert('Screen sharing started');
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('Start screen sharing error', msg);
  }
};

export const stopScreenShare = async () => {
  try {
    await DolbyIoIAPI.conference.stopScreenShare();
    Alert.alert('Screen sharing stopped');
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('Stop screen sharing error', msg);
  }
};

export const setSpatialDirection = async (
  participant: Participant,
  spatialDirection: SpatialDirection
) => {
  try {
    await DolbyIoIAPI.conference.setSpatialDirection(
      participant,
      spatialDirection
    );
    Alert.alert('setSpatialDirection success');
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('setSpatialDirection error', msg);
  }
};

export const setSpatialEnvironment = async (
  scale: SpatialScale,
  forward: SpatialScale,
  up: SpatialScale,
  right: SpatialScale
) => {
  try {
    await DolbyIoIAPI.conference.setSpatialEnvironment(
      scale,
      forward,
      up,
      right
    );
    Alert.alert('setSpatialEnvironent success');
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('setSpatialEnvironment error', msg);
  }
};

export const setSpatialPosition = async (
  participant: Participant,
  position: SpatialPosition
) => {
  try {
    await DolbyIoIAPI.conference.setSpatialPosition(participant, position);
    Alert.alert('setSpatialPosition success');
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('setSpatialPosition error', msg);
  }
};
