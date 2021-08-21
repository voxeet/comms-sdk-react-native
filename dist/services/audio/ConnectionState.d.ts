export declare enum ConnectionState {
    DISCONNECTED = "DISCONNECTED",
    CONNECTING = "CONNECTING",
    CONECTED = "CONECTED",
    DISCONNECTING = "DISCONNECTING"
}
export declare function toConnectionState(value: ConnectionState | string): ConnectionState;
