import { NativeModules } from 'react-native';

import CommandService from '../CommandService';
import { CommandServiceEventNames } from '../events';

const { DolbyIoIAPICommandServiceModule } = NativeModules;

describe('CommandService', () => {
  CommandService._nativeEvents.addListener = jest.fn();

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
      expect(CommandService._nativeEvents.addListener).toHaveBeenCalledWith(
        CommandServiceEventNames.MessageReceived,
        expect.any(Function)
      );
    });
  });
});

jest.mock('./utils/NativeEvents', () => {
  const originalModule = jest.requireActual('../utils/NativeEvents');

  return {
    ...originalModule,
    addListener: jest.fn(),
  };
});
