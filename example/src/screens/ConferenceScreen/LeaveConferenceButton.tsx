import styles from './ConferenceScreen.style';
import { DolbyIOContext } from '@components/DolbyIOProvider';
import COLORS from '@constants/colors.constants';
import MenuOptionsButton from '@ui/MenuOptionsButton';
import type { Options } from '@ui/MenuOptionsButton/MenuOptionsButton';
import Text from '@ui/Text';
import React, { useContext } from 'react';
import { View } from 'react-native';

const LeaveConferenceButton = () => {
  const { leave } = useContext(DolbyIOContext);
  const leaveOptions: Options = [
    {
      text: 'Leave and close session',
      value: 'leaveAndCloseSession',
      onSelect: async () => {
        await leave(true);
      },
    },
    {
      text: 'Leave without closing session',
      value: 'leaveWithoutClosingSession',
      onSelect: async () => {
        await leave(false);
      },
    },
  ];

  return (
    <MenuOptionsButton options={leaveOptions}>
      <View style={styles.buttonText}>
        <Text size="s" color={COLORS.BLACK}>
          Leave
        </Text>
      </View>
    </MenuOptionsButton>
  );
};

export default LeaveConferenceButton;
