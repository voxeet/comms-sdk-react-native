import DolbyIoIAPI from '@dolbyio/react-native-iapi-sdk';
import { Alert } from 'react-native';
import type { Conference } from '../../../src/services/conference/models';
import { ConferenceStatus } from '../../../src/services/conference/models';
import type { Participant } from '../../../lib/typescript/services/conference/models';

export const current = async () => {
  try {
    const conf = await DolbyIoIAPI.conference.current();
    Alert.alert('Current conference', JSON.stringify(conf));
  } catch (e: any) {
    console.log(e);
    Alert.alert('Error');
  }
};
export const replay = (conference: Conference) => {
  try {
    DolbyIoIAPI.conference.replay(conference);
  } catch (e: any) {
    Alert.alert('Error');
  }
};
export const startVideo = () => {
  try {
    DolbyIoIAPI.conference.startVideo({ id: '111', info: { name: 'John' } });
  } catch (e: any) {
    Alert.alert('Error');
  }
};
export const stopVideo = () => {
  try {
    DolbyIoIAPI.conference.stopVideo({ id: '111', info: { name: 'John' } });
  } catch (e: any) {
    Alert.alert('Error');
  }
};
export const startAudio = () => {
  try {
    DolbyIoIAPI.conference.startAudio({ id: '111', info: { name: 'John' } });
  } catch (e: any) {
    Alert.alert('Error');
  }
};
export const stopAudio = () => {
  try {
    DolbyIoIAPI.conference.stopAudio({ id: '111', info: { name: 'John' } });
  } catch (e: any) {
    Alert.alert('Error');
  }
};

export const getAudioLevel = async () => {
  try {
    const audioLevel = await DolbyIoIAPI.conference.getAudioLevel({
      id: '111',
      info: { name: 'John' },
    });
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

export const getStatus = async () => {
  try {
    const status = await DolbyIoIAPI.conference.getStatus({
      participants: [
        {
          id: '123',
          info: {
            name: 'John Doe',
          },
        },
      ],
      status: ConferenceStatus.DEFAULT,
    });
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
