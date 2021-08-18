import { VideoPresentation } from "./video";


//TODO export its events
export default class VideoPresentationService {
  
  public async start(url: string): Promise<VideoPresentation> {
    throw "not implemented";
  }

  public async stop(): Promise<VideoPresentation> {
    throw "not implemented";
  }

  public async play(): Promise<VideoPresentation> {
    throw "not implemented";
  }

  public async pause(timestamp: number): Promise<VideoPresentation> {
    throw "not implemented";
  }

  public async seek(timestamp: number): Promise<VideoPresentation> {
    throw "not implemented";
  }

  public async getCurrentPresentation(): Promise<VideoPresentation> {
    throw "not implemented";
  }
}