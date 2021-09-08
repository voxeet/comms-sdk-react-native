import { NativeModules } from 'react-native';

const { RNScreenShareServiceModule } = NativeModules;

class RecordingService {
  public async start(): Promise<boolean> {
    return RNScreenShareServiceModule.start();
  }

  public async stop(): Promise<boolean> {
    return RNScreenShareServiceModule.stop();
  }
}

export default new RecordingService();
