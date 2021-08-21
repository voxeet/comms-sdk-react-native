export enum ConnectionState {
  DISCONNECTED = "DISCONNECTED",
  CONNECTING = "CONNECTING",
  CONECTED = "CONECTED",
  DISCONNECTING = "DISCONNECTING"
}

export function toConnectionState(value: ConnectionState|string): ConnectionState {
  if(typeof value === "string") return ConnectionState[value];
  return value;
}