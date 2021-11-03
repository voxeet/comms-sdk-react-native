import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import DolbyIoIAPI from '@dolbyio/react-native-iapi-sdk';
// @ts-ignore
import { APP_ID, APP_SECRET } from '@env';

import { Codec, RTCPMode } from '../../../../src/services/conference/models';
import type { Conference } from '../../../../src/services/conference/models';
import type { User } from '../../../../src/services/session/models';

export interface IDolbyIOProvider {
  user?: User;
  conference?: Conference;
  lastConference?: Conference;
  isInitialized?: Boolean;
  isRecordingConference: Boolean;
  initialize: () => void;
  openSession: (name: string, externalId?: string) => void;
  createAndJoin: (alias: string, liveRecording: boolean) => void;
  join: (alias: string) => void;
  replay: () => void;
  leave: (leaveRoom: boolean) => void;
  setIsRecordingConference: (isRecording: boolean) => void;
  updateConferenceParticipants: () => void;
}

export const DolbyIOContext = React.createContext<IDolbyIOProvider>({
  isRecordingConference: false,
  initialize: () => {},
  openSession: () => {},
  createAndJoin: () => {},
  join: () => {},
  replay: () => {},
  leave: () => {},
  setIsRecordingConference: () => {},
  updateConferenceParticipants: () => {},
});

// let onStatusChangeRemover: () => void | undefined;

const DolbyIOProvider: React.FC = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [conference, setConference] = useState<Conference | undefined>(
    undefined
  );
  const [lastConference, setLastConference] = useState<Conference | undefined>(
    undefined
  );
  const [isRecordingConference, setIsRecordingConference] =
    useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const unsubscribeConferenceChangeFn = DolbyIoIAPI.conference.onStatusChange(
      (data) => {
        console.log(
          'CONFERENCE STATUS CHANGE EVENT DATA: \n',
          JSON.stringify(data, null, 2)
        );
      }
    );
    const unsubscribeCommandMessageFn = DolbyIoIAPI.command.onMessageReceived(
      (data) => {
        console.log(
          'MESSAGE RECEIVED EVENT DATA: \n',
          JSON.stringify(data, null, 2)
        );
      }
    );
    const unsubscribeParticipantChangeFn =
      DolbyIoIAPI.conference.onParticipantsChange((data) => {
        console.log(
          'PARTICIPANT CHANGE EVENT DATA: \n',
          JSON.stringify(data, null, 2)
        );
      });

    const unsubscribeInvitationReceivedFn =
      DolbyIoIAPI.notification.onInvitationReceived((data) => {
        console.log(
          'INVITATION RECEIVED EVENT DATA: \n',
          JSON.stringify(data, null, 2)
        );
      });
    return () => {
      unsubscribeConferenceChangeFn();
      unsubscribeCommandMessageFn();
      unsubscribeParticipantChangeFn();
      unsubscribeInvitationReceivedFn();
    };
  }, []);

  const updateConferenceParticipants = async () => {
    try {
      const updatedConference = await DolbyIoIAPI.conference.current();
      setConference((conference) => {
        if (!conference) return undefined;
        return {
          ...conference,
          participants: updatedConference.participants,
        };
      });
    } catch (e: any) {
      setConference(undefined);
      Alert.alert('Conference update participants failed', e.toString());
    }
  };

  const initialize = async () => {
    try {
      await DolbyIoIAPI.initialize(APP_ID, APP_SECRET);
      setIsInitialized(true);
      Alert.alert('App initialized successfully');
    } catch (e: any) {
      setIsInitialized(false);
      Alert.alert('App not initialized', e);
    }
  };
  const openSession = async (name: string, externalId?: string) => {
    try {
      await DolbyIoIAPI.session.open({ name, externalId });
      const currentUser = await DolbyIoIAPI.session.getCurrentUser();
      setUser(currentUser);
      Alert.alert(`Session opened as ${name}`);
    } catch (e: any) {
      setUser(undefined);
      Alert.alert('Session not opened', e.toString());
    }
  };
  const createAndJoin = async (alias: string, liveRecording: boolean) => {
    try {
      const conferenceParams = {
        liveRecording: liveRecording,
        rtcpMode: RTCPMode.AVERAGE,
        ttl: 0,
        videoCodec: Codec.H264,
        dolbyVoice: true,
      };
      const conferenceOptions = {
        alias,
        params: conferenceParams,
      };

      const createdConference = await DolbyIoIAPI.conference.create(
        conferenceOptions
      );

      const joinOptions = {
        constraints: {
          audio: true,
          video: false,
        },
        simulcast: false,
      };
      const joinedConference = await DolbyIoIAPI.conference.join(
        createdConference,
        joinOptions
      );
      console.log(JSON.stringify(joinedConference, null, 2));
      setConference(joinedConference);
    } catch (e: any) {
      Alert.alert('Conference not joined', e.toString());
    }
  };

  const join = async (alias: string) => {
    try {
      const fetchedConference = await DolbyIoIAPI.conference.fetch(alias);

      const joinOptions = {
        constraints: {
          audio: true,
          video: false,
        },
        simulcast: false,
      };
      const joinedConference = await DolbyIoIAPI.conference.join(
        fetchedConference,
        joinOptions
      );
      console.log(JSON.stringify(joinedConference, null, 2));
      setConference(joinedConference);
    } catch (e: any) {
      Alert.alert('Conference not joined', e.toString());
    }
  };

  const replay = async () => {
    try {
      console.log(JSON.stringify(lastConference, null, 2), 'LAST CONFERENCE');
      const replayedConference = await DolbyIoIAPI.conference.replay(
        lastConference as Conference
      );
      console.log(JSON.stringify(replayedConference, null, 2));
    } catch (e: any) {
      Alert.alert('Conference not replayed', e.toString());
    }
  };

  const leave = async (leaveRoom: boolean) => {
    try {
      const conferenceLeaveOptions = {
        leaveRoom,
      };

      setLastConference(conference);
      await DolbyIoIAPI.conference.leave(conferenceLeaveOptions);
      setConference(undefined);
      if (leaveRoom) {
        setUser(undefined);
      }
    } catch (e: any) {
      Alert.alert('Conference not left', e);
    }
  };

  const contextValue = {
    user,
    conference,
    isInitialized,
    isRecordingConference,
    setIsRecordingConference,
    initialize,
    openSession,
    createAndJoin,
    join,
    replay,
    leave,
    updateConferenceParticipants,
  };

  return (
    <DolbyIOContext.Provider value={contextValue}>
      {children}
    </DolbyIOContext.Provider>
  );
};

export default DolbyIOProvider;
