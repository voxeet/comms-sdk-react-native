import React from 'react';
import RNToast from 'react-native-toast-message';

import Button from '@ui/Button';
import Space from '@ui/Space';

import DolbyIoIAPI from '../../../../src/DolbyIoIAPI';
import styles from './InvitationResponseButtons.style';

type InvitationEventResponseProps = {
  conferenceId: string;
  joinWithId: (id: string) => void;
};
const InvitationResponseButtons = ({
  conferenceId,
  joinWithId,
}: InvitationEventResponseProps) => {
  const decline = async () => {
    try {
      const conference = await DolbyIoIAPI.conference.fetch(conferenceId);
      await DolbyIoIAPI.notification.decline(conference);
      RNToast.hide();
    } catch (e: any) {
      console.log('couldnt decline conference invitation\n', e.toString());
    }
  };
  const accept = async () => {
    try {
      joinWithId(conferenceId);
      RNToast.hide();
    } catch (e: any) {
      console.log('couldnt accept conference invitation\n', e.toString());
    }
  };
  return (
    <Space style={styles.container}>
      <Button color="dark" text="accept" size="small" onPress={accept} />
      <Button size="small" color="dark" text="decline" onPress={decline} />
    </Space>
  );
};

export default InvitationResponseButtons;
