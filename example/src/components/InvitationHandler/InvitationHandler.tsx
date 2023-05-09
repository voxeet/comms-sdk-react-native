import React, { useContext, useEffect } from 'react';
import { Alert } from 'react-native';

import { DolbyIOContext } from '@components/DolbyIOProvider';
import CommsAPI from '@dolbyio/comms-sdk-react-native';

import type { InvitationReceivedEventType } from '@dolbyio/comms-sdk-react-native/models';
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
    var unsubscribe = CommsAPI.notification.onInvitationReceived(onInvitationReceived);
    return () => {
      unsubscribe();
    };
  }, []);

  return null;
};

export default InvitationHandler;
