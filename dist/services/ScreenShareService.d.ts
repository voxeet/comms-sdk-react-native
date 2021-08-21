import { ScreenInfo } from "../types";
export default class ScreenShareService {
    sendRequestStartScreenShare(): Promise<boolean>;
    stopScreenShare(): Promise<boolean>;
    setScreenSizeInformation(screenInfo: ScreenInfo): Promise<boolean>;
}
