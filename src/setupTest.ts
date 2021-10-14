/* eslint-disable no-undef */

jest.mock('react-native', () => {
  const RN: any = jest.requireActual('react-native');
  RN.NativeModules.DolbyIoIAPIModule = {
    initialize: jest.fn(),
    initializeToken: jest.fn(),
    onAccessTokenOk: jest.fn(),
    onAccessTokenKo: jest.fn(),
    addListener: jest.fn(),
    removeListeners: jest.fn(),
  };
  RN.NativeModules.DolbyIoIAPIConferenceService = {
    create: jest.fn(),
    fetch: jest.fn(),
    current: jest.fn(),
    replay: jest.fn(),
    getAudioLevel: jest.fn(),
    getAudioProcessing: jest.fn(),
    getLocalStats: jest.fn(),
    getMaxVideoForwarding: jest.fn(),
    getParticipant: jest.fn(),
    getParticipants: jest.fn(),
    getStatus: jest.fn(),
    isOutputMuted: jest.fn(),
    isMuted: jest.fn(),
    isSpeaking: jest.fn(),
    setAudioProcessing: jest.fn(),
    setMaxVideoForwarding: jest.fn(),
    mute: jest.fn(),
    updatePermissions: jest.fn(),
    startAudio: jest.fn(),
    startVideo: jest.fn(),
    stopAudio: jest.fn(),
    stopVideo: jest.fn(),
    join: jest.fn(),
    kick: jest.fn(),
    leave: jest.fn(),
  };
  RN.NativeModules.DolbyIoIAPISessionServiceModule = {
    open: jest.fn(),
    close: jest.fn(),
    getParticipant: jest.fn(),
  };
  RN.NativeModules.DolbyIoIAPINotificationService = {
    invite: jest.fn(),
    decline: jest.fn(),
  };
  RN.NativeModules.DolbyIoIAPIRecordingServiceModule = {
    current: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
  };
  RN.NativeModules.DolbyIoIAPICommandServiceModule = {
    send: jest.fn(),
  };
  RN.NativeModules.DolbyIoIAPIFilePresentationService = {
    stop: jest.fn(),
    start: jest.fn(),
    getThumbnail: jest.fn(),
    setPage: jest.fn(),
  };
  return RN;
});
