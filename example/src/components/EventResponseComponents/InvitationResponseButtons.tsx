import React from 'react';
import RNToast from 'react-native-toast-message';

import Button from '@ui/Button';
import Space from '@ui/Space';
import { accept, decline } from '@utils/notification.tester';

import type { Conference } from '../../../../src/services/conference/models';
import styles from './InvitationResponseButtons.style';

type InvitationEventResponseProps = {
  conferenceId: string;
  setConference: (conference: Conference) => void;
};
export const InvitationResponseButtons = ({
  conferenceId,
  setConference,
}: InvitationEventResponseProps) => {
  const declineInvitation = async () => {
    await decline(conferenceId);
    RNToast.hide();
  };
  const acceptInvitation = async () => {
    const conference = await accept(conferenceId);
    setConference(conference);
    RNToast.hide();
  };
  return (
    <Space style={styles.container}>
      <Button
        color="dark"
        text="accept"
        size="small"
        onPress={acceptInvitation}
      />
      <Button
        size="small"
        color="dark"
        text="decline"
        onPress={declineInvitation}
      />
    </Space>
  );
};
