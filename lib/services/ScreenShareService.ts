import Point from "../types/Point";
import ScreenInfo from "../types/ScreenInfo";

export default class ScreenShareService {

  //start screenshare is not defined as it will be implemented in the native side only
  public async sendRequestStartScreenShare(): Promise<boolean> {
    throw "not implemented";
  }

  public async stopScreenShare(): Promise<boolean> {
    throw "not implemented";
  }

  public async setScreenSizeInformation(screenInfo: ScreenInfo): Promise<boolean> {
    const point: Point = { x: screenInfo.width, y: screenInfo.height };
    throw "not implemented";
  }
}