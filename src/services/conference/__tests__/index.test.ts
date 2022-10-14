import { NativeModules } from 'react-native';

import ConferenceService from '../ConferenceService';
import { ConferenceServiceEventNames } from '../events';
import { Conference, SpatialAudioStyle } from '../models';
import {
  ConferencePermission,
  ConferenceReplayOptions,
  ConferenceStatus,
  ParticipantPermissions,
  Participant,
  SpatialDirection,
  SpatialScale,
  SpatialPosition,
} from '../models';
import { transformToConference, transformToParticipant } from '../transformers';

const { CommsAPIConferenceServiceModule } = NativeModules;

const testParticipant: Participant = {
  id: '123',
  info: {
    name: 'John Doe',
  },
};

const testConference: Conference = {
  participants: [{ id: '123', info: { name: 'John Doe' } }],
  status: ConferenceStatus.DEFAULT,
};

const testConferenceReplayOptions: ConferenceReplayOptions = {
  offset: 1,
};

const testParticipantPermissions: ParticipantPermissions = {
  participant: {
    id: '123',
    info: {
      name: 'John Doe',
    },
  },
  permissions: [
    ConferencePermission.INVITE,
    ConferencePermission.JOIN,
    ConferencePermission.RECORD,
  ],
};

const testSpatialDirection: SpatialDirection = {
  x: 1,
  y: 2,
  z: 3,
};

const testSpatialScale: SpatialScale = {
  x: 1,
  y: 2,
  z: 3,
};

const testSpatialPosition: SpatialPosition = {
  x: 1,
  y: 2,
  z: 3,
};

