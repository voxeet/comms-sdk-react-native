export enum PresentationState {
  STARTED,
  PLAY,
  PAUSED,
  SEEK,
  STOP,
  CONVERTED
}


export function presentationStateToString(state: PresentationState|string): string {
  if(typeof state === "string") return state;
  return PresentationState[state];
}

export function stringToPresentationState(state: PresentationState|string): PresentationState {
  if(typeof state === "string") return PresentationState[state as "STARTED"];
  return state;
}