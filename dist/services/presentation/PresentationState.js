export var PresentationState;
(function (PresentationState) {
    PresentationState[PresentationState["STARTED"] = 0] = "STARTED";
    PresentationState[PresentationState["PLAY"] = 1] = "PLAY";
    PresentationState[PresentationState["PAUSED"] = 2] = "PAUSED";
    PresentationState[PresentationState["SEEK"] = 3] = "SEEK";
    PresentationState[PresentationState["STOP"] = 4] = "STOP";
    PresentationState[PresentationState["CONVERTED"] = 5] = "CONVERTED";
})(PresentationState || (PresentationState = {}));
export function presentationStateToString(state) {
    if (typeof state === "string")
        return state;
    return PresentationState[state];
}
export function stringToPresentationState(state) {
    if (typeof state === "string")
        return PresentationState[state];
    return state;
}
//# sourceMappingURL=PresentationState.js.map