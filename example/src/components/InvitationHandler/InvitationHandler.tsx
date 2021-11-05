import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';

import DolbyIoIAPI from '@dolbyio/react-native-iapi-sdk';

import type { InvitationReceivedEventType } from '../../../../src/services/notification/events';
import InvitationResponseButtons from './InvitationResponseButtons';

const InvitationHandler: React.FC = () => {
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
    Toast.show({
      type: 'custom',
      props: {
        title: 'INVITATION RECEIVED EVENT DATA',
        content: JSON.stringify(
          { conferenceAlias, inviterName: name },
          null,
          2
        ),
        children: InvitationResponseButtons({
          conferenceId,
        }),
      },
    });
  };

  useEffect(() => {
    return DolbyIoIAPI.notification.onInvitationReceived(onInvitationReceived);
  }, []);

  return null;
};

export default InvitationHandler;
