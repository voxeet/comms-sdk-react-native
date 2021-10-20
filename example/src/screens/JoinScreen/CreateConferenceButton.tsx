import styles from './JoinScreen.style';
import { DolbyIOContext } from '@components/DolbyIOProvider';
import COLORS from '@constants/colors.constants';
import MenuOptionsButton from '@ui/MenuOptionsButton';
import type { Options } from '@ui/MenuOptionsButton/MenuOptionsButton';
import Text from '@ui/Text';
import React, { FunctionComponent, useContext } from 'react';
import { View } from 'react-native';

type CreateConferenceButtonProps = {
  conferenceAlias: string;
};
const CreateConferenceButton: FunctionComponent<CreateConferenceButtonProps> =
  ({ conferenceAlias }) => {
    const { createAndJoin } = useContext(DolbyIOContext);
    const leaveOptions: Options = [
      {
        text: 'Create conference with mixer recording options',
        value: 'createConferenceWithMixer',
        onSelect: async () => {
          await createAndJoin(conferenceAlias, true);
        },
      },
      {
        text: 'Create conference without mixer recording options',
        value: 'createConference',
        onSelect: async () => {
          await createAndJoin(conferenceAlias, false);
        },
      },
    ];

    return (
      <MenuOptionsButton options={leaveOptions}>
        <View style={styles.createConferenceButton}>
          <Text color={COLORS.BLACK}>Create a new conference</Text>
        </View>
      </MenuOptionsButton>
    );
  };

export default CreateConferenceButton;
