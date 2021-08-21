import { ComfortNoiseLevel } from "./mediaDevice";

export default class MediaDeviceService {
  
  public async switchCamera(): Promise<boolean> {
    throw "not implemented";
  }

  public async setComfortNoiseLevel(comfortNoise: ComfortNoiseLevel): Promise<boolean> {
    throw "not implemented";
  }

  public async getComfortNoiseLevel(): Promise<ComfortNoiseLevel> {
    throw "not implemented";
  }
}