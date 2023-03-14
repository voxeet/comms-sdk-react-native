import { NativeModules } from 'react-native';

import { Conference, ConferenceStatus } from '../../conference/models';
import NotificationService from '../NotificationService';
import { NotificationServiceEventNames } from '../events';

const { CommsAPINotificationServiceModule } = NativeModules;

const testConference: Conference = {
  participants: [{ id: '123', info: { name: 'John Doe' } }],
  status: ConferenceStatus.DEFAULT,
};

describe('NotificationService', () => {
  NotificationService._nativeEvents.addListener = jest.fn();

  describe('subscribe()', () => {
    it('should invoke subscribe method with correct arguments', () => {
      NotificationService.subscribe([
        { type: 'event', conferenceAlias: 'alias' },
      ]);
      expect(CommsAPINotificationServiceModule.subscribe).toHaveBeenCalledWith([
        { type: 'event', conferenceAlias: 'alias' },
      ]);
    });
  });

  describe('unsubscribe()', () => {
    it('should invoke unsubscribe method with correct arguments', () => {
      NotificationService.unsubscribe([
        { type: 'event', conferenceAlias: 'alias' },
      ]);
      expect(
        CommsAPINotificationServiceModule.unsubscribe
      ).toHaveBeenCalledWith([{ type: 'event', conferenceAlias: 'alias' }]);
    });
  });

  describe('invite()', () => {
    it('should invoke exported invite method with correct arguments', () => {
      NotificationService.invite(testConference, [{ info: {} }]);
      expect(CommsAPINotificationServiceModule.invite).toHaveBeenCalledWith(
        testConference,
        [{ info: {} }]
      );
    });
  });

  describe('decline()', () => {
    it('should invoke exported decline method with correct arguments', () => {
      NotificationService.decline(testConference);
      expect(CommsAPINotificationServiceModule.decline).toHaveBeenCalledWith(
        testConference
      );
    });
  });

  describe('onInvitationReceived()', () => {
    it('should invoke NativeEvents.addListener with InvitationReceived event', () => {
      NotificationService.onInvitationReceived(() => {});
      expect(
        NotificationService._nativeEvents.addListener
      ).toHaveBeenCalledWith(
        NotificationServiceEventNames.InvitationReceived,
        expect.any(Function)
      );
    });
  });

  describe('onConferenceStatus()', () => {
    it('should invoke NativeEvents.addListener with ConferenceStatus event', () => {
      NotificationService.onConferenceStatus(() => {});
      expect(
        NotificationService._nativeEvents.addListener
      ).toHaveBeenCalledWith(
        NotificationServiceEventNames.ConferenceStatus,
        expect.any(Function)
      );
    });
  });

  describe('onConferenceCreated()', () => {
    it('should invoke NativeEvents.addListener with ConferenceCreated event', () => {
      NotificationService.onConferenceCreated(() => {});
      expect(
        NotificationService._nativeEvents.addListener
      ).toHaveBeenCalledWith(
        NotificationServiceEventNames.ConferenceCreated,
        expect.any(Function)
      );
    });
  });

  describe('onConferenceEnded()', () => {
    it('should invoke NativeEvents.addListener with ConferenceEnded event', () => {
      NotificationService.onConferenceEnded(() => {});
      expect(
        NotificationService._nativeEvents.addListener
      ).toHaveBeenCalledWith(
        NotificationServiceEventNames.ConferenceEnded,
        expect.any(Function)
      );
    });
  });
});
