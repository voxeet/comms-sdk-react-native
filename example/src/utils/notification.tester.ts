import { Alert } from 'react-native';

import CommsAPI from '@dolbyio/comms-sdk-react-native';

import type {
  Conference,
  ParticipantInvited,
} from '../../../src/services/conference/models';
import { ConferencePermission } from '../../../src/services/conference/models';

const randomInvitedParticipant = ({
  includePermissions = false,
} = {}): ParticipantInvited => ({
  info: {
    externalId: 'externalId-123',
    name: 'John Invited',
  },
  permissions: includePermissions ? [ConferencePermission.INVITE] : [],
});

export const invite = async (
  conference: Conference,
  participants: ParticipantInvited[]
) => {
  try {
    await CommsAPI.notification.invite(conference, participants);
  } catch (e: any) {
    Alert.alert('Invite error', e.toString());
  }
};

export const inviteRandomParticipant = async (conference: Conference) => {
  try {
    await CommsAPI.notification.invite(conference, [
      randomInvitedParticipant(),
    ]);
  } catch (e: any) {
    Alert.alert('Invite error', e.toString());
  }
};

export const decline = async (conferenceId: string) => {
  try {
    const conference = await CommsAPI.conference.fetch(conferenceId);
    await CommsAPI.notification.decline(conference);
  } catch (e: any) {
    console.log('couldnt decline conference invitation\n', e.toString());
  }
};

export const accept = async (
  conferenceId: string,
  joinWithId: (id: string) => void
) => {
  try {
    joinWithId(conferenceId);
  } catch (e: any) {
    console.log('couldnt accept conference invitation\n', e.toString());
  }
};
