import { NativeModules } from 'react-native';

import SessionService from '../SessionService';
import { transformToUser } from '../transformers';

const { DolbyIoIAPISessionServiceModule } = NativeModules;

describe('SessionService', () => {
  describe('open()', () => {
    it('should invoke exported open method with correct arguments', () => {
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

  describe('isOpen()', () => {
    it('should invoke exported method', () => {
      SessionService.isOpen();
      expect(DolbyIoIAPISessionServiceModule.isOpen).toHaveBeenCalled();
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
