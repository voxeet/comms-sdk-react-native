import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import DolbyIoIAPI from '@dolbyio/react-native-iapi-sdk';
// @ts-ignore
import { APP_ID, APP_SECRET } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { MessageReceivedEventType } from '../../../../src/services/command/events';
import type {
  ConferenceStatusUpdatedEventType,
  ParticipantChangedEventType,
  StreamChangedEventType,
} from '../../../../src/services/conference/events';
import type {
  ConferenceStatus,
  UnsubscribeFunction,
} from '../../../../src/services/conference/models';
import { Codec, RTCPMode } from '../../../../src/services/conference/models';
import type {
  Conference,
  Participant,
} from '../../../../src/services/conference/models';
import type { InvitationReceivedEventType } from '../../../../src/services/notification/events';
import type { User } from '../../../../src/services/session/models';

export interface IDolbyIOProvider {
  isInitialized?: Boolean;
  me?: User;
  conference?: Conference;
  conferenceStatus?: ConferenceStatus;
  participants: Participant[];
  activeParticipant?: Participant;
  initialize: () => void;
  openSession: (name: string, externalId?: string) => void;
  createAndJoin: (alias: string, liveRecording: boolean) => void;
  join: (alias: string) => void;
  replay: () => void;
  leave: (leaveRoom: boolean) => void;
}

export const DolbyIOContext = React.createContext<IDolbyIOProvider>({
  isInitialized: false,
  me: undefined,
  conference: undefined,
  conferenceStatus: undefined,
  participants: [],
  activeParticipant: undefined,
  initialize: () => {},
  openSession: () => {},
  createAndJoin: () => {},
  join: () => {},
  replay: () => {},
  leave: () => {},
});

const DolbyIOProvider: React.FC = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [me, setMe] = useState<User | undefined>(undefined);
  const [conference, setConference] = useState<Conference | undefined>(
    undefined
  );
  const [conferenceStatus, setConferenceStatus] = useState<
    ConferenceStatus | undefined
  >(undefined);
  const [participants, setParticipants] = useState<Map<string, Participant>>(
    new Map()
  );
  const [activeParticipantId, setActiveParticipantId] = useState<
    string | undefined
  >(undefined);

  const onConferenceStatusChange = (data: ConferenceStatusUpdatedEventType) => {
    console.log(
      'CONFERENCE STATUS CHANGE EVENT DATA: \n',
      JSON.stringify(data, null, 2)
    );
    setConferenceStatus(data.status);
  };

  const onParticipantsChange = (data: ParticipantChangedEventType) => {
    console.log(
      'PARTICIPANT CHANGE EVENT DATA: \n',
      JSON.stringify(data, null, 2)
    );
    setParticipants(
      new Map(participants.set(data.participant.id, data.participant))
    );
  };

  const onStreamsChange = (data: StreamChangedEventType) => {
    console.log('STREAMS CHANGE EVENT DATA: \n', JSON.stringify(data, null, 2));
    setParticipants((participants) => {
      let p = participants.get(data.participant.id);
      if (p) {
        p = { ...p };
        p.streams = data.participant.streams;
        return new Map(participants.set(p.id, p));
      }
      return participants;
    });
  };

  const onMessageReceived = (data: MessageReceivedEventType) => {
    console.log(
      'MESSAGE RECEIVED EVENT DATA: \n',
      JSON.stringify(data, null, 2)
    );
  };

  const onInvitationReceived = (data: InvitationReceivedEventType) => {
    console.log(
      'INVITATION RECEIVED EVENT DATA: \n',
      JSON.stringify(data, null, 2)
    );
  };

  const initialize = async () => {
    try {
      await DolbyIoIAPI.initialize(APP_ID, APP_SECRET);
      setIsInitialized(true);
    } catch (e: any) {
      setIsInitialized(false);
      Alert.alert('App not initialized', e);
    }
  };
  const openSession = async (name: string, externalId?: string) => {
    try {
      await DolbyIoIAPI.session.open({ name, externalId });
      setMe(await DolbyIoIAPI.session.getCurrentUser());
    } catch (e: any) {
      setMe(undefined);
      Alert.alert('Session not opened', e.toString());
    }
  };

  useEffect(() => {
    const unsubscribers: UnsubscribeFunction[] = [];
    unsubscribers.push(
      DolbyIoIAPI.conference.onStatusChange(onConferenceStatusChange)
    );

    unsubscribers.push(
      DolbyIoIAPI.conference.onParticipantsChange(onParticipantsChange)
    );
    unsubscribers.push(DolbyIoIAPI.conference.onStreamsChange(onStreamsChange));

    unsubscribers.push(
      DolbyIoIAPI.command.onMessageReceived(onMessageReceived)
    );

    unsubscribers.push(
      DolbyIoIAPI.notification.onInvitationReceived(onInvitationReceived)
    );
    return () => {
      unsubscribers.forEach((u) => u());
    };
  }, []);
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
      setConference(joinedConference);
      const participantsMap = new Map();
      joinedConference.participants.forEach((p) =>
        participantsMap.set(p.id, p)
      );
      setParticipants(participantsMap);
      setActiveParticipantId(joinedConference.participants[0].id);
      AsyncStorage.setItem(
        '@conference-previous',
        JSON.stringify(joinedConference)
      );
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
      setConference(joinedConference);
      const participantsMap = new Map();
      joinedConference.participants.forEach((p) =>
        participantsMap.set(p.id, p)
      );
      setParticipants(participantsMap);
      AsyncStorage.setItem(
        '@conference-previous',
        JSON.stringify(joinedConference)
      );
    } catch (e: any) {
      Alert.alert('Conference not joined', e.toString());
    }
  };
  const replay = async () => {
    try {
      const prevConferenceString = await AsyncStorage.getItem(
        '@conference-previous'
      );
      if (prevConferenceString) {
        const replayedConference = await DolbyIoIAPI.conference.replay(
          JSON.parse(prevConferenceString) as Conference
        );
        console.log(JSON.stringify(replayedConference, null, 2));
      }
    } catch (e: any) {
      Alert.alert('Conference not replayed', e.toString());
    }
  };
  const leave = async (leaveRoom: boolean) => {
    try {
      const conferenceLeaveOptions = {
        leaveRoom,
      };
      await DolbyIoIAPI.conference.leave(conferenceLeaveOptions);
      setConference(undefined);
      setParticipants(new Map());
      if (leaveRoom) {
        setMe(undefined);
      }
    } catch (e: any) {
      Alert.alert('Conference not left', e);
    }
  };

  const contextValue = {
    isInitialized,
    me,
    conference,
    conferenceStatus,
    participants: Array.from(participants.values()),
    activeParticipant: activeParticipantId
      ? participants.get(activeParticipantId)
      : undefined,
    initialize,
    openSession,
    createAndJoin,
    join,
    replay,
    leave,
  };

  return (
    <DolbyIOContext.Provider value={contextValue}>
      {children}
    </DolbyIOContext.Provider>
  );
};

export default DolbyIOProvider;
