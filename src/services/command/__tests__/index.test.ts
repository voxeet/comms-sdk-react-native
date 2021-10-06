import { NativeModules } from 'react-native';

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.NativeModules.DolbyIoIAPICommandService = {
    send: jest.fn(),
  };
  RN.NativeModules.DolbyIoIAPIModule = {};

  return RN;
});

const { DolbyIoIAPICommandService } = NativeModules;

describe('CommandService', () => {
  describe('send()', () => {
    it('calls exported send method with correct arguments', () => {
      DolbyIoIAPICommandService.send('some message');
      expect(DolbyIoIAPICommandService.send).toHaveBeenCalledWith(
        'some message'
      );
    });
  });
});
