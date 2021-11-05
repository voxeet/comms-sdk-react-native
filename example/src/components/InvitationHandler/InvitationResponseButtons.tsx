import React, { useContext } from 'react';
import RNToast from 'react-native-toast-message';

import { DolbyIOContext } from '@components/DolbyIOProvider';
import Button from '@ui/Button';
import Space from '@ui/Space';

import DolbyIoIAPI from '../../../../src/DolbyIoIAPI';
import styles from './InvitationResponseButtons.style';

type InvitationEventResponseProps = {
  conferenceId: string;
};
const InvitationResponseButtons = ({
  conferenceId,
}: InvitationEventResponseProps) => {
  const { join } = useContext(DolbyIOContext);

  const decline = async () => {
    const conference = await DolbyIoIAPI.conference.fetch(conferenceId);
    await DolbyIoIAPI.notification.decline(conference);
    RNToast.hide();
  };
  const accept = async () => {
    await join(conferenceId);
    RNToast.hide();
  };
  return (
    <Space style={styles.container}>
      <Button color="dark" text="accept" size="small" onPress={decline} />
      <Button size="small" color="dark" text="decline" onPress={accept} />
    </Space>
  );
};

export default InvitationResponseButtons;
