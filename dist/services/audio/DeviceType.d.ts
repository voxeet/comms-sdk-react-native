export declare enum DeviceType {
    INTERNAL_SPEAKER = "INTERNAL_SPEAKER",
    EXTERNAL_SPEAKER = "EXTERNAL_SPEAKER",
    BLUETOOTH = "BLUETOOTH",
    NORMAL_MEDIA = "NORMAL_MEDIA",
    WIRED_HEADSET = "WIRED_HEADSET",
    USB = "USB"
}
export declare function toDeviceType(value: DeviceType | string): DeviceType;
export declare function fromDeviceType(value: DeviceType): string;
