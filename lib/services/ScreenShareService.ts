import { NativeModules } from "react-native";
import { Point, ScreenInfo } from "../types";

const { RNScreenShareServiceModule } = NativeModules;

export default class ScreenShareService {

  //start screenshare is not defined as it will be implemented in the native side only
  public async sendRequestStartScreenShare(): Promise<boolean> {
    return RNScreenShareServiceModule.sendRequestStartScreenShare();
  }

  public async stopScreenShare(): Promise<boolean> {
    return RNScreenShareServiceModule.stopScreenShare();
  }

  public async setScreenSizeInformation(screenInfo: ScreenInfo): Promise<boolean> {
    const point: Point = { x: screenInfo.width, y: screenInfo.height };
    return RNScreenShareServiceModule.setScreenSizeInformation(point);
  }
}