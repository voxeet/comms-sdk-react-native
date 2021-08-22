import { UnregisterCallback } from "../types";
import { MediaDevice } from "./audio";
import AbstractService from "./AbstractService";
export interface UpdateDeviceCallback {
    (devices: MediaDevice[]): void;
}
export default class AudioService extends AbstractService {
    #private;
    constructor();
    registerUpdateDevices(callback: UpdateDeviceCallback): Promise<UnregisterCallback>;
    enumerateDevices(): Promise<MediaDevice[]>;
    currentMediaDevice(): Promise<MediaDevice>;
    connect(mediaDevice: MediaDevice): Promise<boolean>;
    disconnect(mediaDevice: MediaDevice): Promise<boolean>;
    checkOutputRoute(): Promise<boolean>;
    requestAudioFocus(): Promise<void>;
    abandonAudioFocusRequest(): Promise<void>;
}
