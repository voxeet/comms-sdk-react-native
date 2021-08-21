import { MediaDevice, ConnectionState, DeviceType, toConnectionState, toDeviceType } from "./audio";

export interface UpdateDeviceCallback {
  (devices: MediaDevice[]): void
}

export default class AudioService {

  public async registerUpdateDevices(callback: UpdateDeviceCallback): Promise<() => void> {
    const real_callback = (devices: any) => {
      const mapped = devices.map((d: any) => {
        //map the various non enum to the JS's enum values
        const deviceType = toDeviceType(d.deviceType);
        const connectionState = toConnectionState(d.connectionState);
        const platformConnectionState = toConnectionState(d.platformConnectionState);

        return {...d, deviceType, connectionState, platformConnectionState};
      });

      callback(mapped);
    }

    const unregister = () => {
      //will call unregistering the wrapper
    }
    throw "not implemented";
    //TODO return the 
  }

  public async enumerateDevices(): Promise<MediaDevice[]> {
    throw "not implemented";
  }

  public async currentMediaDevice(): Promise<MediaDevice> {
    throw "not implemented";
  }

  public async connect(mediaDevice: MediaDevice): Promise<boolean> {
    throw "not implemented";
  }

  public async disconnect(mediaDevice: MediaDevice): Promise<boolean> {
    throw "not implemented";
  }

  public async checkOutputRoute(): Promise<boolean> {
    throw "not implemented";
  }

  public async requestAudioFocus(): Promise<void> {
    throw "not implemented";
  }

  public async abandonAudioFocusRequest(): Promise<void> {
    throw "not implemented";
  }
}