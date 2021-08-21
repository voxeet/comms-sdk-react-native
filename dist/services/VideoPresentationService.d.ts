import { VideoPresentation } from "./presentation";
export default class VideoPresentationService {
    start(url: string): Promise<VideoPresentation>;
    stop(): Promise<VideoPresentation>;
    play(): Promise<VideoPresentation>;
    pause(timestamp: number): Promise<VideoPresentation>;
    seek(timestamp: number): Promise<VideoPresentation>;
    getCurrentPresentation(): Promise<VideoPresentation>;
}
