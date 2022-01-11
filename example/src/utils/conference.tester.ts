import { Alert } from 'react-native';

import CommsAPI from '@dolbyio/react-native-comms-sdk';

import type {
  Participant,
  Conference,
  ParticipantPermissions,
  AudioProcessingOptions,
} from '../../../src/services/conference/models';

export const current = async () => {
  try {
    const conf = await CommsAPI.conference.current();
    Alert.alert('Current conference', JSON.stringify(conf, null, 2));
  } catch (e: any) {
    console.log(e);
    Alert.alert('Error');
  }
};
export const replay = async (conference: Conference) => {
  try {
    await CommsAPI.conference.replay(conference);
  } catch (e: any) {
    Alert.alert('Error');
  }
};
export const startVideo = async (user: Participant) => {
  console.log(user);
  try {
    await CommsAPI.conference.startVideo(user);
  } catch (e: any) {
    console.log(e);
    Alert.alert('Error');
  }
};
export const stopVideo = async (user: Participant) => {
  try {
    await CommsAPI.conference.stopVideo(user);
  } catch (e: any) {
    console.log(e);
    Alert.alert('Error');
  }
};
export const startAudio = async (user: Participant) => {
  try {
    await CommsAPI.conference.startAudio(user);
  } catch (e: any) {
    Alert.alert('Error');
  }
};
export const stopAudio = async (user: Participant) => {
  try {
    await CommsAPI.conference.stopAudio(user);
  } catch (e: any) {
    Alert.alert('Error');
  }
};

export const getAudioLevel = async (user: Participant) => {
  try {
    const audioLevel = await CommsAPI.conference.getAudioLevel(user);
    Alert.alert('Audio level', JSON.stringify(audioLevel));
  } catch (e: any) {
    Alert.alert('Cant get audio level', e);
  }
};

export const getStatus = async (conference: Conference) => {
  try {
    const status = await CommsAPI.conference.getStatus(conference);
    Alert.alert('Status', JSON.stringify(status));
  } catch (e: any) {
    Alert.alert('Cant get status', e);
  }
};

export const getLocalStats = async () => {
  try {
    const localStats = await CommsAPI.conference.getLocalStats();
    Alert.alert('Local stats', JSON.stringify(localStats));
  } catch (e: any) {
    Alert.alert('Cant get local stats', e);
  }
};

export const getMaxVideoForwarding = async () => {
  try {
    const maxVideoForwarding =
      await CommsAPI.conference.getMaxVideoForwarding();
    Alert.alert('Max video forwarding', JSON.stringify(maxVideoForwarding));
  } catch (e: any) {
    Alert.alert('Cant get max video forwarding', e.toString());
  }
};

export const kick = async (participant: Participant) => {
  try {
    console.log('KICKED PARTICIPANT', JSON.stringify(participant, null, 2));
    await CommsAPI.conference.kick(participant);
  } catch (e: any) {
    Alert.alert('Error', e.toString());
  }
};

export const mute = async (participant: Participant) => {
  try {
    await CommsAPI.conference.mute(participant, true);
    Alert.alert('Mute success');
  } catch (e: any) {
    Alert.alert('Error', e.toString());
  }
};

export const unmute = async (participant: Participant) => {
  try {
    await CommsAPI.conference.mute(participant, false);
    Alert.alert('Unmute success');
  } catch (e: any) {
    Alert.alert('Error', e.toString());
  }
};

export const getParticipant = async (participantId: string) => {
  try {
    const participant: Participant = await CommsAPI.conference.getParticipant(
      participantId
    );
    Alert.alert('Participant:', JSON.stringify(participant));
  } catch (e: any) {
    Alert.alert('getParticipant error', e.toString());
  }
};

export const getParticipants = async (conference: Conference) => {
  try {
    const participants = await CommsAPI.conference.getParticipants(conference);
    Alert.alert('Participants:', JSON.stringify(participants));
  } catch (e: any) {
    Alert.alert('getParticipants error', e.toString());
  }
};

export const isMuted = async () => {
  try {
    const muted = await CommsAPI.conference.isMuted();
    Alert.alert('muted:', muted.toString());
  } catch (e: any) {
    Alert.alert('isMuted error', e.toString());
  }
};

export const isSpeaking = async (participant: Participant) => {
  try {
    const isParticipantSpeaking = await CommsAPI.conference.isSpeaking(
      participant
    );
    Alert.alert(
      `is Participant ${
        participant.info.name
      } speaking: ${isParticipantSpeaking.toString()}`
    );
  } catch (e: any) {
    Alert.alert(e, 'isSpeaking error');
  }
};

export const setAudioProcessing = async (options: AudioProcessingOptions) => {
  try {
    await CommsAPI.conference.setAudioProcessing(options);
    Alert.alert('setAudioProcessing success');
  } catch (e: any) {
    Alert.alert('setAudioProcessing error', e.toString());
  }
};

export const setMaxVideoForwarding = async (max: number) => {
  try {
    await CommsAPI.conference.setMaxVideoForwarding(max);
    Alert.alert('setMaxVideoForwarding success');
  } catch (e: any) {
    Alert.alert('setMaxVideoForwarding error', e.toString());
  }
};

export const updatePermissions = async (
  participantPermissions: ParticipantPermissions[]
) => {
  try {
    await CommsAPI.conference.updatePermissions(participantPermissions);
  } catch (e: any) {
    Alert.alert('updatePermissions error', e.toString());
  }
};

export const startScreenShare = async () => {
  try {
    await CommsAPI.conference.startScreenShare();
    Alert.alert('Screen sharing started');
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('Start screen sharing error', msg);
  }
};

export const stopScreenShare = async () => {
  try {
    await CommsAPI.conference.stopScreenShare();
    Alert.alert('Screen sharing stopped');
  } catch (e) {
    const msg = (e as Error).message;
    Alert.alert('Stop screen sharing error', msg);
  }
};
