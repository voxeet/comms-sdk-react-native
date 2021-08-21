export default class RecordingService {
    start(): Promise<boolean>;
    stop(): Promise<boolean>;
}
