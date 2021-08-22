import { PresentationState } from "./PresentationState";
export default interface FilePresentation {
    key: string;
    url: string;
    state: PresentationState;
    page: number;
    nbPage: number;
}
