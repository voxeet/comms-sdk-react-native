import NativeEvents from '../../../utils/NativeEvents';
import CommandService from '../CommandService';
import { NativeModules } from 'react-native';

const { DolbyIoIAPICommandServiceModule } = NativeModules;

NativeEvents.addListener = jest.fn();

describe('CommandService', () => {
  describe('send()', () => {
    it('should invoke exported send method with correct arguments', () => {
      CommandService.send('some message');
      expect(DolbyIoIAPICommandServiceModule.send).toHaveBeenCalledWith(
        'some message'
      );
    });
  });

  describe('onMessageReceived()', () => {
    it('should invoke NativeEvents.addListener', () => {
      CommandService.onMessageReceived(() => {});
      expect(NativeEvents.addListener).toHaveBeenCalled();
    });
  });
});
