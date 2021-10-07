import { testConference } from '../../conference/__tests__/index.test';
import NotificationService from '../NotificationService';
import { NativeModules } from 'react-native';

const { DolbyIoIAPINotificationService } = NativeModules;

describe('NotificationService', () => {
  // invite()

  describe('invite()', () => {
    it('should invoke exported invite method with correct arguments', () => {
      NotificationService.invite(testConference, [{}]);
      expect(DolbyIoIAPINotificationService.invite).toHaveBeenCalledWith(
        testConference,
        [{}]
      );
    });
  });

  // decline()

  describe('decline()', () => {
    it('should invoke exported decline method with correct arguments', () => {
      NotificationService.decline(testConference);
      expect(DolbyIoIAPINotificationService.decline).toHaveBeenCalledWith(
        testConference
      );
    });
  });

  // TODO "onInvitationReceived" method
});
