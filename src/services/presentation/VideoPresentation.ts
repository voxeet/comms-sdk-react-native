import type { PresentationState } from "./PresentationState";

export default interface VideoPresentation {
  key: string;
  url: string;
  state: PresentationState;
  lastSeekTimestamp: number;
}