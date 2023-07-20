import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import CommsAPI from '@dolbyio/comms-sdk-react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import type { 
  Participant, 
  Conference, 
  ConferenceStatus,
  MessageReceivedEventType, 
  RecordingStatusUpdatedEventType,
  ConferenceStatusUpdatedEventType,
  ParticipantChangedEventType,
  StreamChangedEventType,
  PermissionsUpdatedEventType,
  UnsubscribeFunction,
} from '@dolbyio/comms-sdk-react-native/models';
import { 
  Codec, 
  RTCPMode, 
  SpatialAudioStyle,
  SubscriptionType
} from '@dolbyio/comms-sdk-react-native/models';

import { Platform, PermissionsAndroid } from 'react-native';
import Logger from '@utils/Logger/Logger';

export interface IDolbyIOProvider {
  isInitialized?: Boolean;
  isAudioPreviewScreen: Boolean;
  me?: Participant;
  conference?: Conference;
  conferenceStatus?: ConferenceStatus;
  participants: Participant[];
  initialize: (token: string, refreshToken: () => Promise<string>) => void;
  openSession: (name: string, externalId?: string) => void;
  isOpen: () => Promise<boolean>;
  createAndJoin: (alias: string, liveRecording: boolean, spatialAudioStyle: SpatialAudioStyle) => void;
  listen: (alias: string) => void;
  joinWithId: (conferenceId: string) => void;
  replay: () => void;
  getCurrentConference: () => void;
  goToAudioPreviewScreen: (isVisible: boolean) => void;
  leave: (leaveRoom: boolean) => void;
}

export const DolbyIOContext = React.createContext<IDolbyIOProvider>({
  isInitialized: false,
  me: undefined,
  conference: undefined,
  conferenceStatus: undefined,
  isAudioPreviewScreen: false,
  participants: [],
  initialize: () => {},
  openSession: () => {},
  isOpen: () => { return Promise.resolve(false); },
  createAndJoin: () => {},
  listen: () => {},
  joinWithId: () => {},
  replay: () => {},
  leave: () => {},
  getCurrentConference: () => {},
  goToAudioPreviewScreen: () => {},
});

type DolbyProps = {
  children: React.ReactNode
};

