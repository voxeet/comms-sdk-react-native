export var ConnectionState;
(function (ConnectionState) {
    ConnectionState["DISCONNECTED"] = "DISCONNECTED";
    ConnectionState["CONNECTING"] = "CONNECTING";
    ConnectionState["CONECTED"] = "CONECTED";
    ConnectionState["DISCONNECTING"] = "DISCONNECTING";
})(ConnectionState || (ConnectionState = {}));
export function toConnectionState(value) {
    if (typeof value === "string")
        return ConnectionState[value];
    return value;
}
//# sourceMappingURL=ConnectionState.js.map