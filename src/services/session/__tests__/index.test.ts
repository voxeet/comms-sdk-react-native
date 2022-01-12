import { NativeModules } from 'react-native';

import SessionService from '../SessionService';

const { CommsAPISessionServiceModule } = NativeModules;

describe('SessionService', () => {
  describe('open()', () => {
    it('should invoke exported open method with correct arguments', () => {
      SessionService.open({ name: 'Jack' });
      expect(CommsAPISessionServiceModule.open).toHaveBeenCalledWith({
        name: 'Jack',
      });
    });

    it('should invoke exported method with empty object when no param passed', () => {
      SessionService.open();
      expect(CommsAPISessionServiceModule.open).toHaveBeenCalledWith({});
    });
  });

  describe('close()', () => {
    it('should invoke exported method', () => {
      SessionService.close();
      expect(CommsAPISessionServiceModule.open).toHaveBeenCalled();
    });
  });

  describe('isOpen()', () => {
    it('should invoke exported method', () => {
      SessionService.isOpen();
      expect(CommsAPISessionServiceModule.isOpen).toHaveBeenCalled();
    });
  });

  describe('getsCurrentUser()', () => {
    it('should invoke exported method', () => {
      SessionService.getParticipant();
      expect(CommsAPISessionServiceModule.getParticipant).toHaveBeenCalled();
    });
  });
});
