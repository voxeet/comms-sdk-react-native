import type { Participant } from '../../../lib/typescript/services/conference/models';
import type {
  Conference,
  ParticipantPermissions,
} from '../../../src/services/conference/models';
import type { User } from '../../../src/services/session/models';
import DolbyIoIAPI from '@dolbyio/react-native-iapi-sdk';
import { Alert } from 'react-native';

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
  try {
    await DolbyIoIAPI.conference.startVideo(user);
  } catch (e: any) {
    Alert.alert('Error');
  }
};
export const stopVideo = async (user: User) => {
  try {
    await DolbyIoIAPI.conference.stopVideo(user);
  } catch (e: any) {
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

// export const getAudioProcessing = async () => {
//   try {
//     const audioProcessing = await DolbyIoIAPI.conference.getAudioProcessing();
//     Alert.alert('Audio processing', JSON.stringify(audioProcessing));
//   } catch (e: any) {
//     Alert.alert('Cant get audio processing', e);
//   }
// };

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
    Alert.alert('Cant get max video forwarding', e);
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

export const isOutputMuted = async () => {
  try {
    const outputMuted = await DolbyIoIAPI.conference.isOutputMuted();
    Alert.alert('Output:', outputMuted.toString());
  } catch (e: any) {
    Alert.alert('isOutputMuted error', e.toString());
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

export const setAudioProcessing = async () => {
  try {
    await DolbyIoIAPI.conference.setAudioProcessing();
  } catch (e: any) {
    Alert.alert('setAudioProcessing error', e.toString());
  }
};

export const setMaxVideoForwarding = async () => {
  try {
    await DolbyIoIAPI.conference.setMaxVideoForwarding();
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
