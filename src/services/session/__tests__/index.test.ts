import SessionService from '../SessionService';
import { NativeModules } from 'react-native';

const { DolbyIoIAPISessionServiceModule } = NativeModules;

describe('SessionService', () => {
  describe('open()', () => {
    it('should invoke exported open method with correct arguments', () => {
      SessionService.open({ name: 'Jack' });
      expect(DolbyIoIAPISessionServiceModule.open).toHaveBeenCalledWith({
        name: 'Jack',
      });
    });

    it('should invoke exported open method with empty object when invoked parameterless', () => {
      SessionService.open();
      expect(DolbyIoIAPISessionServiceModule.open).toHaveBeenCalledWith({});
    });
  });

  describe('close()', () => {
    it('should invoke exported close method', () => {
      SessionService.close();
      expect(DolbyIoIAPISessionServiceModule.open).toHaveBeenCalled();
    });
  });
});
