import NativeEvents from '../../../utils/NativeEvents';
import { Conference, ConferenceStatus } from '../../conference/models';
import NotificationService from '../NotificationService';
import { NotificationServiceEventNames } from '../events';
import { NativeModules } from 'react-native';

const { DolbyIoIAPINotificationService } = NativeModules;

NativeEvents.addListener = jest.fn();

const testConference: Conference = {
  participants: [{ id: '123', info: { name: 'John Doe' } }],
  status: ConferenceStatus.DEFAULT,
};

describe('NotificationService', () => {
  describe('invite()', () => {
    it('should invoke exported invite method with correct arguments', () => {
      NotificationService.invite(testConference, [{ info: {} }]);
      expect(DolbyIoIAPINotificationService.invite).toHaveBeenCalledWith(
        testConference,
        [{ info: {} }]
      );
    });
  });

  describe('decline()', () => {
    it('should invoke exported decline method with correct arguments', () => {
      NotificationService.decline(testConference);
      expect(DolbyIoIAPINotificationService.decline).toHaveBeenCalledWith(
        testConference
      );
    });
  });

  describe('onInvitationReceived()', () => {
    it('should invoke NativeEvents.addListener with InvitationReceived event', () => {
      NotificationService.onInvitationReceived(() => {});
      expect(NativeEvents.addListener).toHaveBeenCalledWith(
        NotificationServiceEventNames.InvitationReceived,
        expect.any(Function)
      );
    });
  });
});
