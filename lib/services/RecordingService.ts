import { NativeModules } from "react-native";

const { RNScreenShareServiceModule } = NativeModules;

export default class RecordingService {
  public async start(): Promise<boolean> {
    return RNScreenShareServiceModule.start();
  }

  public async stop(): Promise<boolean> {
    return RNScreenShareServiceModule.stop();
  }
}