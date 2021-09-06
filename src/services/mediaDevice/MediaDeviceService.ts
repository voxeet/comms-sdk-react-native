import { NativeModules } from 'react-native';
import { ComfortNoiseLevel } from './models';
const { RNMediaDeviceServiceModule } = NativeModules;

class MediaDeviceService {
  public async switchCamera(): Promise<boolean> {
    return RNMediaDeviceServiceModule.switchCamera();
  }

  public async setComfortNoiseLevel(
    comfortNoise: ComfortNoiseLevel
  ): Promise<boolean> {
    const str = ComfortNoiseLevel[comfortNoise];

    return RNMediaDeviceServiceModule.setComfortNoiseLevel(str);
  }

  public async getComfortNoiseLevel(): Promise<ComfortNoiseLevel> {
    const output = RNMediaDeviceServiceModule.getComfortNoiseLevel();

    return ComfortNoiseLevel[output as 'DEFAULT'] || ComfortNoiseLevel.DEFAULT;
  }
}

export default new MediaDeviceService();
