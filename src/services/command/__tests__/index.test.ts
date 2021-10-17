import { NativeModules } from 'react-native';

import NativeEvents from '../../../utils/NativeEvents';
import CommandService from '../CommandService';
import { CommandServiceEventNames } from '../events';

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
    it('should invoke NativeEvents.addListener with MessageReceived event', () => {
      CommandService.onMessageReceived(() => {});
      expect(NativeEvents.addListener).toHaveBeenCalledWith(
        CommandServiceEventNames.MessageReceived,
        expect.any(Function)
      );
    });
  });
});
