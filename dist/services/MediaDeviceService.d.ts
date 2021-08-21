import { ComfortNoiseLevel } from "./mediaDevice";
export default class MediaDeviceService {
    switchCamera(): Promise<boolean>;
    setComfortNoiseLevel(comfortNoise: ComfortNoiseLevel): Promise<boolean>;
    getComfortNoiseLevel(): Promise<ComfortNoiseLevel>;
}
