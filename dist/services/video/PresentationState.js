var PresentationState;
(function (PresentationState) {
    PresentationState[PresentationState["STARTED"] = 0] = "STARTED";
    PresentationState[PresentationState["PLAY"] = 1] = "PLAY";
    PresentationState[PresentationState["PAUSED"] = 2] = "PAUSED";
    PresentationState[PresentationState["SEEK"] = 3] = "SEEK";
    PresentationState[PresentationState["STOP"] = 4] = "STOP";
    PresentationState[PresentationState["CONVERTED"] = 5] = "CONVERTED";
})(PresentationState || (PresentationState = {}));
export default PresentationState;
//# sourceMappingURL=PresentationState.js.map