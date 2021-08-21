export enum DeviceType {
  INTERNAL_SPEAKER = "INTERNAL_SPEAKER",
  EXTERNAL_SPEAKER = "EXTERNAL_SPEAKER",
  BLUETOOTH = "BLUETOOTH",
  NORMAL_MEDIA = "NORMAL_MEDIA",
  WIRED_HEADSET = "WIRED_HEADSET",
  USB = "USB"
}

export function toDeviceType(value: DeviceType|string): DeviceType {
  if(typeof value === "string") return DeviceType[value];
  return value;
}