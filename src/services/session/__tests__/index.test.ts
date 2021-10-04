import SessionService from '../SessionService';
import { NativeModules } from 'react-native';

const { DolbyIoIAPISessionServiceModule } = NativeModules;

/** SessionService tests */

describe('SessionService', () => {
  test('Open method calls exported open method', () => {
    SessionService.open({ name: 'Jack' });
    expect(DolbyIoIAPISessionServiceModule.open).toHaveBeenCalledWith({
      name: 'Jack',
    });
  });

  test('Open method without param calls exported open method with empty object', () => {
    SessionService.open();
    expect(DolbyIoIAPISessionServiceModule.open).toHaveBeenCalledWith({});
  });

  test('Close method calls exported close method', () => {
    SessionService.close();
    expect(DolbyIoIAPISessionServiceModule.open).toHaveBeenCalled();
  });
});
