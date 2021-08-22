export declare enum ConnectionState {
    DISCONNECTED = "DISCONNECTED",
    CONNECTING = "CONNECTING",
    CONECTED = "CONECTED",
    DISCONNECTING = "DISCONNECTING"
}
export declare function toConnectionState(value: ConnectionState | string): ConnectionState;
export declare function fromConnectionState(value: ConnectionState | string): string;
