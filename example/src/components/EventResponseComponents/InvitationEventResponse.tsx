import React from 'react';

import Button from '@ui/Button';
import Space from '@ui/Space';
import { accept, decline } from '@utils/notification.tester';

import styles from './InvitationEventResponse.style';

type InvitationEventResponseProps = {
  conferenceAlias: string;
};
export const InvitationEventResponse = ({
  conferenceAlias,
}: InvitationEventResponseProps) => {
  const declineInvitation = () => decline(conferenceAlias);
  const acceptInvitation = () => accept(conferenceAlias);
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
