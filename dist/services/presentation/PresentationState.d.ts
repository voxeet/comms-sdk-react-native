export declare enum PresentationState {
    STARTED = 0,
    PLAY = 1,
    PAUSED = 2,
    SEEK = 3,
    STOP = 4,
    CONVERTED = 5
}
export declare function presentationStateToString(state: PresentationState | string): string;
export declare function stringToPresentationState(state: PresentationState | string): PresentationState;
