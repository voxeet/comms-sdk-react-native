import React, { useState } from 'react';

import CommsAPI from '@dolbyio/react-native-comms-sdk';

export interface IRecordingProvider {
  isRecording?: Boolean;
  startRecord: () => void;
  stopRecord: () => void;
}

export const RecordingContext = React.createContext<IRecordingProvider>({
  isRecording: false,
  startRecord: () => {},
  stopRecord: () => {},
});

const RecordingProvider: React.FC = ({ children }) => {
  const [isRecording, setIsRecording] = useState(false);

  const startRecord = async () => {
    await CommsAPI.recording.start();
    setIsRecording(true);
  };

  const stopRecord = async () => {
    await CommsAPI.recording.stop();
    setIsRecording(false);
  };

  const contextValue = {
    isRecording,
    startRecord,
    stopRecord,
  };

  return (
    <RecordingContext.Provider value={contextValue}>
      {children}
    </RecordingContext.Provider>
  );
};

export default RecordingProvider;
