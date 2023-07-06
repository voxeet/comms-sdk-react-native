import { Alert } from 'react-native';
import CommsAPI from '@dolbyio/comms-sdk-react-native';



export const record = async () => {
    try {
      await CommsAPI.audio._localAudio.preview().record(3);
      console.log('Record success');
    } catch (e: any) {
      console.log(e);
      Alert.alert('Error');
    }
};

export const play = async () => {
    try {
      CommsAPI.audio._localAudio.preview().play(false);
      console.log('Play success');
    } catch (e: any) {
      console.log(e);
      Alert.alert('Error');
    }
};

export const cancel = async () => {
    try {
      const cancel = await CommsAPI.audio._localAudio.preview().cancel();
      console.log('Cancel: ', cancel.toString());
    } catch (e: any) {
      console.log(e);
      Alert.alert('Error');
    }
};

export const release = async () => {
    try {
      CommsAPI.audio._localAudio.preview().release();
      console.log('Release success');
    } catch (e: any) {
      console.log(e);
      Alert.alert('Error');
    }
};
