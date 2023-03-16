import React, { useContext } from 'react';

import { DolbyIOContext } from '@components/DolbyIOProvider';

import ConferenceScreen from './screens/ConferenceScreen';
import JoinScreen from './screens/JoinScreen';
import LoginScreen from './screens/LoginScreen';
import InputTokenScreen from './screens/InputTokenScreen'

const Main = () => {
  const { isInitialized, me, conference } = useContext(DolbyIOContext);

  if (!isInitialized) {
    return <InputTokenScreen />;
  } else if (!me) {
    return <LoginScreen />;
  } else if (!conference) {
    return <JoinScreen />;
  } else {
    return <ConferenceScreen />;
  }
};

export default Main;
