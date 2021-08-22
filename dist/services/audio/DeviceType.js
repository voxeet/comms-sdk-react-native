export var DeviceType;
(function (DeviceType) {
    DeviceType["INTERNAL_SPEAKER"] = "INTERNAL_SPEAKER";
    DeviceType["EXTERNAL_SPEAKER"] = "EXTERNAL_SPEAKER";
    DeviceType["BLUETOOTH"] = "BLUETOOTH";
    DeviceType["NORMAL_MEDIA"] = "NORMAL_MEDIA";
    DeviceType["WIRED_HEADSET"] = "WIRED_HEADSET";
    DeviceType["USB"] = "USB";
})(DeviceType || (DeviceType = {}));
export function toDeviceType(value) {
    if (typeof value === "string")
        return DeviceType[value];
    return value;
}
export function fromDeviceType(value) {
    if (typeof value === "string")
        return value;
    return DeviceType[value];
}
//# sourceMappingURL=DeviceType.js.map