describe('ConferenceService', () => {
  const removeListenerMock = jest.fn();
  ConferenceService._nativeEvents.addListener = jest
    .fn()
    .mockReturnValue(removeListenerMock);
  describe('create()', () => {
    it('should invoke exported create method with correct arguments', () => {
      const options = {
        alias: 'Example conference',
      };
      ConferenceService.create(options);
      expect(CommsAPIConferenceServiceModule.create).toHaveBeenCalledWith(
        options
      );
    });

    it('should invoke exported create method with empty object when invoked parameterless', () => {
      ConferenceService.create();
      expect(CommsAPIConferenceServiceModule.create).toHaveBeenLastCalledWith(
        {}
      );
    });
  });

  describe('fetch()', () => {
    it('should invoke exported fetch method', () => {
      ConferenceService.fetch();
      expect(CommsAPIConferenceServiceModule.fetch).toHaveBeenCalled();
    });
  });

  describe('current()', () => {
    it('should invoke exported current method', () => {
      ConferenceService.current();
      expect(CommsAPIConferenceServiceModule.current).toHaveBeenCalled();
    });
  });

  describe('replay()', () => {
    it('should invoke exported replay method with correct arguments', () => {
      ConferenceService.replay(testConference, testConferenceReplayOptions);
      expect(CommsAPIConferenceServiceModule.replay).toHaveBeenCalledWith(
        testConference,
        testConferenceReplayOptions
      );
    });

    it('without replay options should invoke exported replay method with replay offset param set to 0', () => {
      ConferenceService.replay(testConference, undefined);
      expect(CommsAPIConferenceServiceModule.replay).toHaveBeenCalledWith(
        testConference,
        {
          offset: 0,
        }
      );
    });
  });

  describe('getAudioLevel()', () => {
    it('should invoke exported getAudioLevel method with correct arguments', () => {
      ConferenceService.getAudioLevel(testParticipant);
      expect(
        CommsAPIConferenceServiceModule.getAudioLevel
      ).toHaveBeenCalledWith(testParticipant);
    });
  });

  describe('getLocalStats()', () => {
    it('should invoke exported getLocalStats method', () => {
      ConferenceService.getLocalStats();
      expect(CommsAPIConferenceServiceModule.getLocalStats).toHaveBeenCalled();
    });
  });

  describe('getMaxVideoForwarding()', () => {
    it('should invoke exported getMaxVideoForwarding method', () => {
      ConferenceService.getMaxVideoForwarding();
      expect(
        CommsAPIConferenceServiceModule.getMaxVideoForwarding
      ).toHaveBeenCalled();
    });
  });

  describe('getParticipant()', () => {
    it('should invoke exported getParticipant method', () => {
      ConferenceService.getParticipant('123');
      expect(CommsAPIConferenceServiceModule.getParticipant).toHaveBeenCalled();
    });
  });

  describe('getParticipants()', () => {
    it('should invoke exported getParticipants method with correct arguments', () => {
      ConferenceService.getParticipants(testConference);
      expect(
        CommsAPIConferenceServiceModule.getParticipants
      ).toHaveBeenCalledWith(testConference);
    });
  });

  describe('getStatus()', () => {
    it('should invoke exported getStatus method with correct arguments', () => {
      ConferenceService.getStatus(testConference);
      expect(CommsAPIConferenceServiceModule.getStatus).toHaveBeenCalledWith(
        testConference
      );
    });
  });

  describe('isMuted()', () => {
    it('should invoke exported isMuted method', () => {
      ConferenceService.isMuted();
      expect(CommsAPIConferenceServiceModule.isMuted).toHaveBeenCalled();
    });
  });

  describe('isSpeaking()', () => {
    it('should invoke exported isSpeaking method with correct arguments', () => {
      ConferenceService.isSpeaking(testParticipant);
      expect(CommsAPIConferenceServiceModule.isSpeaking).toHaveBeenCalledWith(
        testParticipant
      );
    });
  });

  describe('setAudioProcessing()', () => {
    it('should invoke exported setAudioProcessing method with correct arguments', () => {
      ConferenceService.setAudioProcessing({});
      expect(
        CommsAPIConferenceServiceModule.setAudioProcessing
      ).toHaveBeenCalledWith({});
    });

    it('should invoke exported setAudioProcessing method with empty object when invoked parameterless', () => {
      ConferenceService.setAudioProcessing();
      expect(
        CommsAPIConferenceServiceModule.setAudioProcessing
      ).toHaveBeenCalledWith({});
    });
  });

  describe('setMaxVideoForwarding()', () => {
    it('should invoke exported setMaxVideoForwarding method with correct arguments', () => {
      ConferenceService.setMaxVideoForwarding(2, []);
      expect(
        CommsAPIConferenceServiceModule.setMaxVideoForwarding
      ).toHaveBeenCalledWith(2, []);
    });

    it('should invoke exported setMaxVideoForwarding method with 4 int when parameterless', () => {
      ConferenceService.setMaxVideoForwarding();
      expect(
        CommsAPIConferenceServiceModule.setMaxVideoForwarding
      ).toHaveBeenCalledWith(4, []);
    });
  });

  describe('mute()', () => {
    it('should invoke exported mute method with correct arguments', () => {
      ConferenceService.mute(testParticipant, true);
      expect(CommsAPIConferenceServiceModule.mute).toHaveBeenCalledWith(
        testParticipant,
        true
      );
    });
  });

  describe('updatePermissions()', () => {
    it('should invoke exported updatePermissions method with correct arguments', () => {
      ConferenceService.updatePermissions([testParticipantPermissions]);
      expect(
        CommsAPIConferenceServiceModule.updatePermissions
      ).toHaveBeenCalledWith([testParticipantPermissions]);
    });
  });

  describe('startAudio()', () => {
    it('should invoke exported startAudio method with correct arguments', () => {
      ConferenceService.startAudio(testParticipant);
      expect(CommsAPIConferenceServiceModule.startAudio).toHaveBeenCalledWith(
        testParticipant
      );
    });
  });

  describe('startVideo()', () => {
    it('should invoke exported startVideo method with correct arguments', () => {
      ConferenceService.startVideo(testParticipant);
      expect(CommsAPIConferenceServiceModule.startVideo).toHaveBeenCalledWith(
        testParticipant
      );
    });
  });

  describe('stopAudio()', () => {
    it('should invoke exported stopAudio method with correct arguments', () => {
      ConferenceService.stopAudio(testParticipant);
      expect(CommsAPIConferenceServiceModule.stopAudio).toHaveBeenCalledWith(
        testParticipant
      );
    });
  });

  describe('stopVideo()', () => {
    it('should invoke exported stopVideo method with correct arguments', () => {
      ConferenceService.stopVideo(testParticipant);
      expect(CommsAPIConferenceServiceModule.stopVideo).toHaveBeenCalledWith(
        testParticipant
      );
    });
  });

  describe('join()', () => {
    it('should invoke exported join method with correct arguments', () => {
      ConferenceService.join(testConference, {});
      expect(CommsAPIConferenceServiceModule.join).toHaveBeenCalledWith(
        testConference,
        {}
      );
    });
  });

  describe('listen()', () => {
    it('should invoke exported listen method with correct arguments', () => {
      ConferenceService.listen(testConference, {});
      expect(CommsAPIConferenceServiceModule.join).toHaveBeenCalledWith(
        testConference,
        {}
      );
    });
  });

  describe('kick()', () => {
    it('should invoke exported kick method with correct arguments', () => {
      ConferenceService.kick(testParticipant);
      expect(CommsAPIConferenceServiceModule.kick).toHaveBeenCalledWith(
        testParticipant
      );
    });
  });

  describe('leave()', () => {
    it('should invoke exported leave method', () => {
      ConferenceService.leave();
      expect(CommsAPIConferenceServiceModule.leave).toHaveBeenCalled();
    });
  });

  describe('onStatusChange()', () => {
    const handlerFn = () => {};
    it('should invoke NativeEvents.addListener with StatusUpdated event', () => {
      const unsubscribeFn = ConferenceService.onStatusChange(handlerFn);
      expect(ConferenceService._nativeEvents.addListener).toHaveBeenCalledWith(
        ConferenceServiceEventNames.StatusUpdated,
        handlerFn
      );
      unsubscribeFn();
      expect(removeListenerMock).toHaveBeenCalled();
    });
  });

  describe('onPermissionsChange()', () => {
    const handlerFn = () => {};
    it('should invoke NativeEvents.addListener with PermissionsUpdated event', () => {
      const unsubscribeFn = ConferenceService.onPermissionsChange(handlerFn);
      expect(ConferenceService._nativeEvents.addListener).toHaveBeenCalledWith(
        ConferenceServiceEventNames.PermissionsUpdated,
        handlerFn
      );
      unsubscribeFn();
      expect(removeListenerMock).toHaveBeenCalled();
    });
  });

  describe('onParticipantsChange()', () => {
    const handlerFn = () => {};
    it('should invoke NativeEvents.addListener with ParticipantAdded event', () => {
      const unsubscribeFn = ConferenceService.onParticipantsChange(handlerFn);
      expect(ConferenceService._nativeEvents.addListener).toHaveBeenCalledWith(
        ConferenceServiceEventNames.ParticipantAdded,
        handlerFn
      );
      unsubscribeFn();
      expect(removeListenerMock).toHaveBeenCalled();
    });

    it('should invoke NativeEvents.addListener with ParticipantUpdated event', () => {
      const unsubscribeFn = ConferenceService.onParticipantsChange(handlerFn);
      expect(ConferenceService._nativeEvents.addListener).toHaveBeenCalledWith(
        ConferenceServiceEventNames.ParticipantUpdated,
        handlerFn
      );
      unsubscribeFn();
      expect(removeListenerMock).toHaveBeenCalled();
    });
  });

  describe('onStreamsChange()', () => {
    const handlerFn = () => {};
    it('should invoke NativeEvents.addListener with StreamAdded event', () => {
      const unsubscribeFn = ConferenceService.onStreamsChange(handlerFn);
      expect(ConferenceService._nativeEvents.addListener).toHaveBeenCalledWith(
        ConferenceServiceEventNames.StreamAdded,
        handlerFn
      );
      unsubscribeFn();
      expect(removeListenerMock).toHaveBeenCalled();
    });

    it('should invoke NativeEvents.addListener with StreamUpdated event', () => {
      const unsubscribeFn = ConferenceService.onStreamsChange(handlerFn);
      expect(ConferenceService._nativeEvents.addListener).toHaveBeenCalledWith(
        ConferenceServiceEventNames.StreamUpdated,
        handlerFn
      );
      unsubscribeFn();
      expect(removeListenerMock).toHaveBeenCalled();
    });

    it('should invoke NativeEvents.addListener with StreamRemoved event', () => {
      const unsubscribeFn = ConferenceService.onStreamsChange(handlerFn);
      expect(ConferenceService._nativeEvents.addListener).toHaveBeenCalledWith(
        ConferenceServiceEventNames.StreamRemoved,
        handlerFn
      );
      unsubscribeFn();
      expect(removeListenerMock).toHaveBeenCalled();
    });
  });

  describe('startScreenShare()', () => {
    it('should invoke exported startScreenShare method', () => {
      ConferenceService.startScreenShare();
      expect(
        CommsAPIConferenceServiceModule.startScreenShare
      ).toHaveBeenCalled();
    });
  });

  describe('stopScreenShare()', () => {
    it('should invoke exported stopScreenShare method', () => {
      ConferenceService.stopScreenShare();
      expect(
        CommsAPIConferenceServiceModule.stopScreenShare
      ).toHaveBeenCalled();
    });
  });
});