const DolbyIOProvider: React.FC<DolbyProps> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [me, setMe] = useState<Participant | undefined>(undefined);
  const [isAudioPreviewScreen, setIsAudioPreviewScreen] = useState(false);
  const [conference, setConference] = useState<Conference | undefined>(
    undefined
  );
  const [conferenceStatus, setConferenceStatus] = useState<
    ConferenceStatus | undefined
  >(undefined);
  const [participants, setParticipants] = useState<Map<string, Participant>>(
    new Map()
  );

  const onConferenceStatusChange = (data: ConferenceStatusUpdatedEventType) => {
    Logger.log(
      'CONFERENCE STATUS CHANGE EVENT DATA:',
      JSON.stringify(data, null, 2)
    );
    setConferenceStatus(data.status);
  };

  const onParticipantsChange = (data: ParticipantChangedEventType) => {
    Logger.log(
      'PARTICIPANT CHANGE EVENT DATA: \n',
      JSON.stringify(data, null, 2)
    );
    setParticipants(
      (participants) =>
        new Map(participants.set(data.participant.id, data.participant))
    );
  };

  const onRecordingStatusChange = (data: RecordingStatusUpdatedEventType) => {
    Logger.log(
      'RECORDING STATUS CHANGED EVENT: \n',
      JSON.stringify(data, null, 2)
    );
  };

  const onStreamsChange = (data: StreamChangedEventType) => {
    Logger.log('STREAMS CHANGE EVENT DATA: \n', JSON.stringify(data, null, 2));
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

  const onPermissionsChange = (data: PermissionsUpdatedEventType) => {
    Logger.log(
      'PERMISSIONS UPDATED EVENT DATA: \n',
      JSON.stringify(data, null, 2)
    );
  };

  const onMessageReceived = (data: MessageReceivedEventType) => {
    Logger.log(
      'MESSAGE RECEIVED EVENT DATA: \n',
      JSON.stringify(data, null, 2)
    );
  };

  const initialize = async (
    token: string,
    refreshToken: () => Promise<string>
  ) => {
    try {
      await CommsAPI.initializeToken(token, refreshToken);
      setIsInitialized(true);
    } catch (e: any) {
      setIsInitialized(false);
      Alert.alert('App not initialized', e);
    }
  };

  const isOpen = async () => {
    return await CommsAPI.session.isOpen();
  }

  const openSession = async (name: string, externalId?: string) => {
    const timeoutPromise = setTimeout(() => {
      CommsAPI.session.close();
    }, 5000);
    try {
      await CommsAPI.session.open({ name, externalId });
      clearTimeout(timeoutPromise);
      setMe(await CommsAPI.session.getParticipant());
    } catch (e: any) {
      clearTimeout(timeoutPromise);
      setMe(undefined);
      Alert.alert('Session not opened', e.toString());
    }
  };

  useEffect(() => {
    const unsubscribers: UnsubscribeFunction[] = [
      CommsAPI.conference.onStatusChange(onConferenceStatusChange),
      CommsAPI.conference.onParticipantsChange(onParticipantsChange),
      CommsAPI.conference.onStreamsChange(onStreamsChange),
      CommsAPI.conference.onPermissionsChange(onPermissionsChange),
      CommsAPI.command.onMessageReceived(onMessageReceived),
      CommsAPI.recording.onRecordingStatusUpdated(onRecordingStatusChange),
    ];
    return () => {
      unsubscribers.forEach((u) => u());
    };
  }, []);
  const createAndJoin = async (alias: string, liveRecording: boolean, spatialAudioStyle: SpatialAudioStyle) => {
    try {
      await checkPermissions();
      const conferenceParams = {
        liveRecording: liveRecording,
        rtcpMode: RTCPMode.AVERAGE,
        ttl: 0,
        dolbyVoice: true,
        spatialAudioStyle: spatialAudioStyle,
      };
      const conferenceOptions = {
        alias,
        params: conferenceParams,
      };

      await CommsAPI.notification.subscribe(
        [
          SubscriptionType.ActiveParticipants,
          SubscriptionType.ConferenceCreated,
          SubscriptionType.ConferenceEnded,
          SubscriptionType.InvitationReceived,
          SubscriptionType.ParticipantJoined,
          SubscriptionType.ParticipantLeft
        ].map( (s) => { return { type: s, conferenceAlias: alias } })
      );

      const createdConference = await CommsAPI.conference.create(
        conferenceOptions
      );

      const joinOptions = {
        constraints: {
          audio: true,
          video: false,
        },
        maxVideoForwarding: 4,
        simulcast: false,
        spatialAudio: true,
      };
      const joinedConference = await CommsAPI.conference.join(
        createdConference,
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

  const listen = async (alias: string) => {
    try {
      const conferenceParams = {
        rtcpMode: RTCPMode.AVERAGE,
        ttl: 0,
        videoCodec: Codec.H264,
        dolbyVoice: true
      };
      const conferenceOptions = {
        alias,
        params: conferenceParams,
      };

      const createdConference = await CommsAPI.conference.create(
        conferenceOptions
      );

      const listenOptions = {
        maxVideoForwarding: 4,
        spatialAudio: false,
      };
      const joinedConference = await CommsAPI.conference.listen(
        createdConference,
        listenOptions
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

  const joinWithId = async (conferenceId: string) => {
    try {
      const fetchedConference = await CommsAPI.conference.fetch(conferenceId);
      const joinedConference = await CommsAPI.conference.join(
        fetchedConference
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
        const replayedConference = await CommsAPI.conference.replay(
          JSON.parse(prevConferenceString) as Conference
        );
        Logger.log(JSON.stringify(replayedConference, null, 2));
      }
    } catch (e: any) {
      Alert.alert('Conference not replayed', e.toString());
    }
  };

  const leaveActions = () => {
    setConference(undefined);
    setParticipants(new Map());
  };

  const leave = async (leaveRoom: boolean) => {
    try {
      const conferenceLeaveOptions = {
        leaveRoom,
      };
      await CommsAPI.conference.leave(conferenceLeaveOptions);
      leaveActions();
      if (leaveRoom) {
        setMe(undefined);
      }

      CommsAPI.notification.unsubscribe(
        [
          SubscriptionType.ActiveParticipants,
          SubscriptionType.ConferenceCreated,
          SubscriptionType.ConferenceEnded,
          SubscriptionType.InvitationReceived,
          SubscriptionType.ParticipantJoined,
          SubscriptionType.ParticipantLeft
        ].map( (s) => { return { type: s, conferenceAlias: conference?.alias ?? "" } })
      );
    } catch (e: any) {
      Alert.alert('Conference leave with errors', e);
      leaveActions();
    }
  };

  const checkPermissions = async () => {
    if (Platform.OS == "ios") {
      return;
    }
    try {
        const cameraGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "Camera Permission",
                message:"This App needs access to your camera",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );

        if (cameraGranted === PermissionsAndroid.RESULTS.GRANTED) {
            Logger.log("You can use the camera");
        } else {
            Logger.log("Camera permission denied");
        }

        const micGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                title: "Microphone Permission",
                message: "This App needs access to your microphone so you can talk to people.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );

        if (micGranted === PermissionsAndroid.RESULTS.GRANTED) {
            Logger.log("You can use the microphone");
        } else {
            Logger.log("Camera permission denied");
        }
        Logger.log(`get bluetooth permision: ${PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT}`);
        const bluetoothConnectGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          {
              title: "Bluetooth connect",
              message: "This App neeed access for bluetooth and bluetooth connect permission is required since Android 33 API.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
          }
      );

      if (bluetoothConnectGranted === PermissionsAndroid.RESULTS.GRANTED) {
          Logger.log("You can use the blueetooth");
      } else {
          Logger.log("Bluetooth connect permission denied");
      }
    } catch (error) {
        console.warn(error);
    }
  }

  const getCurrentConference = async () => {
    try {
      let conference = await CommsAPI.conference.current();
      if (conference != null) {
        Alert.alert("Current confrence is: ", JSON.stringify(conference));
      } else {
        Alert.alert("Current conference is null");
      }
    } catch (e: any) {
      Alert.alert('Getting conference errors: ', e);
    }
  }

  const goToAudioPreviewScreen = (isVisible: boolean) => {
    setIsAudioPreviewScreen(isVisible);
  }

  const contextValue = {
    isInitialized,
    isAudioPreviewScreen,
    me,
    conference,
    conferenceStatus,
    participants: Array.from(participants.values()),
    initialize,
    openSession,
    isOpen,
    createAndJoin,
    listen,
    joinWithId,
    replay,
    leave,
    getCurrentConference,
    goToAudioPreviewScreen,
  };

  return (
    <DolbyIOContext.Provider value={contextValue}>
      {children}
    </DolbyIOContext.Provider>
  );
};

export default DolbyIOProvider;
