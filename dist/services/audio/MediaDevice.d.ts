import { ConnectionState } from "./ConnectionState";
import { DeviceType } from "./DeviceType";
export default interface MediaDevice {
    id: string;
    name: string;
    deviceType: DeviceType;
    connectionState: ConnectionState;
    platformConnectionState: ConnectionState;
}
