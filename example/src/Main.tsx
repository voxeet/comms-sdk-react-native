import React, { useContext } from 'react';

import { DolbyIOContext } from '@components/DolbyIOProvider';

import ConferenceScreen from './screens/ConferenceScreen';
import JoinScreen from './screens/JoinScreen';
import LoginScreen from './screens/LoginScreen';
import InputTokenScreen from './screens/InputTokenScreen'
import AudioPreviewScreen from '@screens/AudioPreviewScreen';

const Main = () => {
  const { isInitialized, me, conference, isAudioPreviewScreen } = useContext(DolbyIOContext);

  if (!isInitialized) {
    return <InputTokenScreen />;
  } else if (!me) {
    return <LoginScreen />;
  } else if (!conference && !isAudioPreviewScreen) {
    return <JoinScreen />;
  } else if (isAudioPreviewScreen) {
    return <AudioPreviewScreen />;
  } else {
    return <ConferenceScreen />;
  }
};

export default Main;
