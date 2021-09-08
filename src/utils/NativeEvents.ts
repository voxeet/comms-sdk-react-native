import {
  NativeModules,
  NativeEventEmitter,
  DeviceEventEmitter,
  Platform,
} from 'react-native';
const { RNDolbyioIAPISdk } = NativeModules;

const EventEmitter = Platform.select({
  ios: DeviceEventEmitter,
  android: new NativeEventEmitter(RNDolbyioIAPISdk),
});

export default class NativeEvents {
  static addListener(type: string, listener: (...args: any[]) => void) {
    // @ts-ignore
    EventEmitter.addListener(type, listener);

    return () => {
      // @ts-ignore
      EventEmitter.removeListener(type, listener);
    };
  }
}
