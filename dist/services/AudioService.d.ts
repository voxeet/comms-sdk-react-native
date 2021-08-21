import { MediaDevice } from "./audio";
export interface UpdateDeviceCallback {
    (devices: MediaDevice[]): void;
}
export default class AudioService {
    registerUpdateDevices(callback: UpdateDeviceCallback): Promise<() => void>;
    enumerateDevices(): Promise<MediaDevice[]>;
    currentMediaDevice(): Promise<MediaDevice>;
    connect(mediaDevice: MediaDevice): Promise<boolean>;
    disconnect(mediaDevice: MediaDevice): Promise<boolean>;
    checkOutputRoute(): Promise<boolean>;
    requestAudioFocus(): Promise<void>;
    abandonAudioFocusRequest(): Promise<void>;
}
