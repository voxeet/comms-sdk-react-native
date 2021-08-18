interface UpdateDeviceCallback {
  (devices: MediaDevice): void
}

export default class AudioService {
  public async registerUpdateDevices(callback: UpdateDeviceCallback): Promise<AudioRoute> {
    throw "not implemented";
  }

  public async unregisterUpdateDevices(callback: UpdateDeviceCallback): Promise<AudioRoute> {
    throw "not implemented";
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