import type {
  Conference,
  ParticipantInfo,
} from '../../../src/services/conference/models';
import DolbyIoIAPI from '@dolbyio/react-native-iapi-sdk';
import { Alert } from 'react-native';

export const invite = async (
  conference: Conference,
  participants: ParticipantInfo[]
) => {
  try {
    await DolbyIoIAPI.notification.invite(conference, participants);
  } catch (e: any) {
    Alert.alert('Invite error', e.toString());
  }
};

export const decline = async (conference: Conference) => {
  try {
    await DolbyIoIAPI.notification.decline(conference);
  } catch (e: any) {
    Alert.alert('Decline error', e.toString());
  }
};
