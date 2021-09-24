import ConferenceService from '../ConferenceService';
import type { Conference } from '../models';
import {
  ConferenceStatus,
  ConferenceReplayOptions,
  ConferenceMixingOptions,
  ParticipantPermissions,
  ConferencePermission,
} from '../models';

/** Mocking function */

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
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
  RN.NativeModules.DolbyIoIAPIModule = {};

  return RN;
});

import { NativeModules } from 'react-native';
const { DolbyIoIAPIConferenceService } = NativeModules;

/** ConferenceService - "create" method test */

test('ConferenceService - "create" method test', () => {
  ConferenceService.create({});
  expect(DolbyIoIAPIConferenceService.create).toHaveBeenCalledWith({});
});

/** ConferenceService - "fetch" method test */

test('ConferenceService - "fetch" method test', () => {
  ConferenceService.fetch();
  expect(DolbyIoIAPIConferenceService.fetch).toHaveBeenCalled();
});

/** ConferenceService - "current" method test */

test('ConferenceService - "current" method test', () => {
  ConferenceService.current();
  expect(DolbyIoIAPIConferenceService.current).toHaveBeenCalled();
});

/** ConferenceService - "replay" method test */

const mockConference: Conference = {
  participants: [{ participantId: '123' }],
  status: ConferenceStatus.DEFAULT,
};

const mockConferenceReplayOptions: ConferenceReplayOptions = {
  offset: 1,
};

const mockConferenceMixingOptions: ConferenceMixingOptions = {
  enabled: true,
};

test('ConferenceService - "replay" method test', () => {
  ConferenceService.replay(
    mockConference,
    mockConferenceReplayOptions,
    mockConferenceMixingOptions
  );
  expect(DolbyIoIAPIConferenceService.replay).toHaveBeenCalledWith(
    mockConference,
    mockConferenceReplayOptions,
    mockConferenceMixingOptions
  );
});

/** ConferenceService - "getAudioLevel" method test */

test('ConferenceService - "getAudioLevel" method test', () => {
  ConferenceService.getAudioLevel();
  expect(DolbyIoIAPIConferenceService.getAudioLevel).toHaveBeenCalled();
});

/** ConferenceService - "getAudioProcessing" method test */

test('ConferenceService - "getAudioProcessing" method test', () => {
  ConferenceService.getAudioProcessing();
  expect(DolbyIoIAPIConferenceService.getAudioProcessing).toHaveBeenCalled();
});

/** ConferenceService - "getLocalStats" method test */

test('ConferenceService - "getLocalStats" method test', () => {
  ConferenceService.getLocalStats();
  expect(DolbyIoIAPIConferenceService.getLocalStats).toHaveBeenCalled();
});

/** ConferenceService - "getMaxVideoForwarding" method test */

test('ConferenceService - "getMaxVideoForwarding" method test', () => {
  ConferenceService.getMaxVideoForwarding();
  expect(DolbyIoIAPIConferenceService.getMaxVideoForwarding).toHaveBeenCalled();
});

/** ConferenceService - "getParticipant" method test */

test('ConferenceService - "getParticipant" method test', () => {
  ConferenceService.getParticipant();
  expect(DolbyIoIAPIConferenceService.getParticipant).toHaveBeenCalled();
});

/** ConferenceService - "getParticipants" method test */

test('ConferenceService - "getParticipants" method test', () => {
  ConferenceService.getParticipants();
  expect(DolbyIoIAPIConferenceService.getParticipants).toHaveBeenCalled();
});

/** ConferenceService - "getStatus" method test */

test('ConferenceService - "getStatus" method test', () => {
  ConferenceService.getStatus();
  expect(DolbyIoIAPIConferenceService.getStatus).toHaveBeenCalled();
});

/** ConferenceService - "isOutputMuted" method test */

test('ConferenceService - "isOutputMuted" method test', () => {
  ConferenceService.isOutputMuted();
  expect(DolbyIoIAPIConferenceService.isOutputMuted).toHaveBeenCalled();
});

