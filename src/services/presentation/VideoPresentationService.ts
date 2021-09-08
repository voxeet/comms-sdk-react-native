import { NativeModules } from 'react-native';
import type { VideoPresentation } from './models';
const { RNFilePresentationService } = NativeModules;

//TODO export its events
class VideoPresentationService {
  public async start(url: string): Promise<VideoPresentation> {
    return RNFilePresentationService.start(url);
  }

  public async stop(): Promise<VideoPresentation> {
    return RNFilePresentationService.stop();
  }

  public async play(): Promise<VideoPresentation> {
    return RNFilePresentationService.play();
  }

  public async pause(timestamp: number): Promise<VideoPresentation> {
    return RNFilePresentationService.pause(timestamp);
  }

  public async seek(timestamp: number): Promise<VideoPresentation> {
    return RNFilePresentationService.seek(timestamp);
  }

  public async getCurrentPresentation(): Promise<VideoPresentation> {
    return RNFilePresentationService.getCurrentPresentation();
  }
}

export default new VideoPresentationService();
