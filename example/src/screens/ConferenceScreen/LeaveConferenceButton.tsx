import React from 'react';
import { View } from 'react-native';
import COLORS from '@constants/colors.constants';
import MenuOptionsButton from '@ui/MenuOptionsButton';
import type { Options } from '@ui/MenuOptionsButton/MenuOptionsButton';
import Text from '@ui/Text';

import styles from './ConferenceScreen.style';

type LeaveBtnProps = {
  onPress: (closeSession: boolean) => void
};

const LeaveConferenceButton: React.FC<LeaveBtnProps> = ({ onPress }) => {
  const leaveOptions: Options = [
    {
      text: 'Leave and close session',
      value: 'leaveAndCloseSession',
      onSelect: () => onPress(true),
    },
    {
      text: 'Leave without closing session',
      value: 'leaveWithoutClosingSession',
      onSelect: () => onPress(false),
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
