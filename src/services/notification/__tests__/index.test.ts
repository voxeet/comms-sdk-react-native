import { Conference, ConferenceStatus } from '../../conference/models';
import NotificationService from '../NotificationService';
import { NativeModules } from 'react-native';

/** Mocking function */

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.NativeModules.DolbyIoIAPINotificationService = {
    invite: jest.fn(),
    decline: jest.fn(),
  };
  RN.NativeModules.DolbyIoIAPIModule = {};

  return RN;
});

const { DolbyIoIAPINotificationService } = NativeModules;

/** NotificationService tests */

describe('NotificationService', () => {
  /** "invite" method */

  const mockConference: Conference = {
    participants: [
      {
        id: '123',
        info: {
          name: 'John Doe',
        },
      },
    ],
    status: ConferenceStatus.DEFAULT,
  };

  test('"invite" method', () => {
    NotificationService.invite(mockConference, [{}]);
    expect(DolbyIoIAPINotificationService.invite).toHaveBeenCalledWith(
      mockConference,
      [{}]
    );
  });

  /** "decline" method */

  test('"decline" method', () => {
    NotificationService.decline(mockConference);
    expect(DolbyIoIAPINotificationService.decline).toHaveBeenCalledWith(
      mockConference
    );
  });

  // TODO "onInvitationReceived" method
});
