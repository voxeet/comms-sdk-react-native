import React, { useContext, useEffect } from 'react';
import { Alert } from 'react-native';

import { DolbyIOContext } from '@components/DolbyIOProvider';
import CommsAPI from '@dolbyio/comms-sdk-react-native';

import type { InvitationReceivedEventType } from '../../../../src/services/notification/events';
import { accept, decline } from '../../utils/notification.tester';

const InvitationHandler: React.FC = () => {
  const { joinWithId } = useContext(DolbyIOContext);
  const onInvitationReceived = (data: InvitationReceivedEventType) => {
    console.log(
      'INVITATION RECEIVED EVENT DATA: \n',
      JSON.stringify(data, null, 2)
    );
    const {
      conferenceAlias,
      conferenceId,
      participant: {
        info: { name },
      },
    } = data;

    Alert.alert(
      'INVITATION RECEIVED EVENT DATA',
      JSON.stringify({ conferenceAlias, inviterName: name }, null, 2),
      [
        { text: 'Accept', onPress: () => accept(conferenceId, joinWithId) },
        { text: 'Decline', onPress: () => decline(conferenceId) },
      ]
    );
  };

  useEffect(() => {
    return CommsAPI.notification.onInvitationReceived(onInvitationReceived);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default InvitationHandler;
