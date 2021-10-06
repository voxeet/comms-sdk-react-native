import SessionService from '../SessionService';
import { transformToUser } from '../transformers';
import { NativeModules } from 'react-native';

const { DolbyIoIAPISessionServiceModule } = NativeModules;

describe('ConferenceService', () => {
  describe('open()', () => {
    it('should invoke exported method', () => {
      SessionService.open({ name: 'Jack' });
      expect(DolbyIoIAPISessionServiceModule.open).toHaveBeenCalledWith({
        name: 'Jack',
      });
    });

    it('should invoke exported method with empty object when no param passed', () => {
      SessionService.open();
      expect(DolbyIoIAPISessionServiceModule.open).toHaveBeenCalledWith({});
    });
  });

  describe('close()', () => {
    it('should invoke exported method', () => {
      SessionService.close();
      expect(DolbyIoIAPISessionServiceModule.open).toHaveBeenCalled();
    });
  });

  describe('getsCurrentUser()', () => {
    it('should invoke exported method', () => {
      SessionService.getCurrentUser();
      expect(DolbyIoIAPISessionServiceModule.getParticipant).toHaveBeenCalled();
    });
  });
});

describe('SessionService - transformers', () => {
  describe('transformToUser()', () => {
    it('should return User object', () => {
      expect(
        transformToUser({
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
      });
    });
  });
});
