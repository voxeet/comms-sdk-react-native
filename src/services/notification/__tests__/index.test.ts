import { Conference, ConferenceStatus } from '../../conference/models';
import NotificationService from '../NotificationService';
import { NativeModules } from 'react-native';

const { DolbyIoIAPINotificationService } = NativeModules;

const testConference: Conference = {
  participants: [{ id: '123', info: { name: 'John Doe' } }],
  status: ConferenceStatus.DEFAULT,
};

describe('NotificationService', () => {
  describe('invite()', () => {
    it('should invoke exported invite method with correct arguments', () => {
      NotificationService.invite(testConference, [{}]);
      expect(DolbyIoIAPINotificationService.invite).toHaveBeenCalledWith(
        testConference,
        [{}]
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

  // TODO "onInvitationReceived" method
});