describe('ConferenceService - transformers', () => {
  describe('transformToConference()', () => {
    it('should return Conference object', () => {
      expect(
        transformToConference({
          participants: [
            {
              info: {
                name: 'Jack',
              },
              id: '111',
            },
          ],
          alias: 'Conference',
          id: '111',
          status: ConferenceStatus.DEFAULT,
          spatialAudioStyle: SpatialAudioStyle.INDIVIDUAL,
        })
      ).toStrictEqual({
        participants: [
          {
            info: {
              name: 'Jack',
            },
            id: '111',
            status: undefined,
            type: undefined,
          },
        ],
        alias: 'Conference',
        id: '111',
        isNew: undefined,
        status: ConferenceStatus.DEFAULT,
        spatialAudioStyle: SpatialAudioStyle.INDIVIDUAL,
      });
    });
  });

  describe('transformToParticipant()', () => {
    it('should return Participant object', () => {
      expect(
        transformToParticipant({
          info: {
            name: 'Jack',
          },
          id: '111',
        })
      ).toStrictEqual({
        info: {
          name: 'Jack',
        },
        id: '111',
        status: undefined,
        type: undefined,
      });
    });
  });

  describe('setSpatialDirection()', () => {
    it('should invoke exported method with correct arguments', () => {
      ConferenceService.setSpatialDirection(testSpatialDirection);
      expect(
        CommsAPIConferenceServiceModule.setSpatialDirection
      ).toHaveBeenCalledWith(testSpatialDirection);
    });
  });

  describe('setSpatialEnvironment()', () => {
    it('should invoke exported method with correct arguments', () => {
      ConferenceService.setSpatialEnvironment(
        testSpatialScale,
        testSpatialPosition,
        testSpatialPosition,
        testSpatialPosition
      );
      expect(
        CommsAPIConferenceServiceModule.setSpatialEnvironment
      ).toHaveBeenCalledWith(
        testSpatialScale,
        testSpatialPosition,
        testSpatialPosition,
        testSpatialPosition
      );
    });
  });

  describe('setSpatialPosition()', () => {
    it('should invoke exported method with correct arguments', () => {
      ConferenceService.setSpatialPosition(
        testParticipant,
        testSpatialPosition
      );
      expect(
        CommsAPIConferenceServiceModule.setSpatialPosition
      ).toHaveBeenCalledWith(testParticipant, testSpatialPosition);
    });
  });
});
