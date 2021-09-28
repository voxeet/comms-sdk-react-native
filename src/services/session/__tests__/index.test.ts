import SessionService from '../SessionService';
import { NativeModules } from 'react-native';

const { DolbyIoIAPISessionServiceModule } = NativeModules;

/** SessionService tests */

describe('SessionService', () => {
  /** "open" method */

  test('"open" method', () => {
    SessionService.open({});
    expect(DolbyIoIAPISessionServiceModule.open).toHaveBeenCalledWith({});
  });

  /** "close" method */

  test('"close" method', () => {
    SessionService.close();
    expect(DolbyIoIAPISessionServiceModule.open).toHaveBeenCalled();
  });
});