/** ConferenceService - "isMuted" method test */

test('ConferenceService - "isMuted" method test', () => {
  ConferenceService.isMuted();
  expect(DolbyIoIAPIConferenceService.isMuted).toHaveBeenCalled();
});

/** ConferenceService - "isSpeaking" method test */

test('ConferenceService - "isSpeaking" method test', () => {
  ConferenceService.isSpeaking();
  expect(DolbyIoIAPIConferenceService.isSpeaking).toHaveBeenCalled();
});

/** ConferenceService - "setAudioProcessing" method test */

test('ConferenceService - "setAudioProcessing" method test', () => {
  ConferenceService.setAudioProcessing({});
  expect(DolbyIoIAPIConferenceService.setAudioProcessing).toHaveBeenCalledWith(
    {}
  );
});

/** ConferenceService - "setMaxVideoForwarding" method test */

test('ConferenceService - "setMaxVideoForwarding" method test', () => {
  ConferenceService.setMaxVideoForwarding();
  expect(DolbyIoIAPIConferenceService.setMaxVideoForwarding).toHaveBeenCalled();
});

/** ConferenceService - "mute" method test */

test('ConferenceService - "mute" method test', () => {
  ConferenceService.mute(true, {
    participantId: '123',
  });
  expect(DolbyIoIAPIConferenceService.mute).toHaveBeenCalledWith(true, {
    participantId: '123',
  });
});

/** ConferenceService - "updatePermissions" method test */

const mockParticipantPermissions: ParticipantPermissions = {
  participant: { participantId: '123' },
  permissions: [
    ConferencePermission.INVITE,
    ConferencePermission.JOIN,
    ConferencePermission.RECORD,
  ],
};

test('ConferenceService - "updatePermissions" method test', () => {
  ConferenceService.updatePermissions([mockParticipantPermissions]);
  expect(DolbyIoIAPIConferenceService.updatePermissions).toHaveBeenCalledWith([
    mockParticipantPermissions,
  ]);
});

/** ConferenceService - "startAudio" method test */

test('ConferenceService - "startAudio" method test', () => {
  ConferenceService.startAudio();
  expect(DolbyIoIAPIConferenceService.startAudio).toHaveBeenCalled();
});

/** ConferenceService - "startVideo" method test */

test('ConferenceService - "startVideo" method test', () => {
  ConferenceService.startVideo();
  expect(DolbyIoIAPIConferenceService.startVideo).toHaveBeenCalled();
});

/** ConferenceService - "stopAudio" method test */

test('ConferenceService - "stopAudio" method test', () => {
  ConferenceService.stopAudio();
  expect(DolbyIoIAPIConferenceService.stopAudio).toHaveBeenCalled();
});

/** ConferenceService - "stopVideo" method test */

test('ConferenceService - "stopVideo" method test', () => {
  ConferenceService.stopVideo();
  expect(DolbyIoIAPIConferenceService.stopVideo).toHaveBeenCalled();
});

/** ConferenceService - "join" method test */

const mockConference_2: Conference = {
  participants: [{ participantId: '123' }],
  status: ConferenceStatus.DEFAULT,
};

test('ConferenceService - "join" method test', () => {
  ConferenceService.join(mockConference_2, {});
  expect(DolbyIoIAPIConferenceService.join).toHaveBeenCalledWith(
    mockConference_2,
    {}
  );
});

/** ConferenceService - "kick" method test */

test('ConferenceService - "kick" method test', () => {
  ConferenceService.kick({ participantId: '123' });
  expect(DolbyIoIAPIConferenceService.kick).toHaveBeenCalledWith({
    participantId: '123',
  });
});

/** ConferenceService - "leave" method test */

test('ConferenceService - "leave" method test', () => {
  ConferenceService.leave();
  expect(DolbyIoIAPIConferenceService.leave).toHaveBeenCalled();
});
