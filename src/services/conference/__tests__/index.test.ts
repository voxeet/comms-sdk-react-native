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

/** ConferenceService tests */

describe('ConferenceService', () => {
  /** "create" method */

  test('"create" method', () => {
    ConferenceService.create({});
    expect(DolbyIoIAPIConferenceService.create).toHaveBeenCalledWith({});
  });

  /** "fetch" method */

  test('"fetch" method', () => {
    ConferenceService.fetch();
    expect(DolbyIoIAPIConferenceService.fetch).toHaveBeenCalled();
  });

  /** "current" method */

  test('"current" method', () => {
    ConferenceService.current();
    expect(DolbyIoIAPIConferenceService.current).toHaveBeenCalled();
  });

  /** "replay" method */

  const mockConference: Conference = {
    participants: [{ id: '123' }],
    status: ConferenceStatus.DEFAULT,
  };

  const mockConferenceReplayOptions: ConferenceReplayOptions = {
    offset: 1,
  };

  const mockConferenceMixingOptions: ConferenceMixingOptions = {
    enabled: true,
  };

  test('"replay" method', () => {
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

  /** "getAudioLevel" method */

  test('"getAudioLevel" method', () => {
    ConferenceService.getAudioLevel();
    expect(DolbyIoIAPIConferenceService.getAudioLevel).toHaveBeenCalled();
  });

  /** "getAudioProcessing" method */

  test('"getAudioProcessing" method', () => {
    ConferenceService.getAudioProcessing();
    expect(DolbyIoIAPIConferenceService.getAudioProcessing).toHaveBeenCalled();
  });

  /** "getLocalStats" method */

  test('"getLocalStats" method', () => {
    ConferenceService.getLocalStats();
    expect(DolbyIoIAPIConferenceService.getLocalStats).toHaveBeenCalled();
  });

  /** "getMaxVideoForwarding" method */

  test('"getMaxVideoForwarding" method', () => {
    ConferenceService.getMaxVideoForwarding();
    expect(
      DolbyIoIAPIConferenceService.getMaxVideoForwarding
    ).toHaveBeenCalled();
  });

  /** "getParticipant" method */

  test('"getParticipant" method', () => {
    ConferenceService.getParticipant();
    expect(DolbyIoIAPIConferenceService.getParticipant).toHaveBeenCalled();
  });

  /** "getParticipants" method */

  test('"getParticipants" method', () => {
    ConferenceService.getParticipants();
    expect(DolbyIoIAPIConferenceService.getParticipants).toHaveBeenCalled();
  });

  /** "getStatus" method */

  test('"getStatus" method', () => {
    ConferenceService.getStatus();
    expect(DolbyIoIAPIConferenceService.getStatus).toHaveBeenCalled();
  });

  /** "isOutputMuted" method */

  test('"isOutputMuted" method', () => {
    ConferenceService.isOutputMuted();
    expect(DolbyIoIAPIConferenceService.isOutputMuted).toHaveBeenCalled();
  });

  /** "isMuted" method */

  test('"isMuted" method', () => {
    ConferenceService.isMuted();
    expect(DolbyIoIAPIConferenceService.isMuted).toHaveBeenCalled();
  });

  /** "isSpeaking" method */

  test('"isSpeaking" method', () => {
    ConferenceService.isSpeaking();
    expect(DolbyIoIAPIConferenceService.isSpeaking).toHaveBeenCalled();
  });

  /** "setAudioProcessing" method */

  test('"setAudioProcessing" method', () => {
    ConferenceService.setAudioProcessing({});
    expect(
      DolbyIoIAPIConferenceService.setAudioProcessing
    ).toHaveBeenCalledWith({});
  });

  /** "setMaxVideoForwarding" method */

  test('"setMaxVideoForwarding" method', () => {
    ConferenceService.setMaxVideoForwarding();
    expect(
      DolbyIoIAPIConferenceService.setMaxVideoForwarding
    ).toHaveBeenCalled();
  });

  /** "mute" method */

  test('"mute" method', () => {
    ConferenceService.mute(true, {
      id: '123',
    });
    expect(DolbyIoIAPIConferenceService.mute).toHaveBeenCalledWith(true, {
      id: '123',
    });
  });

  /** "updatePermissions" method */

  const mockParticipantPermissions: ParticipantPermissions = {
    participant: { id: '123' },
    permissions: [
      ConferencePermission.INVITE,
      ConferencePermission.JOIN,
      ConferencePermission.RECORD,
    ],
  };

  test('"updatePermissions" method', () => {
    ConferenceService.updatePermissions([mockParticipantPermissions]);
    expect(DolbyIoIAPIConferenceService.updatePermissions).toHaveBeenCalledWith(
      [mockParticipantPermissions]
    );
  });

  /** "startAudio" method */

  test('"startAudio" method', () => {
    ConferenceService.startAudio();
    expect(DolbyIoIAPIConferenceService.startAudio).toHaveBeenCalled();
  });

  /** "startVideo" method */

  test('"startVideo" method', () => {
    ConferenceService.startVideo();
    expect(DolbyIoIAPIConferenceService.startVideo).toHaveBeenCalled();
  });

  /** "stopAudio" method */

  test('"stopAudio" method', () => {
    ConferenceService.stopAudio();
    expect(DolbyIoIAPIConferenceService.stopAudio).toHaveBeenCalled();
  });

  /** "stopVideo" method */

  test('"stopVideo" method', () => {
    ConferenceService.stopVideo();
    expect(DolbyIoIAPIConferenceService.stopVideo).toHaveBeenCalled();
  });

  /** "join" method */

  const mockConference_2: Conference = {
    participants: [{ id: '123' }],
    status: ConferenceStatus.DEFAULT,
  };

  test('"join" method', () => {
    ConferenceService.join(mockConference_2, {});
    expect(DolbyIoIAPIConferenceService.join).toHaveBeenCalledWith(
      mockConference_2,
      {}
    );
  });

  /** "kick" method */

  test('"kick" method', () => {
    ConferenceService.kick({ id: '123' });
    expect(DolbyIoIAPIConferenceService.kick).toHaveBeenCalledWith({
      id: '123',
    });
  });

  /** "leave" method */

  test('"leave" method', () => {
    ConferenceService.leave();
    expect(DolbyIoIAPIConferenceService.leave).toHaveBeenCalled();
  });

  // TODO "onStatusChange" method
  // TODO "onPermissionsChange" method
  // TODO "onParticipantsChange" method
  // TODO "onStreamsChange" method
});
