import { NativeModules } from 'react-native';
const { RNAudioDeviceServiceModule } = NativeModules;

import { UnregisterCallback } from "../types";
import { MediaDevice, toConnectionState, toDeviceType, fromConnectionState, fromDeviceType } from "./audio";
import AbstractService from "./AbstractService";
import { EventEmitter2 } from 'eventemitter2';

export interface UpdateDeviceCallback {
  (devices: MediaDevice[]): void
}

function toMap(mediaDevice: MediaDevice): any {
  //map the various non enum to the JS's enum values
  const deviceType = fromDeviceType(mediaDevice.deviceType);
  const connectionState = fromConnectionState(mediaDevice.connectionState);
  const platformConnectionState = fromConnectionState(mediaDevice.platformConnectionState);

  return {...mediaDevice, deviceType, connectionState, platformConnectionState};
}

const toMediaDevice = (map: any): MediaDevice => {
  //map the various non enum to the JS's enum values
  const deviceType = toDeviceType(map.deviceType);
  const connectionState = toConnectionState(map.connectionState);
  const platformConnectionState = toConnectionState(map.platformConnectionState);

  return {...map, deviceType, connectionState, platformConnectionState};
}

export default class AudioService extends AbstractService {

  #emitter: EventEmitter2 = new EventEmitter2();

  public constructor() {
    super(RNAudioDeviceServiceModule);

    this.events.addListener("MediaDevices", (devices: any[]) => {
      const mapped = devices.map(toMediaDevice);
      this.#emitter.emit("MediaDevices", mapped);
    });
  }

  public async registerUpdateDevices(callback: UpdateDeviceCallback): Promise<UnregisterCallback> {
    this.emitter.addListener("MediaDevices", callback);

    return () => {
      //this will unregister the listener
      this.emitter.removeListener("MediaDevices", callback);
    };
  }

  public async enumerateDevices(): Promise<MediaDevice[]> {
    const devices = await RNAudioDeviceServiceModule.enumerateDevices();
    return devices.map(toMediaDevice);
  }

  public async currentMediaDevice(): Promise<MediaDevice> {
    const mediaDevice = await RNAudioDeviceServiceModule.currentMediaDevice();
    return toMediaDevice(mediaDevice);
  }

  public async connect(mediaDevice: MediaDevice): Promise<boolean> {
    return RNAudioDeviceServiceModule.connect(toMap(mediaDevice));
  }

  public async disconnect(mediaDevice: MediaDevice): Promise<boolean> {
    return RNAudioDeviceServiceModule.disconnect(toMap(mediaDevice));
  }

  public async checkOutputRoute(): Promise<boolean> {
    return RNAudioDeviceServiceModule.checkOutputRoute();
  }

  public async requestAudioFocus(): Promise<void> {
    return RNAudioDeviceServiceModule.requestAudioFocus();
  }

  public async abandonAudioFocusRequest(): Promise<void> {
    return RNAudioDeviceServiceModule.abandonAudioFocusRequest();
  }
}